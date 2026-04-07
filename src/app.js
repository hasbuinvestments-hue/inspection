// Initialize Supabase
const { createClient } = supabase;
const _supabase = createClient(window.SUPABASE_CONFIG.url, window.SUPABASE_CONFIG.anonKey);
const _serviceSupabase = createClient(window.SUPABASE_CONFIG.url, window.SUPABASE_CONFIG.serviceRoleKey);

// --- AUTH GUARD ---
(async function initApp() {
    // Only logged in users. We allow all roles to test the form if they want, 
    // but the router in auth.js redirects admins/superadmins to their dashboard anyway if they go to login.
    // Wait, let's allow all 3 roles here so an admin can do an inspection if needed.
    const authResult = await AuthProvider.checkAuth(['inspector', 'admin', 'super_admin']);
    if (!authResult) return; 
    
    const inspNameInput = document.getElementById('inspector-name');
    if (inspNameInput && authResult.profile) {
        inspNameInput.value = authResult.profile.full_name;
        inspNameInput.readOnly = true;
        inspNameInput.classList.add('locked');
    }
})();


// State management
let selectedClient = null;
let personnelList = [];
let chemicalsUsed = [];
let photoData = []; // each entry: { file, cardElement }
let lastReport = null; // holds last submitted data for PDF/email

const customTags = { 'areas': [], 'pests': [], 'treatment': [], 'issues': [], 'recs': [], 'sighting': [] };

// DOM Elements
const clientSearch = document.getElementById('client-search');
const searchResults = document.getElementById('search-results');
const clientInfo = document.getElementById('client-info');
const inspectionForm = document.getElementById('inspection-form');
const personnelInput = document.getElementById('personnel-input');
const personnelTags = document.getElementById('personnel-tags');
const chemicalInput = document.getElementById('chemical-input');
const chemicalTags = document.getElementById('chemical-tags');
const photoUpload = document.getElementById('photo-upload');
const photoPreview = document.getElementById('photo-preview');
const submitBtn = document.getElementById('submit-btn');

// Default date/time to now
document.getElementById('inspection-date').value = new Date().toISOString().slice(0, 16);

// --- 1. SEARCH LOGIC ---

let searchTimeout;
clientSearch.addEventListener('input', (e) => {
    const query = e.target.value.trim();
    clearTimeout(searchTimeout);

    if (query.length < 3) {
        searchResults.classList.add('hidden');
        return;
    }

    searchTimeout = setTimeout(() => performSearch(query), 300);
});

async function performSearch(query) {
    // Fetch results based on name/permit
    let supabaseQuery = _supabase
        .from('businesses')
        .select('*');

    // Filter by zone if inspector
    if (window.CURRENT_PROFILE && window.CURRENT_PROFILE.zone && window.CURRENT_PROFILE.role === 'inspector') {
        const z = window.CURRENT_PROFILE.zone;
        // Search for matches in either ward_name OR subcounty_name (Case-Insensitive)
        supabaseQuery = supabaseQuery.or(`ward_name.ilike.${z},subcounty_name.ilike.${z}`);
        
        // If query is provided, apply name/permit filters
        if (query && query.trim().length > 0) {
            supabaseQuery = supabaseQuery.or(`business_name.ilike.%${query}%,permit_no.ilike.%${query}%`);
        }
    } else {
        // Global search for admins - requires a query to prevent 35k row fetch
        if (query && query.trim().length > 0) {
            supabaseQuery = supabaseQuery.or(`business_name.ilike.%${query}%,permit_no.ilike.%${query}%`);
        } else {
            searchResults.innerHTML = '<div class="result-item">Type a name or permit to search</div>';
            return;
        }
    }

    const { data, error } = await supabaseQuery.limit(15);

    if (error) {
        console.error('Search error:', error.message);
        return;
    }

    renderResults(data);
}

function renderResults(data) {
    searchResults.innerHTML = '';

    if (data.length === 0) {
        searchResults.innerHTML = '<div class="result-item">No results found</div>';
    } else {
        data.forEach(item => {
            const div = document.createElement('div');
            div.className = 'result-item';
            div.innerHTML = `
                <div class="name">${item.business_name}</div>
                <div class="sub">${item.permit_no} • ${item.subcounty_name || item.ward_name || ''}</div>
            `;
            div.onclick = () => selectClient(item);
            searchResults.appendChild(div);
        });
    }

    searchResults.classList.remove('hidden');
}

function selectClient(client) {
    selectedClient = client;

    // Log activity: Inspection Started
    ActivityTracker.log('inspection_start', `Started inspection for ${client.business_name}`, { business_id: client.id, ward: client.ward_name });

    clientSearch.classList.add('hidden');
    searchResults.classList.add('hidden');
    clientInfo.classList.remove('hidden');
    inspectionForm.classList.remove('hidden');
    document.getElementById('search-helper').classList.add('hidden');

    document.getElementById('info-business-name').textContent = client.business_name;
    document.getElementById('info-permit').textContent = client.permit_no || 'N/A';
    document.getElementById('info-location').textContent = `${client.building_name || ''} ${client.street_name || ''}`.trim() || 'N/A';
    document.getElementById('info-contact').textContent = client.contact_person || 'N/A';
}

document.getElementById('change-client').onclick = () => {
    selectedClient = null;
    clientSearch.value = '';
    clientSearch.classList.remove('hidden');
    clientInfo.classList.add('hidden');
    inspectionForm.classList.add('hidden');
    document.getElementById('search-helper').classList.remove('hidden');
};

// --- 2. TAG HANDLING (Personnel & Custom Chemicals) ---

