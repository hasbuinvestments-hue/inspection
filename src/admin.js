// Initialize Supabase for Admin
const _adminSub = supabase.createClient(window.SUPABASE_CONFIG.url, window.SUPABASE_CONFIG.anonKey);
// Service role client — used for bypassing RLS + Rate Limits during inspector creation
const _serviceSub = supabase.createClient(window.SUPABASE_CONFIG.url, window.SUPABASE_CONFIG.serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false }
});

// State
let currentTab = 'overview';
let activeInspectors = [];
let zoneReports = [];
let allPayments = []; // New global for payments
let map = null;

// DOM Elements
const tabs = document.querySelectorAll('.nav-item');
const tabContents = document.querySelectorAll('.tab-content');
const tabTitle = document.getElementById('tab-title');
const inspectorModal = document.getElementById('inspector-modal');
const addInspectorForm = document.getElementById('add-inspector-form');

// Auth Guard
(async function initAdmin() {
    const authResult = await AuthProvider.checkAuth(['admin', 'super_admin']);
    if (!authResult) return;

    const profile = authResult.profile;
    document.getElementById('admin-zone').textContent = profile.zone ? `Zone: ${profile.zone}` : 'Global Administrator';
    document.getElementById('stat-zone-name').textContent = profile.zone || 'All Zones';

    // Initial Data Load
    loadDashboardData();
})();

// -- TAB SWITCHING --
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = tab.dataset.tab;
        switchTab(target);
    });
});

function switchTab(tabId) {
    currentTab = tabId;
    
    // Update UI
    tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === tabId));
    tabContents.forEach(c => c.classList.toggle('active', c.id === tabId));
    
    // Update Title
    const titles = {
        overview: 'Dashboard Overview',
        inspectors: 'Staff Registry',
        reports: 'Approved Reports',
        declined: 'Declined by NCCG',
        payments: 'Revenue & Overdue',
        map: 'Geographic Overview'
    };
    tabTitle.textContent = titles[tabId];

    // Lazy load/refresh specific tab data
    if (tabId === 'map') initMap();
    if (tabId === 'inspectors') fetchInspectors();
    if (tabId === 'reports') fetchReports();
    if (tabId === 'declined') fetchReports();
    if (tabId === 'payments') fetchPayments();
}

// -- DATA FETCHING --

async function loadDashboardData() {
    try {
        // We must fetch reports first because fetchPayments depends on zoneReports
        await fetchInspectors();
        await fetchReports();
        await fetchPayments();
        await fetchUniqueZones();
        updateStats();
    } catch (e) {
        console.error("Dashboard Load Error:", e);
    }
}

let allAvailableZones = [
    "Dagoretti North", "Dagoretti South", 
    "Embakasi Central", "Embakasi East", "Embakasi North", "Embakasi South", "Embakasi West",
    "Kamkunji", "Kasarani", "Kibra", "Langata", "Makadara", "Mathare", 
    "Roysambu", "Ruaraka", "Starehe", "Westlands"
].sort();

async function fetchUniqueZones() {
    // We already have the official registry from the sheet names manifest.
    // This function is now just for debugging or future remote updates.
    console.log("Using official Geographic Registry with", allAvailableZones.length, "zones.");
    // Populate dropdown if it's already open
    if (inspectorModal && inspectorModal.classList.contains('open')) populateZoneDropdown();
}

function populateZoneDropdown() {
    const select = document.getElementById('insp-zone');
    if (!select) return;

    if (allAvailableZones.length === 0) {
        select.innerHTML = '<option value="">No zones found</option>';
        return;
    }

    let options = '<option value="">-- Select Zone --</option>';
    allAvailableZones.forEach(zone => {
        options += `<option value="${zone}">${zone}</option>`;
    });
    select.innerHTML = options;

    // Pre-select admin's zone if applicable
    if (window.CURRENT_PROFILE && window.CURRENT_PROFILE.zone) {
        select.value = window.CURRENT_PROFILE.zone;
    }
}

