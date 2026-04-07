const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    "https://xrcraomnvnzpjktvksre.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhyY3Jhb21udm56cGprdHZrc3JlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0NDQzNzIsImV4cCI6MjA5MTAyMDM3Mn0.9RxBVyLXEuimDRkKnIOSF1W21gPpI_e00gb3N_okanc"
);

async function checkSeeding() {
    console.log("Checking profiles...");
    const { data: pData, error: pError } = await supabase.from('user_profiles').select('*');
    if (pError) console.error("Profile Error:", pError.message);
    else console.log(JSON.stringify(pData, null, 2));
}

checkSeeding();