function addTag(type, value) {
    if (!value.trim()) return;

    if (type === 'personnel') {
        if (!personnelList.includes(value.trim())) personnelList.push(value.trim());
        renderTags('personnel');
        personnelInput.value = '';
    } else {
        const v = value.trim();
        if (!chemicalsUsed.includes(v)) {
            chemicalsUsed.push(v);
            addDosageRow(v, true);
        }
        renderTags('chemical');
        chemicalInput.value = '';
    }
}

function renderTags(type) {
    const list = type === 'personnel' ? personnelList : chemicalsUsed;
    const container = type === 'personnel' ? personnelTags : chemicalTags;

    container.innerHTML = '';
    list.forEach((tag, index) => {
        const span = document.createElement('span');
        span.className = 'tag';
        span.innerHTML = `${tag} <span class="close" onclick="removeTag('${type}', ${index})">&times;</span>`;
        container.appendChild(span);
    });
}

window.removeTag = (type, index) => {
    if (type === 'personnel') {
        personnelList.splice(index, 1);
        renderTags('personnel');
    } else {
        removeDosageRowByChemical(chemicalsUsed[index]);
        chemicalsUsed.splice(index, 1);
        renderTags('chemical');
    }
};

personnelInput.onkeydown = (e) => { if (e.key === 'Enter') { e.preventDefault(); addTag('personnel', e.target.value); } };
chemicalInput.onkeydown = (e) => { if (e.key === 'Enter') { e.preventDefault(); addTag('chemical', e.target.value); } };

// --- Generic Tag Handling for "Other" Fields ---
function addCustomTag(type, value) {
    const v = value.trim();
    if (!v) return;
    if (!customTags[type].includes(v)) {
        customTags[type].push(v);
        renderCustomTags(type);
    }
}

function renderCustomTags(type) {
    const container = document.getElementById(`${type}-other-tags`);
    if (!container) return;
    container.innerHTML = '';
    customTags[type].forEach((tag, index) => {
        const span = document.createElement('span');
        span.className = 'tag';
        span.innerHTML = `${tag} <span class="close" onclick="removeCustomTag('${type}', ${index})">&times;</span>`;
        container.appendChild(span);
    });
}

window.removeCustomTag = (type, index) => {
    customTags[type].splice(index, 1);
    renderCustomTags(type);
};

['areas', 'pests', 'treatment', 'issues', 'recs', 'sighting'].forEach(type => {
    const input = document.getElementById(`${type}-other-input`);
    if (input) {
        input.onkeydown = (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                addCustomTag(type, e.target.value);
                e.target.value = '';
            }
        };
    }
});

// Prevent any Enter keypress inside a text input or textarea from submitting the form
inspectionForm.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
    }
});

// --- 3. "OTHER" TEXT REVEALS ---

function bindOther(checkboxId, containerId, type) {
    document.getElementById(checkboxId).onchange = (e) => {
        document.getElementById(containerId).classList.toggle('hidden', !e.target.checked);
        if (!e.target.checked) {
            customTags[type] = [];
            renderCustomTags(type);
            document.getElementById(`${type}-other-input`).value = '';
        }
    };
}

bindOther('areas-other-cb',     'areas-other-container',     'areas');
bindOther('pests-other-cb',     'pests-other-container',     'pests');
bindOther('issues-other-cb',    'issues-other-container',    'issues');
bindOther('recs-other-cb',      'recs-other-container',      'recs');
bindOther('treatment-other-cb', 'treatment-other-container', 'treatment');
bindOther('sighting-other',     'sighting-other-container',  'sighting');

// Bedbug count is specific
document.getElementById('sighting-bedbugs').onchange = (e) => {
    document.getElementById('bedbug-count').classList.toggle('hidden', !e.target.checked);
    if (!e.target.checked) document.getElementById('bedbug-count').value = '';
};

// --- 4. DOSAGE ROWS ---

// locked = auto-added from a checkbox or tag (chemical name pre-filled, read-only)
// !locked = manually added blank row
function addDosageRow(chemicalName = '', locked = false) {
    const container = document.getElementById('dosage-rows');
    const row = document.createElement('div');
    row.className = 'dosage-row';
    row.dataset.chemical = chemicalName;

    const chemInput = document.createElement('input');
    chemInput.type = 'text';
    chemInput.className = 'dosage-chemical' + (locked ? ' locked' : '');
    chemInput.value = chemicalName;
    chemInput.placeholder = 'Chemical name...';
    if (locked) {
        chemInput.readOnly = true;
    } else {
        chemInput.setAttribute('list', 'chemical-datalist');
    }

    const amountInput = document.createElement('input');
    amountInput.type = 'text';
    amountInput.className = 'dosage-amount';
    amountInput.placeholder = 'Amount (e.g. 50ml)';

    row.appendChild(chemInput);
    row.appendChild(amountInput);

    if (!locked) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'btn-dosage-remove';
        btn.textContent = '✕';
        btn.onclick = () => row.remove();
        row.appendChild(btn);
    }

    container.appendChild(row);
}

function removeDosageRowByChemical(name) {
    document.querySelectorAll('.dosage-row').forEach(row => {
        if (row.dataset.chemical === name) row.remove();
    });
}

// Manual "Add Dosage Entry" button
document.querySelector('.btn-add-dosage').addEventListener('click', () => addDosageRow('', false));

// Auto-add/remove dosage row when a preset chemical checkbox is toggled
document.querySelectorAll('input[name="chemicals_preset"]').forEach(cb => {
    cb.addEventListener('change', (e) => {
        if (e.target.checked) {
            addDosageRow(e.target.value, true);
        } else {
            removeDosageRowByChemical(e.target.value);
        }
    });
});

// --- 6. PHOTO HANDLING ---

