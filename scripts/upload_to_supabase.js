const XLSX = require('xlsx');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env file.');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const filePath = './data/SIMPLIFIED DATA.xlsx';
const BATCH_SIZE = 100;

function excelDataToJSDate(excelDate) {
    if (!excelDate || isNaN(excelDate)) return null;
    try {
        return new Date((excelDate - 25569) * 86400 * 1000).toISOString().split('T')[0];
    } catch (e) {
        return null;
    }
}

async function uploadMissingSheet() {
    try {
        console.log('--- MISSING SHEET UPLOAD STARTED ---');
        console.log('📂 Reading Excel file...');
        const workbook = XLSX.readFile(filePath);
        const sheetName = 'Westlands'; // Target only the missing sheet
        
        if (!workbook.SheetNames.includes(sheetName)) {
            console.error(`Sheet "${sheetName}" not found!`);
            return;
        }

        const sheet = workbook.Sheets[sheetName];
        const rawData = XLSX.utils.sheet_to_json(sheet);

        console.log(`✅ Found ${rawData.length.toLocaleString()} missing records in sheet: "${sheetName}"`);
        console.log('🔄 Transforming and uploading data...');

        let totalUploaded = 0;
        const totalRows = rawData.length;

        for (let i = 0; i < totalRows; i += BATCH_SIZE) {
            const batch = rawData.slice(i, i + BATCH_SIZE).map(row => ({
                application_no: row['Application No'] || null,
                permit_no: row['Permit No.'] || null,
                customer_name: row['Customer Name'] || null,
                business_name: row['Business Name'] || null,
                subcounty_name: row['Subcounty Name'] || null,
                ward_name: row['Ward Name'] || null,
                building_name: row['Building Name'] || null,
                plot_no: row['Plot No.'] || null,
                street_name: row['Street Name'] || null,
                stall_no: row['Stall No.'] || null,
                payment_plan: row['Payment Plan'] || null,
                application_stage: row['Application Stage'] || null,
                issued_date: excelDataToJSDate(row['Issued Date']),
                business_description: row['Business Description'] || null,
                business_subsidiary_name: row['Business Subsidiary Name'] || null,
                owner_mobile_number: String(row['Owner Mobile Number'] || ''),
                owner_address: row['Owner Address'] || null,
                contact_person: row['Contact Person'] || null,
                contact_person_mobile_no: String(row['Contact Person Mobile No'] || ''),
                contact_person_email: row['Contact Person Email'] || null,
                permit_start_date: excelDataToJSDate(row['Permit Start Date']),
                permit_expiry_date: excelDataToJSDate(row['Permit Expiry Date']),
                permit_duration: row['Permit Duration.'] || null,
                permit_status: row['Permit Status'] || null,
                ubp_permit_fee: parseFloat(row['UBP Permit Fee']) || 0,
                invoice_no: row['Invoice No'] || null,
                paid: !!row['Paid'],
                payment_ref: row['Payment Ref'] || null
            }));

            const { error } = await supabase.from('businesses').insert(batch);
            
            if (error) {
                console.error(`\n❌ Error in batch ${Math.floor(i / BATCH_SIZE) + 1}:`, error.message);
                break;
            }
            
            totalUploaded += batch.length;
            const progress = ((totalUploaded / totalRows) * 100).toFixed(1);
            process.stdout.write(`\r🚀 Progress: ${progress}% (${totalUploaded.toLocaleString()} / ${totalRows.toLocaleString()} rows uploaded)`);
        }

        console.log('\n\n--- UPLOAD COMPLETE ---');
        console.log(`✅ Records Uploaded: ${totalUploaded.toLocaleString()}`);

        const { count, error: countError } = await supabase.from('businesses').select('*', { count: 'exact', head: true });
        if (!countError) {
            console.log(`📊 FINAL TOTAL IN DATABASE: ${count.toLocaleString()}`);
            console.log(`💡 Expected: 53,301 (17,767 from Primary + 35,534 from Westlands)`);
        }

    } catch (error) {
        console.error('\n❌ Fatal Migration Error:', error.message);
    }
}

uploadMissingSheet();