async function fetchInspectors() {
    let query = _serviceSub
        .from('user_profiles')
        .select('*')
        .in('role', ['inspector', 'nccg_officer', 'finance_manager']);

    const { data: profiles, error: profileError } = await query;
    if (profileError) {
        console.error("Error fetching inspectors:", profileError);
        return;
    }

    // 2. Fetch emails from auth system via service role
    const { data: authList, error: authError } = await _serviceSub.auth.admin.listUsers();

    if (!authError && authList?.users) {
        const emailMap = {};
        authList.users.forEach(u => { emailMap[u.id] = u.email; });
        profiles.forEach(p => { p.email = emailMap[p.id] || '—'; });
    }

    const nccgMap = {};
    profiles.filter(p => p.role === 'nccg_officer').forEach(p => nccgMap[p.id] = p.full_name);
    
    // 3. Map PHOs and NCCG Officers for rendering
    // We keep them all in activeInspectors but they'll be rendered with appropriate labels
    activeInspectors = profiles.map(p => ({
        ...p,
        assigned_nccg_name: nccgMap[p.assigned_nccg_id] || (p.role === 'nccg_officer' ? '—' : 'Unassigned')
    }));
    
    window.nccgProfiles = profiles.filter(p => p.role === 'nccg_officer'); // For allocation modal
    
    renderInspectors();
}

async function fetchReports() {
    let query = _serviceSub
        .from('inspections')
        .select(`
            *,
            businesses!inner (
                business_name,
                ward_name,
                subcounty_name,
                permit_no,
                building_name,
                street_name,
                contact_person,
                contact_email
            )
        `)
        .order('inspection_date', { ascending: false });

    const { data, error } = await query;
    if (error) {
        console.error("Error fetching reports:", error);
        return;
    }

    zoneReports = data;
    populateInspectorFilter(); // Build filter from live data
    applyFilters(); 
    updateStats();
}

function applyFilters() {
    const start = document.getElementById('report-filter-start').value;
    const end = document.getElementById('report-filter-end').value;
    const inspector = document.getElementById('report-filter-inspector').value;

    let filtered = [...zoneReports];

    if (start) {
        filtered = filtered.filter(r => new Date(r.inspection_date).toISOString().split('T')[0] >= start);
    }
    if (end) {
        filtered = filtered.filter(r => new Date(r.inspection_date).toISOString().split('T')[0] <= end);
    }
    if (inspector && inspector !== 'all') {
        const target = inspector.trim().toLowerCase();
        filtered = filtered.filter(r => (r.inspector_name || '').trim().toLowerCase() === target);
    }

    renderReports(filtered);
}

// Wire up filter controls — runs once DOM is ready
document.getElementById('report-filter-inspector').addEventListener('change', applyFilters);
document.getElementById('report-filter-start').addEventListener('change', applyFilters);
document.getElementById('report-filter-end').addEventListener('change', applyFilters);

function populateInspectorFilter() {
    const filterSelect = document.getElementById('report-filter-inspector');
    if (!filterSelect) return;

    // Extract unique names from the actual data we just fetched
    const uniqueNames = [...new Set(zoneReports.map(r => r.inspector_name))].filter(n => n).sort();
    
    filterSelect.innerHTML = '<option value="all">All Personnel</option>' + 
        uniqueNames.map(name => `<option value="${name}">${name}</option>`).join('');
}

function updateStats() {
    document.getElementById('stat-total-inspections').textContent = zoneReports.length;
    document.getElementById('stat-active-inspectors').textContent = activeInspectors.length;
    
    // Revenue stats
    const totalRevenue = allPayments.reduce((acc, r) => acc + (parseFloat(r.amount_paid) || 0), 0);
    const overdueCount = allPayments.filter(r => r.is_paid === false && r.status === 'completed').length;
    
    const revEl = document.getElementById('stat-total-revenue');
    const overEl = document.getElementById('stat-total-outstanding');
    if (revEl) revEl.textContent = `KES ${totalRevenue.toLocaleString()}`;
    if (overEl) overEl.textContent = overdueCount;
}

// -- RENDERING --