function getIssueOptions() {
    return Array.from(document.querySelectorAll('input[name="issues"]:checked'))
        .map(cb => cb.value)
        .filter(v => v !== 'Other');
}

photoUpload.onchange = async (e) => {
    const files = Array.from(e.target.files);
    
    for (const file of files) {
        // 1. Compress image before adding to state
        const compressedFile = await ImageProcessor.compress(file);
        
        const entry = { file: compressedFile, caption: '', issue: '' };
        photoData.push(entry);

        // 2. Preview the compressed image
        const reader = new FileReader();
        reader.onload = (re) => {
            const card = document.createElement('div');
            card.className = 'photo-card fade-in';

            const img = document.createElement('img');
            img.src = re.target.result;
            img.className = 'img-preview';

            const removeBtn = document.createElement('button');
            removeBtn.type = 'button';
            removeBtn.className = 'photo-remove';
            removeBtn.textContent = '✕';
            removeBtn.onclick = () => {
                const idx = photoData.indexOf(entry);
                if (idx > -1) photoData.splice(idx, 1);
                card.remove();
            };

            const caption = document.createElement('input');
            caption.type = 'text';
            caption.className = 'photo-caption';
            caption.placeholder = 'Caption (e.g. Gap under kitchen door)';
            caption.oninput = () => { entry.caption = caption.value.trim(); };

            const issueSelect = document.createElement('select');
            issueSelect.className = 'photo-issue';
            issueSelect.innerHTML = '<option value="">— Link to issue —</option>';
            getIssueOptions().forEach(issue => {
                const opt = document.createElement('option');
                opt.value = issue;
                opt.textContent = issue.length > 38 ? issue.slice(0, 38) + '…' : issue;
                issueSelect.appendChild(opt);
            });
            issueSelect.onchange = () => { entry.issue = issueSelect.value; };

            card.appendChild(removeBtn);
            card.appendChild(img);
            card.appendChild(caption);
            card.appendChild(issueSelect);
            photoPreview.appendChild(card);
        };
        reader.readAsDataURL(file);
    }
};

// Refresh issue dropdowns when issues checkboxes change
document.querySelectorAll('input[name="issues"]').forEach(cb => {
    cb.addEventListener('change', () => {
        document.querySelectorAll('.photo-issue').forEach(sel => {
            const current = sel.value;
            sel.innerHTML = '<option value="">— Link to issue —</option>';
            getIssueOptions().forEach(issue => {
                const opt = document.createElement('option');
                opt.value = issue;
                opt.textContent = issue.length > 38 ? issue.slice(0, 38) + '…' : issue;
                if (issue === current) opt.selected = true;
                sel.appendChild(opt);
            });
        });
    });
});

// --- 7. HELPERS ---

function getChecked(name) {
    return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map(el => el.value);
}

// Like getChecked but swaps "Other" for the saved tags if provided
function getCheckedWithOther(name, type) {
    return getChecked(name).map(v => {
        if (v === 'Other') {
            return customTags[type].length > 0 ? customTags[type] : ['Other'];
        }
        return v;
    }).flat();
}

function getRadio(name) {
    const el = document.querySelector(`input[name="${name}"]:checked`);
    return el ? el.value : null;
}

// --- 8. SUBMISSION ---

