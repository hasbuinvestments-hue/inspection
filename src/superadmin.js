// Initialize Supabase for Super Admin
const _superSupabase = supabase.createClient(window.SUPABASE_CONFIG.url, window.SUPABASE_CONFIG.anonKey);

// Service role client — used for admin bypass of RLS + Rate Limits during staff creation
const _adminSupabase = supabase.createClient(window.SUPABASE_CONFIG.url, window.SUPABASE_CONFIG.serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false }
});

// State
let currentTab = 'overview';
let allUsers = [];
let allReports = [];
let map = null;

// DOM Elements
const tabs = document.querySelectorAll('.nav-item');
const tabContents = document.querySelectorAll('.tab-content');
const userModal = document.getElementById('user-modal');
const addUserForm = document.getElementById('add-user-form');

// Auth Guard
(async function initSuperAdmin() {
    const authResult = await AuthProvider.checkAuth(['super_admin']);
    if (!authResult) return;

    // Initial Data Load
    loadGlobalData();
    
    // Start Realtime Subscription
    initRealtimeActivity();
})();

/**
 * Initialize Supabase Realtime for activity logs
 */
function initRealtimeActivity() {
    const statusEl = document.getElementById('realtime-status');
    
    _superSupabase
        .channel('system_logs')
        .on('postgres_changes', { 
            event: 'INSERT', 
            schema: 'public', 
            table: 'system_activity_logs' 
        }, payload => {
            addActivityToFeed(payload.new);
            
            // Pulse status
            if (statusEl) {
                statusEl.textContent = '● ACTIVE';
                statusEl.style.background = '#fef08a';
                statusEl.style.color = '#854d0e';
                setTimeout(() => {
                    statusEl.textContent = '● MONITORING';
                    statusEl.style.background = '#dcfce7';
                    statusEl.style.color = '#166534';
                }, 2000);
            }
        })
        .subscribe();

    // Fetch initial logs
    fetchInitialActivity();
}