function renderInspectors() {
    const tbody = document.querySelector('#inspectors-table tbody');
    tbody.innerHTML = activeInspectors.map(insp => `
        <tr>
            <td>
                <div style="font-weight: 700;">${insp.full_name}</div>
                <div style="font-size: 0.7rem; color: #64748b;">
                    ${insp.role === 'nccg_officer' ? 'County Reviewer' : (insp.role === 'finance_manager' ? 'Finance Manager' : 'Field PHO')}
                </div>
            </td>
            <td>${insp.email || '—'}</td>
            <td>${insp.badge_number || '—'}</td>
            <td><span class="badge ${insp.role === 'nccg_officer' ? 'badge-amber' : 'badge-blue'}">${insp.zone || 'Global'}</span></td>
            <td>${insp.role === 'nccg_officer' ? '<span style="color: #94a3b8;">N/A (Officer)</span>' : `<strong>${insp.assigned_nccg_name}</strong>`}</td>
            <td><span class="badge ${insp.is_active ? 'badge-green' : 'badge-red'}">${insp.is_active ? 'Active' : 'Inactive'}</span></td>
            <td>
                <button class="btn-text" onclick="toggleUserStatus('${insp.id}', ${insp.is_active})" style="color: ${insp.is_active ? '#ef4444' : '#10b981'};">${insp.is_active ? 'Suspend' : 'Activate'}</button>
                <button class="btn-text" onclick="openTransferModal('${insp.id}', '${insp.zone}')" style="color: #2563eb; margin-left: 5px;">Transfer</button>
                ${insp.role === 'inspector' ? `<button class="btn-text" onclick="openAllocateModal('${insp.id}')" style="color: #10b981; margin-left: 5px;">Allocate</button>` : ''}
            </td>
        </tr>
    `).join('');
}

window.toggleUserStatus = async (userId, currentStatus) => {
    const newStatus = !currentStatus;
    if (!confirm(`Are you sure you want to ${newStatus ? 'activate' : 'suspend'} this user?`)) return;

    try {
        const { error } = await _serviceSub
            .from('user_profiles')
            .update({ is_active: newStatus })
            .eq('id', userId);

        if (error) throw error;
        
        ActivityTracker.log('user_update', `${newStatus ? 'Activated' : 'Suspended'} user account.`, { userId });
        alert(`User ${newStatus ? 'activated' : 'suspended'} successfully.`);
        fetchInspectors(); // Refresh the table
    } catch (err) {
        alert("Action failed: " + err.message);
    }
};

async function fetchPayments() {
    try {
        const { data, error } = await _serviceSub
            .from('inspections')
            .select(`
                *,
                businesses (
                    business_name,
                    ward_name
                )
            `)
            .order('payment_date', { ascending: false });

        if (error) throw error;
        allPayments = data || [];
        renderPayments();
    } catch (err) {
        console.error('Error fetching payments:', err);
    }
}

function renderPayments() {
    const collectionsTbody = document.querySelector('#collections-table tbody');
    const overdueTbody = document.querySelector('#overdue-table tbody');
    
    if (!collectionsTbody || !overdueTbody) return;

    const collections = allPayments.filter(p => p.is_paid === true);
    const overdue = allPayments.filter(p => p.is_paid === false && p.status === 'completed');

    collectionsTbody.innerHTML = collections.map(p => `
        <tr>
            <td>${p.payment_date ? new Date(p.payment_date).toLocaleDateString() : '—'}</td>
            <td>${p.businesses?.business_name || '—'}</td>
            <td><strong>KES ${p.amount_paid?.toLocaleString() || '0'}</strong></td>
            <td><code>${p.payment_ref || '—'}</code></td>
        </tr>
    `).join('') || '<tr><td colspan="4" style="text-align:center;">No collections recorded yet.</td></tr>';

    overdueTbody.innerHTML = overdue.map(p => `
        <tr>
            <td>${p.businesses?.business_name || '—'}</td>
            <td>${new Date(p.inspection_date).toLocaleDateString()}</td>
            <td><span style="color:#ef4444; font-weight:700;">PENDING</span></td>
            <td><button class="btn-text" onclick="showPaymentRemindModal('${p.id}')">View Details</button></td>
        </tr>
    `).join('') || '<tr><td colspan="4" style="text-align:center;">No overdue payments!</td></tr>';
}