inspectionForm.onsubmit = async (e) => {
    e.preventDefault();

    if (!selectedClient && !window.EDITING_REPORT_ID) {
        alert('Please select a client first.');
        return;
    }

    submitBtn.textContent = 'Uploading...';
    submitBtn.disabled = true;

    try {
        const photoUrls = [];
        const photoMeta = []; // { url, caption, issue }

        for (const entry of photoData) {
            const fileName = `${Date.now()}_${entry.file.name}`;
            const { error: uploadError } = await _supabase.storage
                .from('inspection-photos')
                .upload(`public/${fileName}`, entry.file);

            if (uploadError) {
                if (uploadError.message.includes('bucket not found')) {
                    throw new Error('Storage bucket "inspection-photos" not found. Please create it in your Supabase Dashboard.');
                }
                throw uploadError;
            }

            const { data: publicData } = _supabase.storage
                .from('inspection-photos')
                .getPublicUrl(`public/${fileName}`);

            const url = publicData.publicUrl;
            photoUrls.push(url);
            photoMeta.push({ url, caption: entry.caption, issue: entry.issue });
        }

        // Merge preset checkboxes + custom typed chemicals
        const allChemicals = [...new Set([...getChecked('chemicals_preset'), ...chemicalsUsed])];

        // Treatment methods
        const treatmentMethods = getCheckedWithOther('treatment_methods', 'treatment');

        // Chemical dosages — filter out empty rows
        const chemicalDosages = Array.from(document.querySelectorAll('.dosage-row'))
            .map(row => ({
                chemical: row.querySelector('.dosage-chemical').value.trim(),
                dosage:   row.querySelector('.dosage-amount').value.trim()
            }))
            .filter(d => d.chemical || d.dosage);

        const pestSightings = {
            rodents: document.getElementById('sighting-rodents').checked,
            bedbugs: document.getElementById('sighting-bedbugs').checked,
            bedbug_count: document.getElementById('sighting-bedbugs').checked
                ? document.getElementById('bedbug-count').value
                : null,
            other: document.getElementById('sighting-other').checked,
            other_description: document.getElementById('sighting-other').checked
                ? (customTags['sighting'].length > 0 ? customTags['sighting'].join(', ') : null)
                : null
        };

        // Store report data for PDF/email use
        lastReport = {
            client:                    selectedClient,
            inspector_name:            document.getElementById('inspector-name').value,
            inspection_date:           document.getElementById('inspection-date').value,
            personnel:                 personnelList,
            next_inspection_date:      document.getElementById('next-inspection-date').value || null,
            service_type:              getRadio('service_type'),
            areas_affected:            getCheckedWithOther('areas',            'areas'),
            pest_types:                getCheckedWithOther('pests',            'pests'),
            chemicals_used:            allChemicals,
            chemical_dosages:          chemicalDosages,
            treatment_methods:         treatmentMethods,
            issues_found:              getCheckedWithOther('issues',           'issues'),
            pest_sightings:            pestSightings,
            housekeeping_rating:       getRadio('housekeeping'),
            waste_management_rating:   getRadio('waste_management'),
            stacking_rating:           getRadio('stacking'),
            overall_sanitation_rating: getRadio('overall_sanitation'),
            recommendations:           getCheckedWithOther('recommendations',  'recs'),
            notes:                     document.getElementById('notes').value,
            photo_urls:                photoUrls,
            photo_meta:                photoMeta
        };

        const payload = {
                business_id: selectedClient.id,
                inspector_name: document.getElementById('inspector-name').value,
                inspection_date: document.getElementById('inspection-date').value,
                personnel: personnelList,
                next_inspection_date: document.getElementById('next-inspection-date').value || null,
                service_type: getRadio('service_type'),
                areas_affected: getCheckedWithOther('areas',           'areas'),
                pest_types:    getCheckedWithOther('pests',           'pests'),
                chemicals_used: allChemicals,
                treatment_methods: treatmentMethods,
                chemical_dosages: chemicalDosages,
                issues_found:  getCheckedWithOther('issues',          'issues'),
                pest_sightings: pestSightings,
                housekeeping_rating: getRadio('housekeeping'),
                waste_management_rating: getRadio('waste_management'),
                stacking_rating: getRadio('stacking'),
                overall_sanitation_rating: getRadio('overall_sanitation'),
                recommendations: getCheckedWithOther('recommendations', 'recs'),
                notes: document.getElementById('notes').value,
                photo_urls: photoUrls,
                photo_meta: photoMeta,
                fee_category: document.getElementById('calc-category').value || null,
                fee_premise: document.getElementById('calc-premise').selectedOptions[0]?.text || null,
                calculated_fee: calcTotal || null,
                status: 'completed',
                approval_status: 'pending', // Resets to pending for NCCG
                nccg_notes: null,
                nccg_officer_name: null,
                approved_at: null
        };

        let dbError;
        let reportData;

        if (window.EDITING_REPORT_ID) {
            const { data, error } = await _supabase.from('inspections').update(payload).eq('id', window.EDITING_REPORT_ID).select().single();
            reportData = data;
            dbError = error;
            window.EDITING_REPORT_ID = null;
        } else {
            const { data, error } = await _supabase.from('inspections').insert(payload).select().single();
            reportData = data;
            dbError = error;
        }

        if (dbError) throw dbError;
        lastReport = { ...lastReport, id: reportData.id };

        // Log activity: Inspection Completed
        ActivityTracker.log('inspection_complete', `Finalized inspection for ${selectedClient.business_name}`, { business_id: selectedClient.id, ward: selectedClient.ward_name });

        // --- NEW FAST-TRACK: GO DIRECTLY TO PAYMENT ---
        showPaymentDashboard(selectedClient.business_name, reportData.id);

    } catch (err) {
        console.error('Submission failed:', err.message);
        alert('Submission failed: ' + err.message);
    } finally {
        submitBtn.textContent = 'Finalize Inspection';
        submitBtn.disabled = false;
    }
};

// --- 9. PDF GENERATION ---

async function fetchImageAsDataUrl(url) {
    const resp = await fetch(url);
    const blob = await resp.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}

