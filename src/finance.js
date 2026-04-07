// Initialize Supabase for Finance Manager
const _financeSupabase = supabase.createClient(window.SUPABASE_CONFIG.url, window.SUPABASE_CONFIG.anonKey);

// State
let currentTab = 'overview';
let allPayments = [];

// DOM Elements
const tabs = document.querySelectorAll('.nav-item');
const tabContents = document.querySelectorAll('.tab-content');
const tabTitle = document.getElementById('tab-title');

// Auth Guard
(async function initFinance() {
    const authResult = await AuthProvider.checkAuth(['finance_manager', 'admin', 'super_admin']);
    if (!authResult) return;

    // Initial Data Load
    fetchPayments();
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
    tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === tabId));
    tabContents.forEach(c => c.classList.toggle('active', c.id === tabId));
    
    const titles = {
        overview: 'Revenue Overview',
        payments: 'All Collections',
        overdue: 'Overdue Accounts'
    };
    tabTitle.textContent = titles[tabId];
}

// -- DATA FETCHING --
async function fetchPayments() {
    try {
        const { data, error } = await _financeSupabase
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
        
        updateStats();
        renderPayments();
    } catch (err) {
        console.error('Error fetching payments:', err);
    }
}

function updateStats() {
    const totalRevenue = allPayments.reduce((acc, r) => acc + (parseFloat(r.amount_paid) || 0), 0);
    const overdueCount = allPayments.filter(r => r.is_paid === false && r.status === 'completed').length;
    const recentCount = allPayments.filter(p => p.is_paid && (new Date() - new Date(p.payment_date)) < (7 * 24 * 60 * 60 * 1000)).length;

    document.getElementById('stat-total-revenue').textContent = `KES ${totalRevenue.toLocaleString()}`;
    document.getElementById('stat-total-outstanding').textContent = overdueCount;
    document.getElementById('stat-recent-count').textContent = recentCount;
}

function renderPayments() {
    const collectionsTbody = document.querySelector('#collections-table tbody');
    const recentTbody = document.querySelector('#recent-collections-table tbody');
    const overdueTbody = document.querySelector('#overdue-table tbody');
    
    const collections = allPayments.filter(p => p.is_paid === true);
    const overdue = allPayments.filter(p => p.is_paid === false && p.status === 'completed');

    const collectionRows = collections.map(p => `
        <tr>
            <td>${p.payment_date ? new Date(p.payment_date).toLocaleDateString() : '—'}</td>
            <td>${p.businesses?.business_name || '—'}</td>
            <td><strong>KES ${p.amount_paid?.toLocaleString() || '0'}</strong></td>
            <td><code>${p.payment_ref || '—'}</code></td>
        </tr>
    `).join('') || '<tr><td colspan="4" style="text-align:center;">No collections recorded.</td></tr>';

    if (collectionsTbody) collectionsTbody.innerHTML = collectionRows;
    if (recentTbody) recentTbody.innerHTML = collections.slice(0, 10).map(p => `
        <tr>
            <td>${p.payment_date ? new Date(p.payment_date).toLocaleDateString() : '—'}</td>
            <td>${p.businesses?.business_name || '—'}</td>
            <td>KES ${p.amount_paid?.toLocaleString() || '0'}</td>
            <td>${p.payment_ref || '—'}</td>
        </tr>
    `).join('') || '<tr><td colspan="4" style="text-align:center;">No recent activity.</td></tr>';

    if (overdueTbody) overdueTbody.innerHTML = overdue.map(p => `
        <tr>
            <td>${p.businesses?.business_name || '—'}</td>
            <td>${new Date(p.inspection_date).toLocaleDateString()}</td>
            <td><span style="color:#ef4444; font-weight:700;">PENDING</span></td>
            <td><button class="btn-text" onclick="viewBusinessDetails('${p.businesses?.id}')">View Business</button></td>
        </tr>
    `).join('') || '<tr><td colspan="4" style="text-align:center;">No overdue payments!</td></tr>';
}

window.viewBusinessDetails = (id) => {
    alert("Function for detailed business billing history under development.");
};