function renderReports(items = null) {
    const reportsToRender = Array.isArray(items) ? items : zoneReports;
    const mainTbody = document.querySelector('#full-reports-table tbody');
    const recentTbody = document.querySelector('#recent-reports-table tbody');
    const declinedTbody = document.querySelector('#declined-reports-table tbody');

    // 1. Approved Reports (Main Tab)
    const approved = reportsToRender.filter(r => r.approval_status === 'approved');
    if (mainTbody) {
        mainTbody.innerHTML = approved.length > 0 ? approved.map(report => `
            <tr>
                <td>${new Date(report.inspection_date).toLocaleDateString()}</td>
                <td>${report.businesses.business_name}</td>
                <td>${report.inspector_name}</td>
                <td>${report.service_type || '—'}</td>
                <td>
                    <button class="btn-text" onclick="viewReport('${report.id}')">View</button>
                    <button class="btn-text" onclick="downloadReport('${report.id}')" style="color: var(--primary); margin-left: 8px;">Download</button>
                </td>
            </tr>
        `).join('') : '<tr><td colspan="5" style="text-align:center; padding: 2rem; color: #64748b;">No approved reports found.</td></tr>';
    }

    // 2. Declined Reports (Admin visibility)
    const declined = reportsToRender.filter(r => r.approval_status === 'declined');
    if (declinedTbody) {
        declinedTbody.innerHTML = declined.length > 0 ? declined.map(report => `
            <tr>
                <td>${new Date(report.inspection_date).toLocaleDateString()}</td>
                <td>${report.businesses.business_name}</td>
                <td>${report.inspector_name}</td>
                <td><span style="color:#ef4444; font-size:0.8rem;">Reason: ${report.nccg_notes || 'No reason provided'}</span></td>
            </tr>
        `).join('') : '<tr><td colspan="4" style="text-align:center; padding: 2rem; color: #64748b;">No declined reports in this period.</td></tr>';
    }

    // 3. Recent Activity (Dashboard)
    if (recentTbody) {
        recentTbody.innerHTML = reportsToRender.slice(0, 5).map(report => `
            <tr>
                <td>${new Date(report.inspection_date).toLocaleDateString()}</td>
                <td>${report.businesses.business_name}</td>
                <td>${report.inspector_name}</td>
                <td><span class="badge ${report.approval_status === 'approved' ? 'badge-green' : (report.approval_status === 'declined' ? 'badge-amber' : 'badge-amber')}">${(report.approval_status || 'pending').toUpperCase()}</span></td>
            </tr>
        `).join('');
    }
}

async function fetchPayments() {
    // Re-use zoneReports logic but specifically for payment views
    const paidItems = zoneReports.filter(r => r.is_paid);
    const overdueItems = zoneReports.filter(r => !r.is_paid);
    
    renderPayments(paidItems, overdueItems);
}

function renderPayments(paid, overdue) {
    const collectionsTbody = document.querySelector('#collections-table tbody');
    const overdueTbody = document.querySelector('#overdue-table tbody');

    if (!collectionsTbody || !overdueTbody) return;

    collectionsTbody.innerHTML = paid.length > 0 ? paid.map(p => `
        <tr>
            <td>${new Date(p.inspection_date).toLocaleDateString()}</td>
            <td>${p.businesses?.business_name || '—'}</td>
            <td style="font-weight:700; color:#10b981;">KES ${(parseFloat(p.amount_paid) || 0).toLocaleString()}</td>
            <td><code>${p.payment_ref || '—'}</code></td>
        </tr>
    `).join('') : '<tr><td colspan="4" style="text-align:center; padding:1rem; color:#94a3b8;">No collections yet.</td></tr>';

    overdueTbody.innerHTML = overdue.length > 0 ? overdue.map(o => `
        <tr>
            <td>${o.businesses?.business_name || '—'}</td>
            <td>${new Date(o.inspection_date).toLocaleDateString()}</td>
            <td style="color:#ef4444; font-weight:700;">UNPAID</td>
            <td><span class="badge badge-blue">${o.businesses?.subcounty_name || o.businesses?.ward_name || '—'}</span></td>
        </tr>
    `).join('') : '<tr><td colspan="4" style="text-align:center; padding:1rem; color:#94a3b8;">All clear! No overdue payments.</td></tr>';
}

