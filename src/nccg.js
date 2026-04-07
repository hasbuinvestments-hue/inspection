// Initialize Supabase for NCCG Officer
const _nccgSupabase = supabase.createClient(window.SUPABASE_CONFIG.url, window.SUPABASE_CONFIG.anonKey);

// State
let currentTab = 'pending';
let reports = [];

// DOM Elements
const tabs = document.querySelectorAll('.nav-item');
const tabContents = document.querySelectorAll('.tab-content');
const tabTitle = document.getElementById('tab-title');
const declineModal = document.getElementById('decline-modal');
const declineForm = document.getElementById('decline-form');

// Auth Guard
(async function initNCCG() {
    const authResult = await AuthProvider.checkAuth(['nccg_officer', 'super_admin']);
    if (!authResult) return;

    // Initial Data Load
    fetchReports();
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
        pending: 'Pending Approvals',
        history: 'Review History'
    };
    tabTitle.textContent = titles[tabId];

    // Re-render based on tab
    renderReports();
}

// -- DATA FETCHING --
async function fetchReports() {
    // 1. Fetch PHOs assigned to this NCCG Officer
    const { data: myPhos, error: phoError } = await _nccgSupabase
        .from('user_profiles')
        .select('full_name')
        .eq('assigned_nccg_id', window.CURRENT_PROFILE.id);

    if (phoError) {
        console.error("Error fetching assigned PHOs:", phoError);
        return;
    }

    const assignedNames = myPhos.map(p => p.full_name);

    // If no PHOs are assigned to this officer, they have no reports to review
    if (assignedNames.length === 0) {
        reports = [];
        renderReports();
        return;
    }

    // 2. Fetch reports only for assigned PHOs
    let query = _nccgSupabase
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
        .in('inspector_name', assignedNames)
        .order('inspection_date', { ascending: false });

    const { data, error } = await query;
    if (error) {
        console.error("Error fetching reports:", error);
        return;
    }

    // Default existing reports without approval status to 'pending' to avoid failing legacy records
    reports = data.map(r => ({
        ...r,
        approval_status: r.approval_status || 'pending'
    }));
    
    renderReports();
}

// -- RENDERING --
function renderReports() {
    const pendingTbody = document.querySelector('#pending-table tbody');
    const historyTbody = document.querySelector('#history-table tbody');

    const pendingReports = reports.filter(r => r.approval_status === 'pending');
    // History includes things they approved or declined
    const historyReports = reports.filter(r => r.approval_status === 'approved' || r.approval_status === 'declined');

    // Render Pending
    if (pendingTbody) {
        pendingTbody.innerHTML = pendingReports.length > 0 ? pendingReports.map(report => `
            <tr>
                <td>${new Date(report.inspection_date).toLocaleDateString()}</td>
                <td>${report.businesses?.business_name || '—'}</td>
                <td>${report.inspector_name}</td>
                <td>${report.overall_sanitation_rating || '—'}</td>
                <td>
                    <button class="action-button approve" onclick="approveReport('${report.id}')">✅ Approve</button>
                    <button class="action-button decline" onclick="openDeclineModal('${report.id}')">❌ Decline</button>
                    <button class="btn-text" onclick="viewReport('${report.id}')" style="margin-left:8px;">View PDF</button>
                </td>
            </tr>
        `).join('') : '<tr><td colspan="5" style="text-align:center; padding: 2rem; color: #64748b;">No pending reports off queue.</td></tr>';
    }

    // Render History
    if (historyTbody) {
        historyTbody.innerHTML = historyReports.length > 0 ? historyReports.map(report => `
            <tr>
                <td>${new Date(report.inspection_date).toLocaleDateString()}</td>
                <td>${report.businesses?.business_name || '—'}</td>
                <td>${report.inspector_name}</td>
                <td>
                    <span class="badge ${report.approval_status === 'approved' ? 'badge-green' : 'badge-red'}">
                        ${report.approval_status.toUpperCase()}
                    </span>
                </td>
                <td>
                    ${report.approval_status === 'declined' ? `<span style="font-size:0.75rem;color:#64748b;">Reason: ${report.nccg_notes || '—'}</span>` : `<button class="btn-text" onclick="viewReport('${report.id}')">View PDF</button>`}
                </td>
            </tr>
        `).join('') : '<tr><td colspan="5" style="text-align:center; padding: 2rem; color: #64748b;">No review history.</td></tr>';
    }
}

// -- ACTIONS --

window.approveReport = async (id) => {
    if (!confirm("Are you sure you want to approve this report? It will become visible to Admins and Collections.")) return;

    try {
        const { error } = await _nccgSupabase
            .from('inspections')
            .update({
                approval_status: 'approved',
                nccg_officer_name: window.CURRENT_PROFILE.full_name,
                approved_at: new Date().toISOString(),
                nccg_notes: null // clear any previous decline notes
            })
            .eq('id', id);

        if (error) throw error;

        // Log
        ActivityTracker.log('report_approved', `Approved inspection report for report ID: ${id}`);
        fetchReports(); // Refresh
        
    } catch (err) {
        alert("Failed to approve report: " + err.message);
    }
};

window.openDeclineModal = (id) => {
    document.getElementById('decline-report-id').value = id;
    document.getElementById('decline-notes').value = '';
    declineModal.classList.add('open');
};

document.getElementById('btn-close-modal').onclick = () => {
    declineModal.classList.remove('open');
};

declineForm.onsubmit = async (e) => {
    e.preventDefault();
    const id = document.getElementById('decline-report-id').value;
    const notes = document.getElementById('decline-notes').value;
    const btn = declineForm.querySelector('button[type="submit"]');

    btn.disabled = true;
    btn.textContent = 'Declining...';

    try {
        const { error } = await _nccgSupabase
            .from('inspections')
            .update({
                approval_status: 'declined',
                nccg_officer_name: window.CURRENT_PROFILE.full_name,
                nccg_notes: notes,
                approved_at: null // clear previous approval if it was somehow toggled
            })
            .eq('id', id);

        if (error) throw error;

        ActivityTracker.log('report_declined', `Declined inspection report for report ID: ${id}`, { notes });
        declineModal.classList.remove('open');
        fetchReports(); // Refresh

    } catch (err) {
        alert("Failed to decline report: " + err.message);
    } finally {
        btn.disabled = false;
        btn.textContent = 'Confirm Decline';
    }
};

window.viewReport = (id) => {
    const report = reports.find(r => r.id === id);
    if (report) {
        downloadReport(id);
    }
};

window.downloadReport = async (id) => {
    const report = reports.find(r => r.id === id);
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