async function generatePDF(reportData = null) {
    const r = reportData || lastReport;
    if (!r) return;

    // Use a mock button object if called from history, otherwise use DOM element
    const btn = reportData ? { textContent: '' } : document.getElementById('btn-generate-pdf');
    if (!reportData) {
        btn.textContent = 'Generating...';
        btn.disabled = true;
    }

    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        const c = r.client || r.businesses; // Support both old 'client' and new join 'businesses'

        // Fetch logo for header
        let logoData = null;
        try {
            logoData = await fetchImageAsDataUrl('src/nairobi_logo.png');
        } catch (e) {
            console.warn('Could not load logo for PDF:', e);
        }

        const pageW = doc.internal.pageSize.getWidth();
        const pageH = doc.internal.pageSize.getHeight();
        const margin = 14;
        const usableW = pageW - margin * 2;
        let y = margin;

        const GREEN  = [16, 185, 129];
        const DARK   = [30, 41, 59];
        const GRAY   = [100, 116, 139];
        const LGRAY  = [226, 232, 240];

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
            const val1 = String(value || '—');
            doc.text(val1, margin + 32, y);
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

        // ── HEADER ──────────────────────────────────────────────────
        // Increased height from 40 to 55 to accommodate logo + text
        doc.setFillColor(...GREEN);
        doc.rect(0, 0, pageW, 55, 'F');
        
        if (logoData) {
            // Centered logo higher up
            doc.addImage(logoData, 'PNG', pageW / 2 - 14, 8, 28, 28);
        }

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        // Pushed text down (was 32 and 37)
        doc.text('NAIROBI CITY GOVERNMENT', pageW / 2, 42, { align: 'center' });
        doc.setFontSize(10);
        doc.text('INTEGRATED PEST CONTROL MANAGEMENT AUDIT REPORT', pageW / 2, 48, { align: 'center' });
        
        doc.setFontSize(7);
        doc.setFont('helvetica', 'normal');
        doc.text('Generated: ' + new Date().toLocaleString(), margin, 60);
        // Start the first section lower (was 52)
        y = 68;

        // ── CLIENT INFO ──────────────────────────────────────────────
        sectionBar('CLIENT INFORMATION');
        row('Business:', c.business_name, pageW / 2, 'Permit No:', c.permit_no);
        row('Location:', (`${c.building_name || ''} ${c.street_name || ''}`).trim() || '—', pageW / 2, 'Contact:', c.contact_person);
        if (c.contact_email) row('Email:', c.contact_email);
        y += 2;

        // ── INSPECTION DETAILS ────────────────────────────────────────
        sectionBar('INSPECTION DETAILS');
        const dateStr = r.inspection_date ? new Date(r.inspection_date).toLocaleString() : '—';
        row('Date & Time:', dateStr, pageW / 2, 'PHO:', r.inspector_name);
        row('Personnel:', (r.personnel || []).join(', ') || '—', pageW / 2, 'Service Type:', r.service_type || '—');
        const nextDate = r.next_inspection_date ? new Date(r.next_inspection_date).toLocaleDateString() : '—';
        row('Next Inspection:', nextDate);
        y += 2;

        // ── AREAS & PEST TYPES ────────────────────────────────────────
        sectionBar('AREAS & PEST TYPES');
        row('Areas:', (r.areas_affected || []).join(', ') || '—');
        row('Pest Types:', (r.pest_types || []).join(', ') || '—');
        y += 2;

        // ── CHEMICALS & DOSAGE ────────────────────────────────────────
        sectionBar('CHEMICALS & DOSAGE');
        if (r.chemical_dosages && r.chemical_dosages.length > 0) {
            // Table header
            checkPage(8);
            doc.setFillColor(...LGRAY);
            doc.rect(margin, y - 1, usableW, 6.5, 'F');
            doc.setFontSize(8);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(...DARK);
            doc.text('Chemical', margin + 2, y + 4);
            doc.text('Dosage / Amount', margin + usableW * 0.62, y + 4);
            y += 8;
            r.chemical_dosages.forEach((d, i) => {
                checkPage(6);
                if (i % 2 === 0) {
                    doc.setFillColor(248, 250, 252);
                    doc.rect(margin, y - 3, usableW, 6, 'F');
                }
                doc.setFont('helvetica', 'normal');
                doc.setTextColor(...DARK);
                doc.setFontSize(8);
                doc.text(d.chemical || '—', margin + 2, y + 1);
                doc.text(d.dosage || '—', margin + usableW * 0.62, y + 1);
                y += 6;
            });
            y += 2;
        } else {
            bullets(r.chemicals_used);
        }
        row('Treatment Methods:', (r.treatment_methods || []).join(', ') || '—');
        y += 2;

        // ── ISSUES FOUND ──────────────────────────────────────────────
        sectionBar('ISSUES FOUND');
        bullets(r.issues_found);
        y += 2;

        // ── PEST SIGHTINGS ────────────────────────────────────────────
        sectionBar('PEST SIGHTINGS');
        const ps = r.pest_sightings || {};
        row('Rodent Activity:', ps.rodents ? 'Yes' : 'No', pageW / 2, 'Bedbugs:', ps.bedbugs ? `Yes — Count: ${ps.bedbug_count || '?'}` : 'No');
        if (ps.other && ps.other_description) row('Other:', ps.other_description);
        y += 2;

        // ── SANITATION ────────────────────────────────────────────────
        sectionBar('SANITATION ASSESSMENT');
        row('Housekeeping:', r.housekeeping_rating || '—', pageW / 2, 'Waste Management:', r.waste_management_rating || '—');
        row('Stacking:', r.stacking_rating || '—', pageW / 2, 'Overall Sanitation:', r.overall_sanitation_rating || '—');
        y += 2;

        // ── RECOMMENDATIONS ───────────────────────────────────────────
        sectionBar('RECOMMENDATIONS');
        bullets(r.recommendations);
        y += 2;

        // ── NOTES ─────────────────────────────────────────────────────
        if (r.notes && r.notes.trim()) {
            sectionBar('ADDITIONAL NOTES');
            const lines = doc.splitTextToSize(r.notes, usableW - 4);
            lines.forEach(line => {
                checkPage(6);
                doc.setFontSize(8);
                doc.setFont('helvetica', 'normal');
                doc.setTextColor(...DARK);
                doc.text(line, margin, y);
                y += 5.5;
            });
            y += 2;
        }

        // ── PHOTOS ────────────────────────────────────────────────────
        const photos = r.photo_meta && r.photo_meta.length > 0 ? r.photo_meta : (r.photo_urls || []).map(url => ({ url, caption: '', issue: '' }));
        if (photos.length > 0) {
            // Group by issue (untagged go under "General")
            const groups = {};
            photos.forEach(p => {
                const key = p.issue || 'General';
                if (!groups[key]) groups[key] = [];
                groups[key].push(p);
            });

            const imgW = (usableW - 5) / 2;
            const imgH = imgW * 0.72;

            for (const [groupName, groupPhotos] of Object.entries(groups)) {
                sectionBar('PHOTOS' + (groupName !== 'General' ? ': ' + groupName.toUpperCase() : ''));
                let col = 0;

                for (const p of groupPhotos) {
                    try {
                        const dataUrl = await fetchImageAsDataUrl(p.url);
                        const captionH = p.caption ? 7 : 0;
                        checkPage(imgH + captionH + 6);
                        const x = margin + col * (imgW + 5);

                        doc.addImage(dataUrl, 'JPEG', x, y, imgW, imgH);

                        if (p.caption) {
                            doc.setFontSize(7);
                            doc.setFont('helvetica', 'italic');
                            doc.setTextColor(...GRAY);
                            const captionLines = doc.splitTextToSize(p.caption, imgW);
                            doc.text(captionLines, x, y + imgH + 4.5);
                        }

                        col++;
                        if (col >= 2) {
                            col = 0;
                            y += imgH + captionH + 6;
                        }
                    } catch (_) { /* skip unloadable photo */ }
                }
                if (col > 0) y += imgH + 8;
            }
        }

        // ── PAGE FOOTERS ──────────────────────────────────────────────
        const totalPages = doc.internal.getNumberOfPages();
        for (let p = 1; p <= totalPages; p++) {
            doc.setPage(p);
            doc.setFontSize(7);
            doc.setTextColor(...GRAY);
            doc.text(`Page ${p} of ${totalPages}`, pageW - margin, pageH - 6, { align: 'right' });
            doc.text('Integrated Pest Control Management Audit System', margin, pageH - 6);
        }

        const filename = `Inspection_${c.business_name.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.pdf`;
        doc.save(filename);
        
        // Remove the auto-trigger from here, as we now trigger it directly on submit
        // showPaymentDashboard(c.business_name, r.id);

    } catch (err) {
        console.error('PDF error:', err);
        alert('Failed to generate PDF: ' + err.message);
    } finally {
        btn.textContent = 'Generate PDF Report';
        btn.disabled = false;
    }
}