async function fetchInitialActivity() {
    const { data, error } = await _superSupabase
        .from('system_activity_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

    if (error) {
        console.error("Error fetching initial logs:", error);
        return;
    }

    const feed = document.getElementById('activity-feed');
    if (data.length > 0) feed.innerHTML = ''; // Clear empty message
    data.forEach(log => addActivityToFeed(log, false));
}

function addActivityToFeed(log, isNew = true) {
    const feed = document.getElementById('activity-feed');
    if (!feed) return;

    // Remove empty message if this is the first item
    if (feed.querySelector('div[style*="text-align: center"]')) {
        feed.innerHTML = '';
    }

    const item = document.createElement('div');
    item.className = 'activity-item' + (isNew ? ' fade-in' : '');
    
    // Style for activity item
    const style = `
        padding: 0.75rem;
        border-bottom: 1px solid #f1f5f9;
        font-size: 0.85rem;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        ${isNew ? 'background-color: #f0f9ff;' : ''}
    `;
    item.setAttribute('style', style);

    const time = new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    item.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <strong style="color: #0f172a;">${log.user_name}</strong>
            <span style="font-size: 0.7rem; color: #94a3b8;">${time}</span>
        </div>
        <div style="color: #475569;">${log.description}</div>
        <div style="font-size: 0.7rem; color: #10b981; font-weight: 600;">#${log.zone}</div>
    `;

    if (isNew) {
        feed.prepend(item);
        // Highlight for 3 seconds
        setTimeout(() => {
            item.style.backgroundColor = 'transparent';
        }, 3000);
    } else {
        feed.appendChild(item);
    }
}

// -- TAB SWITCHING --
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = tab.dataset.tab;
        switchTab(target);
    });
});

function switchTab(tabId) {
    currentTab = tabId;
    tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === tabId));
    tabContents.forEach(c => c.classList.toggle('active', c.id === tabId));
    
    const titles = {
        overview: 'System Health Status',
        users: 'System Administrators',
        reports: 'Global Performance Monitoring',
        map: 'Global Activity Map'
    };
    document.getElementById('tab-title').textContent = titles[tabId];

    if (tabId === 'map') initMap();
    if (tabId === 'users') fetchUsers();
    if (tabId === 'reports') fetchReports();
}

// -- DATA FETCHING --

async function loadGlobalData() {
    await fetchUsers();
    await fetchReports();
    updateStats();
}

async function fetchUsers() {
    // Fetch profiles
    const { data: profiles, error: profileError } = await _superSupabase
        .from('user_profiles')
        .select('*')
        .order('role');

    if (profileError) {
        console.error("Error fetching users:", profileError);
        return;
    }

    // Fetch emails from auth.users via service role
    const { data: authList, error: authError } = await _adminSupabase.auth.admin.listUsers();

    if (!authError && authList?.users) {
        const emailMap = {};
        authList.users.forEach(u => { emailMap[u.id] = u.email; });
        profiles.forEach(p => { p.email = emailMap[p.id] || '—'; });
    }

    allUsers = profiles;
    renderUsers();
}

async function fetchReports() {
    const { data, error } = await _superSupabase
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

    if (error) {
        console.error("Error fetching global reports:", error);
        return;
    }

    allReports = data;
    renderReports();
    updateStats();
}

function updateStats() {
    document.getElementById('stat-total-inspections').textContent = allReports.length;
    document.getElementById('stat-total-users').textContent = allUsers.length;
    
    const zones = new Set(allReports.map(r => r.businesses.subcounty_name).filter(z => z));
    document.getElementById('stat-total-zones').textContent = zones.size;
}

// -- RENDERING --

function renderUsers() {
    const tbody = document.querySelector('#users-table tbody');
    tbody.innerHTML = allUsers.map(user => `
        <tr>
            <td>${user.full_name}</td>
            <td>${user.email || '—'}</td>
            <td><span class="badge role-${user.role === 'super_admin' ? 'super' : user.role === 'admin' ? 'admin' : 'insp'}">${user.role.toUpperCase()}</span></td>
            <td>${user.zone || 'Global'}</td>
            <td>
                <button class="btn-text" onclick="toggleUserStatus('${user.id}', ${user.is_active})" style="color: ${user.is_active ? '#ef4444' : '#10b981'};">${user.is_active ? 'Suspend' : 'Activate'}</button>
                <button class="btn-text" onclick="deleteUserAccount('${user.id}')" style="color: #ef4444; margin-left: 10px;">Delete</button>
            </td>
        </tr>
    `).join('');
}

window.toggleUserStatus = async (userId, currentStatus) => {
    const newStatus = !currentStatus;
    if (!confirm(`Are you sure you want to ${newStatus ? 'activate' : 'suspend'} this user account?`)) return;

    try {
        const { error } = await _adminSupabase
            .from('user_profiles')
            .update({ is_active: newStatus })
            .eq('id', userId);

        if (error) throw error;
        
        ActivityTracker.log('user_update', `SuperAdmin ${newStatus ? 'activated' : 'suspended'} user profile.`, { userId });
        alert(`Account ${newStatus ? 'activated' : 'suspended'} successfully.`);
        loadGlobalData();
    } catch (err) {
        alert("Action failed: " + err.message);
    }
};

window.deleteUserAccount = async (userId) => {
    if (!confirm("CRITICAL WARNING: This will permanently delete both the user profile AND their authentication account. This action CANNOT be undone. Proceed?")) return;
    
    // Final double confirmation for deletion
    if (!confirm("Are you absolutely sure?")) return;

    try {
        // 1. Delete from Auth (this also deletes from public.user_profiles due to CASCADE)
        const { error } = await _adminSupabase.auth.admin.deleteUser(userId);

        if (error) throw error;
        
        ActivityTracker.log('user_delete', `SuperAdmin permanently DELETED user account.`, { userId });
        alert("User account deleted successfully.");
        loadGlobalData();
    } catch (err) {
        alert("Deletion failed: " + err.message);
    }
};

function renderReports() {
    const mainTbody = document.querySelector('#full-reports-table tbody');
    const recentTbody = document.querySelector('#recent-reports-table tbody');

    const reportRows = allReports.map(report => `
        <tr>
            <td>${new Date(report.inspection_date).toLocaleDateString()}</td>
            <td>${report.businesses.business_name}</td>
            <td>${report.businesses.ward_name || '—'}</td>
            <td>${report.inspector_name}</td>
            <td>${report.overall_sanitation_rating || '—'}</td>
            <td><button class="btn-text" onclick="viewReport('${report.id}')">View</button></td>
        </tr>
    `).join('');

    if (mainTbody) mainTbody.innerHTML = reportRows;
    if (recentTbody) recentTbody.innerHTML = reportRows.slice(0, 10);
}

// -- ACTIONS --

document.getElementById('btn-add-user').onclick = () => {
    userModal.classList.add('open');
    // Populate zone dropdown from live report data
    const zoneSelect = document.getElementById('user-zone');
    if (zoneSelect) {
        const zones = [...new Set(allReports.map(r => r.businesses?.subcounty_name || r.businesses?.ward_name).filter(z => z))].sort();
        zoneSelect.innerHTML = '<option value="">— No specific zone —</option>' +
            zones.map(z => `<option value="${z}">${z}</option>`).join('');
    }
};

document.getElementById('btn-close-modal').onclick = () => {
    userModal.classList.remove('open');
};

addUserForm.onsubmit = async (e) => {
    e.preventDefault();
    const btn = addUserForm.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Provisioning...';

    const email = document.getElementById('user-email').value;
    const password = document.getElementById('user-password').value;
    const fullName = document.getElementById('user-name').value;
    const role = document.getElementById('user-role-select').value;
    const zone = document.getElementById('user-zone').value;

    try {
        // 1. Create auth user using service role (no email confirmation required)
        const { data: authData, error: authError } = await _adminSupabase.auth.admin.createUser({
            email,
            password,
            email_confirm: true   // mark as confirmed immediately — no email link needed
        });

        if (authError) throw authError;

        // 2. Create profile using service role (bypasses RLS)
        const { error: profileError } = await _adminSupabase
            .from('user_profiles')
            .insert({
                id: authData.user.id,
                full_name: fullName,
                role: role,
                zone: zone,
                created_by: window.CURRENT_PROFILE.id
            });

        if (profileError) throw profileError;
        
        alert('SUCCESS: Staff account successfully provisioned!');
        userModal.classList.remove('open');
        addUserForm.reset();
        await fetchUsers(); // Re-fetch the list
    } catch (err) {
        console.error("DEBUG: Provisioning failed", err);
        const errorMsg = err.message || 'Unknown network error';
        const errorDetail = err.details || 'Check console for object';
        alert(`PROVISIONING FAILED!\n\nReason: ${errorMsg}\n\nHint: ${errorDetail}`);
    } finally {
        btn.disabled = false;
        btn.textContent = '✓ Create Account';
    }
}

window.toggleUserStatus = async (id, currentActive) => {
    const { error } = await _superSupabase
        .from('user_profiles')
        .update({ is_active: !currentActive })
        .eq('id', id);

    if (error) {
        alert("Error updating user: " + error.message);
    } else {
        fetchUsers();
    }
};

window.viewReport = (id) => {
    const report = allReports.find(r => r.id === id);
    if (report) {
        downloadReport(id);
    }
};

window.downloadReport = async (id) => {
    const report = allReports.find(r => r.id === id);
    if (!report) return;
    
    const formatted = {
        ...report,
        client: report.businesses
    };
    
    await generatePDF(formatted);
};

// --- PDF GENERATION CORE ---

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

        let logoData = await fetchImageAsDataUrl('src/nairobi_logo.png');

        const pageW = doc.internal.pageSize.getWidth();
        const pageH = doc.internal.pageSize.getHeight();
        const margin = 14;
        const usableW = pageW - margin * 2;
        let y = margin;

        const GREEN  = [16, 185, 129];
        const DARK   = [30, 41, 59];
        const GRAY   = [100, 116, 139];

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

        // ── HEADER ──
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

        // ── CLIENT INFO ──
        sectionBar('CLIENT INFORMATION');
        row('Business:', c.business_name, pageW/2, 'Permit No:', c.permit_no);
        row('Location:', (`${c.building_name||''} ${c.street_name||''}`).trim() || '—', pageW/2, 'Contact:', c.contact_person);
        if (c.contact_email) row('Email:', c.contact_email);
        y += 2;

        // ── INSPECTION DETAILS ──
        sectionBar('INSPECTION DETAILS');
        row('Date & Time:', new Date(r.inspection_date).toLocaleString(), pageW/2, 'Inspector:', r.inspector_name);
        row('Personnel:', (r.personnel || []).join(', ') || '—', pageW/2, 'Service Type:', r.service_type || '—');
        y += 2;

        // ── RESULTS ──
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

        // ── PHOTOS ──
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
    if (map) return;
    map = L.map('global-map').setView([-1.286389, 36.817223], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
}