// -- ACTIONS --

document.getElementById('btn-add-inspector').onclick = () => {
    inspectorModal.classList.add('open');
    populateZoneDropdown();
};

document.getElementById('btn-close-modal').onclick = () => {
    inspectorModal.classList.remove('open');
};

// -- TRANSFER LOGIC --
const transferModal = document.getElementById('transfer-modal');
const closeTransferBtn = document.getElementById('btn-close-transfer');
const saveTransferBtn = document.getElementById('btn-save-transfer');

window.openTransferModal = (id, currentZone) => {
    document.getElementById('transfer-inspector-id').value = id;
    const select = document.getElementById('transfer-zone-select');
    
    // Populate select with allAvailableZones
    let options = '<option value="">-- Select New Zone --</option>';
    allAvailableZones.forEach(zone => {
        options += `<option value="${zone}" ${zone === currentZone ? 'selected' : ''}>${zone}</option>`;
    });
    select.innerHTML = options;
    
    transferModal.classList.add('open');
};

closeTransferBtn.onclick = () => transferModal.classList.remove('open');

saveTransferBtn.onclick = async () => {
    const id = document.getElementById('transfer-inspector-id').value;
    const newZone = document.getElementById('transfer-zone-select').value;
    
    if (!newZone) return alert('Please select a target zone.');
    
    saveTransferBtn.disabled = true;
    saveTransferBtn.textContent = 'Transferring...';
    
    try {
        const { error } = await _serviceSub
            .from('user_profiles')
            .update({ zone: newZone })
            .eq('id', id);
            
        if (error) throw error;
        
        ActivityTracker.log('user_update', `Transferred PHO to new zone: ${newZone}`, { userId: id, newZone });
        
        alert('Personnel transferred successfully.');
        transferModal.classList.remove('open');
        fetchInspectors(); // Refresh list
    } catch (err) {
        alert('Transfer failed: ' + err.message);
    } finally {
        saveTransferBtn.disabled = false;
        saveTransferBtn.textContent = 'Complete Transfer';
    }
};

addInspectorForm.onsubmit = async (e) => {
    e.preventDefault();
    const btn = addInspectorForm.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Creating...';

    const email = document.getElementById('insp-email').value;
    const password = document.getElementById('insp-password').value;
    const fullName = document.getElementById('insp-name').value;
    const badge = document.getElementById('insp-badge').value;
    const zone = document.getElementById('insp-zone').value;
    const role = document.getElementById('insp-role').value;

    try {
        // 1. Create auth user using service role (instant confirmation)
        const { data: authData, error: authError } = await _serviceSub.auth.admin.createUser({
            email,
            password,
            email_confirm: true
        });

        if (authError) throw authError;

        // 2. Create profile using service role (bypasses RLS)
        const { error: profileError } = await _serviceSub
            .from('user_profiles')
            .insert({
                id: authData.user.id,
                full_name: fullName,
                role: role,
                zone: zone,
                badge_number: badge,
                created_by: window.CURRENT_PROFILE.id
            });

        if (profileError) throw profileError;

        // Log activity: Account Created
        ActivityTracker.log('user_create', `Provisioned new ${role} account for ${fullName}`, { role: role, zone: zone });

        alert(`${role === 'nccg_officer' ? 'NCCG Officer' : 'PHO'} account created successfully!`);
        inspectorModal.classList.remove('open');
        addInspectorForm.reset();
        fetchInspectors();
    } catch (err) {
        alert('Error: ' + err.message);
    } finally {
        btn.disabled = false;
        btn.textContent = 'Create Account';
    }
};

window.viewReport = (id) => {
    const report = zoneReports.find(r => r.id === id);
    if (report) {
        // For now, view is same as download
        downloadReport(id);
    }
};

window.downloadReport = async (id) => {
    const report = zoneReports.find(r => r.id === id);
    if (!report) return;
    
    // Ensure it's formatted for generatePDF
    const formatted = {
        ...report,
        client: report.businesses
    };
    
    await generatePDF(formatted);
};

// --- PDF GENERATION (ADAPTED FROM APP.JS) ---