// --- 10. EMAIL REPORT ---

// Initialise EmailJS once
if (window.emailjs && window.EMAILJS_CONFIG.publicKey !== 'YOUR_PUBLIC_KEY') {
    emailjs.init(window.EMAILJS_CONFIG.publicKey);
}

async function sendEmail() {
    if (!lastReport) return;

    const r = lastReport;
    const toEmail = r.client.contact_email;

    if (!toEmail) {
        alert('No contact email found for this client in the database.');
        return;
    }

    if (window.EMAILJS_CONFIG.publicKey === 'YOUR_PUBLIC_KEY') {
        alert('Please set up your EmailJS keys in config.js first.');
        return;
    }

    const btn = document.getElementById('btn-email-report');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    try {
        await emailjs.send(
            window.EMAILJS_CONFIG.serviceId,
            window.EMAILJS_CONFIG.templateId,
            {
                to_email:        toEmail,
                to_name:         r.client.contact_person || r.client.business_name,
                business_name:   r.client.business_name,
                inspection_date: new Date(r.inspection_date).toLocaleString(),
                inspector_name:  r.inspector_name,
                service_type:    r.service_type || '—',
                next_inspection_date: r.next_inspection_date ? new Date(r.next_inspection_date).toLocaleDateString() : '—',
                areas:           (r.areas_affected  || []).join(', ') || '—',
                pest_types:      (r.pest_types       || []).join(', ') || '—',
                chemicals:       (r.chemicals_used   || []).join(', ') || '—',
                treatment:       (r.treatment_methods|| []).join(', ') || '—',
                issues:          (r.issues_found     || []).join('\n• ') || 'None',
                recommendations: (r.recommendations  || []).join('\n• ') || 'None',
                sanitation:      `Housekeeping: ${r.housekeeping_rating || '—'} | Waste Mgmt: ${r.waste_management_rating || '—'} | Stacking: ${r.stacking_rating || '—'} | Overall: ${r.overall_sanitation_rating || '—'}`,
                notes:           r.notes || '—'
            }
        );
        alert('Report emailed successfully to ' + toEmail);
    } catch (err) {
        console.error('Email error:', err);
        alert('Failed to send email: ' + (err.text || err.message));
    } finally {
        btn.textContent = 'Email Report to Client';
        btn.disabled = false;
    }
}

document.getElementById('btn-generate-pdf').addEventListener('click', () => generatePDF());
document.getElementById('btn-email-report').addEventListener('click', sendEmail);

// --- 11. TAB SWITCHING ---
const navNew = document.getElementById('nav-new');
const navHistory = document.getElementById('nav-history');
const historySection = document.getElementById('history-section');
const mainForm = document.getElementById('inspection-form');
const step1 = document.getElementById('step-1');

navNew.onclick = () => {
    navNew.classList.add('active');
    navHistory.classList.remove('active');
    historySection.classList.add('hidden');
    // Reveal either step-1 or the form depending on state
    if (selectedClient) mainForm.classList.remove('hidden');
    else step1.classList.remove('hidden');
};

navHistory.onclick = () => {
    navNew.classList.remove('active');
    navHistory.classList.add('active');
    historySection.classList.remove('hidden');
    step1.classList.add('hidden');
    mainForm.classList.add('hidden');
    fetchMyHistory();
};

// --- 12. MY HISTORY (NEW) ---
async function fetchMyHistory() {
    const list = document.getElementById('history-list');
    list.innerHTML = '<div style="text-align: center; padding: 2rem; color: #94a3b8;">Loading history...</div>';

    try {
        const { data, error } = await _supabase
            .from('inspections')
            .select(`
                *,
                businesses (
                    business_name,
                    ward_name,
                    permit_no
                )
            `)
            .eq('inspector_name', window.CURRENT_PROFILE.full_name)
            .order('inspection_date', { ascending: false });

        if (error) throw error;

        if (!data || data.length === 0) {
            list.innerHTML = '<div style="text-align: center; padding: 2rem; color: #94a3b8;">No reports found yet.</div>';
            return;
        }

        renderHistory(data);
    } catch (err) {
        console.error('History error:', err);
        list.innerHTML = `<div style="text-align: center; padding: 2rem; color: #ef4444;">Error: ${err.message}</div>`;
    }
}

