const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    "https://xrcraomnvnzpjktvksre.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhyY3Jhb21udm56cGprdHZrc3JlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0NDQzNzIsImV4cCI6MjA5MTAyMDM3Mn0.9RxBVyLXEuimDRkKnIOSF1W21gPpI_e00gb3N_okanc"
);

async function checkHealth() {
    console.log("Checking database extensions...");
    // Try to check for pgcrypto
    const { data: ext, error: extErr } = await supabase.rpc('get_extensions'); // This might not exist
    
    // Fallback: Just try a simple select
    const { data, error } = await supabase.from('businesses').select('count', { count: 'exact', head: true });
    
    if (error) {
        console.error("Database connection error:", error.message);
    } else {
        console.log("Database connection OK. Count:", data);
    }
}

checkHealth();