async function fetchImageAsDataUrl(url) {
    try {
        const resp = await fetch(url);
        const blob = await resp.blob();
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    } catch (e) {
        console.warn('Image fetch failed:', url, e);
        return null;
    }
}

async function generatePDF(r) {
    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        const c = r.client;

        // Fetch logo for header
        let logoData = await fetchImageAsDataUrl('src/nairobi_logo.png');

        const pageW = doc.internal.pageSize.getWidth();
        const pageH = doc.internal.pageSize.getHeight();
        const margin = 14;
        const usableW = pageW - margin * 2;
        let y = margin;

        const GREEN  = [16, 185, 129];
        const DARK   = [30, 41, 59];
        const GRAY   = [100, 116, 139];
        // const LGRAY  = [226, 232, 240]; // reserved for future table borders

        function checkPage(needed = 10) {
            if (y + needed > pageH - margin) { doc.addPage(); y = margin; }
        }

        function sectionBar(title) {
            checkPage(14);
            doc.setFillColor(...GREEN);
            doc.roundedRect(margin, y, usableW, 8, 1, 1, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(8.5);
            doc.setFont('helvetica', 'bold');
            doc.text(title, margin + 3, y + 5.5);
            y += 12;
            doc.setTextColor(...DARK);
            doc.setFont('helvetica', 'normal');
        }

        function row(label, value, x2, label2, value2) {
            checkPage(7);
            doc.setFontSize(8);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(...GRAY);
            doc.text(label, margin, y);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(...DARK);
            doc.text(String(value || '—'), margin + 32, y);
            if (x2 && label2) {
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(...GRAY);
                doc.text(label2, x2, y);
                doc.setFont('helvetica', 'normal');
                doc.setTextColor(...DARK);
                doc.text(String(value2 || '—'), x2 + 32, y);
            }
            y += 6;
        }

        function bullets(items) {
            if (!items || items.length === 0) {
                checkPage(6);
                doc.setFontSize(8);
                doc.setTextColor(...GRAY);
                doc.text('None recorded', margin + 3, y);
                y += 6;
                return;
            }
            items.forEach(item => {
                checkPage(6);
                doc.setFontSize(8);
                doc.setTextColor(...DARK);
                const lines = doc.splitTextToSize('• ' + item, usableW - 5);
                doc.text(lines, margin + 3, y);
                y += lines.length * 5.5;
            });
        }

        // ── HEADER ───────────────────────────────────────────────────────────
        doc.setFillColor(...GREEN);
        doc.rect(0, 0, pageW, 55, 'F');
        if (logoData) doc.addImage(logoData, 'PNG', pageW/2 - 14, 8, 28, 28);
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('NAIROBI CITY GOVERNMENT', pageW/2, 42, { align: 'center' });
        doc.setFontSize(10);
        doc.text('INTEGRATED PEST CONTROL MANAGEMENT AUDIT REPORT', pageW/2, 48, { align: 'center' });
        doc.setFontSize(7);
        doc.setFont('helvetica', 'normal');
        doc.text('Generated: ' + new Date().toLocaleString(), margin, 60);
        y = 68;

        // ── CLIENT INFO ─────────────────────────────────────────────
        sectionBar('CLIENT INFORMATION');
        row('Business:', c.business_name, pageW/2, 'Permit No:', c.permit_no);
        row('Location:', (`${c.building_name||''} ${c.street_name||''}`).trim() || '—', pageW/2, 'Contact:', c.contact_person);
        if (c.contact_email) row('Email:', c.contact_email);
        y += 2;

        // ── INSPECTION DETAILS ───────────────────────────────────────────
        sectionBar('INSPECTION DETAILS');
        row('Date & Time:', new Date(r.inspection_date).toLocaleString(), pageW/2, 'Inspector:', r.inspector_name);
        row('Personnel:', (r.personnel || []).join(', ') || '—', pageW/2, 'Service Type:', r.service_type || '—');
        y += 2;

        // ── RESULTS ──────────────────────────────────────────────
        sectionBar('SANATION ASSESSMENT');
        row('Housekeeping:', r.housekeeping_rating || '—', pageW/2, 'Waste Mgmt:', r.waste_management_rating || '—');
        row('Stacking:', r.stacking_rating || '—', pageW/2, 'Overall:', r.overall_sanitation_rating || '—');
        y += 2;

        sectionBar('ISSUES & RECOMMENDATIONS');
        doc.setFontSize(8); doc.setFont('helvetica', 'bold'); doc.text('Issues Found:', margin, y); y += 5;
        bullets(r.issues_found);
        y += 3;
        doc.setFontSize(8); doc.setFont('helvetica', 'bold'); doc.text('Recommendations:', margin, y); y += 5;
        bullets(r.recommendations);
        y += 2;

        // ── PHOTOS ────────────────────────────────────────────────────────
        const photos = r.photo_urls || [];
        if (photos.length > 0) {
            sectionBar('ATTACHED PHOTOS');
            const imgW = (usableW - 5) / 2;
            const imgH = imgW * 0.72;
            let col = 0;

            for (const url of photos) {
                try {
                    const dataUrl = await fetchImageAsDataUrl(url);
                    if (!dataUrl) continue;
                    
                    checkPage(imgH + 10);
                    const x = margin + col * (imgW + 5);
                    doc.addImage(dataUrl, 'JPEG', x, y, imgW, imgH);
                    
                    col++;
                    if (col >= 2) { col = 0; y += imgH + 10; }
                } catch (e) { console.warn('Photo skip:', e); }
            }
            if (col > 0) y += imgH + 10;
        }

        // FOOTER
        const totalPages = doc.internal.getNumberOfPages();
        for(let p=1; p<=totalPages; p++){
            doc.setPage(p);
            doc.setFontSize(7);
            doc.setTextColor(...GRAY);
            doc.text(`Page ${p} of ${totalPages}`, pageW - margin, pageH - 6, { align: 'right' });
            doc.text('Official Nairobi City County Inspection Document', margin, pageH - 6);
        }

        doc.save(`Report_${c.business_name.replace(/\s+/g,'_')}.pdf`);
    } catch (err) {
        console.error('PDF Error:', err);
        alert('Failed to generate PDF: ' + err.message);
    }
}