function renderHistory(reports) {
    const list = document.getElementById('history-list');
    list.innerHTML = reports.map(r => `
        <div class="history-item">
            <div class="history-info">
                <div class="history-name">${r.businesses?.business_name || 'Unknown Business'}</div>
                <div class="history-date">${new Date(r.inspection_date).toLocaleDateString()} at ${new Date(r.inspection_date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                <div class="history-zone">${r.businesses?.ward_name || r.zone || 'No Zone'}</div>
                <div class="history-payment">
                    ${r.approval_status === 'declined' ? `<span style="color:#ef4444;font-weight:700;">❌ Declined by NCCG</span> (Reason: ${r.nccg_notes || '—'})` : 
                    (r.approval_status === 'approved' ? '✅ Approved' : '⏳ Pending Review')}
                </div>
            </div>
            <div class="history-actions" style="display:flex;flex-direction:column;gap:5px;">
                <button class="btn-download-sm" onclick='downloadPastReport(${JSON.stringify(r).replace(/'/g, "&apos;")})'>PDF</button>
                ${r.approval_status === 'declined' ? `<button class="btn-download-sm" style="background:#f59e0b;" onclick='editPastReport(${JSON.stringify(r).replace(/'/g, "&apos;")})'>Edit & Resubmit</button>` : ''}
            </div>
        </div>
    `).join('');
}

// Global helper for downloading from history
window.downloadPastReport = (reportData) => {
    // Format it slightly to match what generatePDF expects (lastReport style)
    const formattedReport = {
        ...reportData,
        client: reportData.businesses // Map businesses back to client
    };
    generatePDF(formattedReport);
};

// Editing a declined report
window.editPastReport = (r) => {
    window.EDITING_REPORT_ID = r.id;
    selectedClient = r.businesses || { id: r.business_id };
    
    // Switch UI
    document.getElementById('nav-history').classList.remove('active');
    document.getElementById('nav-new').classList.add('active');
    document.getElementById('history-section').classList.add('hidden');
    document.getElementById('step-1').classList.add('hidden');
    
    // Set up form client display
    document.getElementById('display-business').textContent = r.businesses?.business_name || 'Unknown Business';
    document.getElementById('display-address').textContent = r.businesses?.ward_name || '—';
    document.getElementById('client-info').classList.remove('hidden');
    document.getElementById('inspection-form').classList.remove('hidden');

    // Fill simple fields
    document.getElementById('inspector-name').value = window.CURRENT_PROFILE.full_name;
    // Format date string properly for input type="datetime-local" roughly
    if(r.inspection_date) {
        document.getElementById('inspection-date').value = r.inspection_date.slice(0,16);
    }
    if(r.next_inspection_date) {
        document.getElementById('next-inspection-date').value = r.next_inspection_date.slice(0,10);
    }
    
    // personnel tags
    personnelList = r.personnel || [];
    renderTags('personnelList', 'personnel-tags');
    
    // Select radios
    if(r.service_type) {
        const rad = document.querySelector(`input[name="service_type"][value="${r.service_type}"]`);
        if(rad) rad.checked = true;
    }
    
    // Basic text notes
    document.getElementById('notes').value = r.notes || '';
    
    alert("Report data loaded into the form. You can now edit and resubmit.");
};

document.getElementById('btn-refresh-history').onclick = fetchMyHistory;

// --- 13. PAYMENT DASHBOARD LOGIC ---

function showPaymentDashboard(businessName, reportId) {
    console.log("Opening Payment Dashboard for:", businessName);

    // Hide the success overlay first to prevent overlap
    document.getElementById('success-overlay').classList.add('hidden');

    document.getElementById('payment-client-name').textContent = businessName;
    // Pre-fill calculated fee from Step 10 so PHO doesn't have to re-enter
    document.getElementById('payment-amount').value = calcTotal > 0 ? calcTotal : '';
    document.getElementById('payment-ref').value = '';
    document.getElementById('payment-overlay').classList.remove('hidden');

    // Show fee summary banner in payment overlay if we have a calc
    const existingBanner = document.getElementById('payment-fee-banner');
    if (existingBanner) existingBanner.remove();
    if (calcTotal > 0) {
        const premText = document.getElementById('calc-premise').selectedOptions[0]?.text || '';
        const banner = document.createElement('div');
        banner.id = 'payment-fee-banner';
        banner.style.cssText = 'background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:0.75rem 1rem;margin-bottom:1rem;font-size:0.85rem;color:#166534;';
        banner.innerHTML = `<strong>Calculated Fee: KES ${calcTotal.toLocaleString()}</strong><br>
            <span style="font-size:0.78rem;color:#4b5563;">${premText}</span>`;
        const payBody = document.querySelector('.payment-body');
        if (payBody) payBody.insertBefore(banner, payBody.firstChild);
    }

    // Wire up buttons with the current report context
    document.getElementById('btn-mark-paid').onclick = () => updatePaymentStatus(reportId, true);
    document.getElementById('btn-mark-unpaid').onclick = () => updatePaymentStatus(reportId, false);
    document.getElementById('btn-close-payment').onclick = () => {
        document.getElementById('payment-overlay').classList.add('hidden');
        resetApp(); // Return to start
    };
}

async function updatePaymentStatus(reportId, isPaid) {
    const amount = document.getElementById('payment-amount').value;
    const ref = document.getElementById('payment-ref').value;
    
    // Safety Fallback: Use lastReport or CURRENT_REPORT_ID if reportId is missing
    const finalReportId = reportId || (lastReport ? lastReport.id : null);
    const finalBusinessId = selectedClient ? selectedClient.id : (lastReport ? lastReport.business_id : null);

    console.log("Saving Payment - ReportID:", finalReportId, "BusinessID:", finalBusinessId, "Status:", isPaid);

    if (!finalReportId) {
        alert("System Error: Could not identify the inspection report. Please refresh and try again.");
        return;
    }

    // Validation for 'Paid' status
    if (isPaid && (!amount || !ref)) {
        alert('Please enter both Amount and Reference for successful payments.');
        return;
    }

    const btn = isPaid ? document.getElementById('btn-mark-paid') : document.getElementById('btn-mark-unpaid');
    const oldText = btn.textContent;
    btn.textContent = 'Saving...';
    btn.disabled = true;

    try {
        const updateData = {
            is_paid: isPaid,
            amount_paid: amount ? parseFloat(amount) : 0,
            payment_ref: ref || '',
            payment_date: new Date().toISOString()
        };

        // 1. Update the inspection report (use service role to bypass RLS)
        const { data: updateResult, error: inspError } = await _serviceSupabase
            .from('inspections')
            .update(updateData)
            .eq('id', finalReportId)
            .select();

        if (inspError) throw inspError;
        if (!updateResult || updateResult.length === 0) throw new Error('No rows updated — report ID not found.');

        console.log("Database response (Inspection):", updateResult);

        // 2. Sync with the master business record (if we have the ID)
        if (finalBusinessId) {
            const { error: busError } = await _serviceSupabase
                .from('businesses')
                .update({ paid: isPaid })
                .eq('id', finalBusinessId);

            if (busError) console.warn("Business sync warning:", busError.message);
        }

        // --- SUCCESS FEEDBACK ---
        alert(isPaid ? 'Payment recorded successfully!' : 'Record updated as Unpaid (Overdue).');
        
        // Final UI cleanup then reload
        document.getElementById('payment-overlay').classList.add('hidden');
        
        // Use a small timeout to ensure Supabase finish everything
        setTimeout(() => {
            location.reload();
        }, 300);

    } catch (err) {
        console.error('CRITICAL PAYMENT ERROR:', err);
        alert('Failed to record payment: ' + (err.message || 'Connection error.'));
    } finally {
        btn.textContent = oldText;
        btn.disabled = false;
    }
}

// ── STEP 10: IPM AUDIT FEE CALCULATOR ────────────────────────────────────────
let calcTotal = 0; // pre-filled into payment overlay on submit

function initFeeCalculator() {
    const feeData = (typeof FEE_SCHEDULE !== 'undefined') ? FEE_SCHEDULE : null;
    if (!feeData) return;

    const catSelect     = document.getElementById('calc-category');
    const premiseSelect = document.getElementById('calc-premise');

    catSelect.innerHTML = '<option value="">— Select Category —</option>';
    Object.keys(feeData).forEach(cat => {
        const opt = document.createElement('option');
        opt.value = cat;
        opt.textContent = cat;
        catSelect.appendChild(opt);
    });

    catSelect.onchange = () => {
        const cat = catSelect.value;
        premiseSelect.innerHTML = '<option value="">— Select Premise —</option>';
        premiseSelect.disabled = !cat;
        if (cat && feeData[cat]) {
            feeData[cat].forEach((entry, i) => {
                const opt = document.createElement('option');
                opt.value = i;
                opt.textContent = entry.premise;
                premiseSelect.appendChild(opt);
            });
        }
        recalcFeeDisplay();
    };

    premiseSelect.onchange = () => recalcFeeDisplay();
}

function recalcFeeDisplay() {
    const feeData   = (typeof FEE_SCHEDULE !== 'undefined') ? FEE_SCHEDULE : null;
    if (!feeData) return;

    const cat       = document.getElementById('calc-category').value;
    const idx       = document.getElementById('calc-premise').value;
    const breakdown = document.getElementById('fee-calc-breakdown');
    const noMatch   = document.getElementById('fee-no-match');
    const totalEl   = document.getElementById('fee-calc-total');
    const nccgEl    = document.getElementById('fee-nccg-amount');
    const vendorEl  = document.getElementById('fee-vendor-amount');

    if (!cat || idx === '') {
        breakdown.classList.add('hidden');
        noMatch.classList.remove('hidden');
        calcTotal = 0;
        return;
    }

    const entry = feeData[cat][parseInt(idx)];
    if (!entry || !entry.fees.ipmAudit) {
        noMatch.classList.remove('hidden');
        breakdown.classList.add('hidden');
        calcTotal = 0;
        return;
    }

    calcTotal = entry.fees.ipmAudit;
    const nccg   = entry.fees.ipmNccg   || Math.round(calcTotal * 0.25);
    const vendor = entry.fees.ipmVendor || Math.round(calcTotal * 0.75);

    nccgEl.textContent   = `KES ${nccg.toLocaleString()}`;
    vendorEl.textContent = `KES ${vendor.toLocaleString()}`;
    totalEl.textContent  = `KES ${calcTotal.toLocaleString()}`;

    noMatch.classList.add('hidden');
    breakdown.classList.remove('hidden');
}

initFeeCalculator();

// --- RESET APP STATE ---
function resetApp() {
    selectedClient = null;
    personnelList = [];
    chemicalsUsed = [];
    photoData = [];
    lastReport = null;
    Object.keys(customTags).forEach(k => customTags[k] = []);

    const form = document.getElementById('inspection-form');
    if (form) { form.reset(); form.classList.add('hidden'); }

    document.getElementById('client-info').classList.add('hidden');
    document.getElementById('step-1').classList.remove('hidden');
    document.getElementById('client-search').value = '';
    document.getElementById('search-helper').classList.remove('hidden');
    document.getElementById('dosage-rows').innerHTML = '';
    document.getElementById('photo-preview').innerHTML = '';
    document.getElementById('personnel-tags').innerHTML = '';
    document.getElementById('chemical-tags').innerHTML = '';

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
