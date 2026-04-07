const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function checkData() {
    try {
        console.log("Checking first 5 businesses...");
        const { data, error } = await supabase.from('businesses').select('*').limit(1);
        if (error) {
            console.error("Error:", error.message);
            return;
        }
        if (data && data.length > 0) {
            console.log("Sample Record Columns:", Object.keys(data[0]));
            console.log("Sample Ward Name:", data[0].ward_name);
            console.log("Sample Subcounty Name:", data[0].subcounty_name);
        } else {
            console.log("No data found in businesses table.");
        }
    } catch (e) {
        console.error("Fatal:", e.message);
    }
}

checkData();