// -- MAP --

function initMap() {
    if (map) return; // already initialized

    // Center on Nairobi or the zone's primary coordinates
    map = L.map('admin-map').setView([-1.286389, 36.817223], 13);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Add pins for inspections
    // Map pins reserved for future lat/lng implementation when businesses table has coordinates
    // zoneReports.forEach(report => { ... });
}

// -- PHO ALLOCATION --

window.openAllocateModal = (id) => {
    document.getElementById('allocate-user-id').value = id;
    const select = document.getElementById('allocate-nccg-select');
    
    // Populate the dropdown with available NCCG officers
    const options = window.nccgProfiles.map(n => `<option value="${n.id}">${n.full_name} (${n.zone || 'Global'})</option>`).join('');
    select.innerHTML = '<option value="">— Select NCCG Officer —</option>' + 
                       '<option value="none">Clear Allocation (Unassign)</option>' + options;

    document.getElementById('allocate-modal').classList.add('open');
};

document.getElementById('allocate-form').onsubmit = async (e) => {
    e.preventDefault();
    const phoId = document.getElementById('allocate-user-id').value;
    const nccgId = document.getElementById('allocate-nccg-select').value;
    const btn = document.getElementById('allocate-form').querySelector('button[type="submit"]');
    
    btn.disabled = true;
    btn.textContent = 'Allocating...';

    try {
        const assignedValue = nccgId === 'none' ? null : nccgId;
        
        const { error } = await _serviceSub
            .from('user_profiles')
            .update({ assigned_nccg_id: assignedValue })
            .eq('id', phoId);

        if (error) throw error;

        // Log activity
        ActivityTracker.log('pho_allocation', `Updated NCCG assignment for PHO.`, { phoId, nccgId: assignedValue });

        alert('NCCG Officer allocated successfully.');
        document.getElementById('allocate-modal').classList.remove('open');
        fetchInspectors(); // Refresh the table
    } catch (err) {
        alert("Failed to allocate: " + err.message);
    } finally {
        btn.disabled = false;
        btn.textContent = 'Assign PHO';
    }
};
