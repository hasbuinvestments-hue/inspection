const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    "https://xrcraomnvnzpjktvksre.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhyY3Jhb21udm56cGprdHZrc3JlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0NDQzNzIsImV4cCI6MjA5MTAyMDM3Mn0.9RxBVyLXEuimDRkKnIOSF1W21gPpI_e00gb3N_okanc"
);

async function listTables() {
    const { data, error } = await supabase
        .from('inspections')
        .select('*')
        .limit(1);

    if (error) {
        console.error("Error fetching inspections:", error.message);
    } else {
        console.log("Inspections table exists.");
    }

    const { data: bData, error: bError } = await supabase
        .from('businesses')
        .select('*')
        .limit(1);

    if (bError) {
        console.error("Error fetching businesses:", bError.message);
    } else {
        console.log("Businesses table exists.");
    }
}

listTables();
