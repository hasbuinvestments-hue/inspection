const XLSX = require('xlsx');
const path = require('path');

const filePath = path.join(__dirname, '../data/SIMPLIFIED DATA.xlsx');

try {
    const workbook = XLSX.readFile(filePath);
    const primary = XLSX.utils.sheet_to_json(workbook.Sheets['PRIMARY']);
    const sheet2 = XLSX.utils.sheet_to_json(workbook.Sheets['Sheet2']);
    
    console.log('PRIMARY Rows:', primary.length);
    console.log('Sheet2 Rows:', sheet2.length);
    
    if (primary.length > 0 && sheet2.length > 0) {
        console.log('PRIMARY Sample 1:', JSON.stringify(primary[0]));
        console.log('Sheet2 Sample 1:', JSON.stringify(sheet2[0]));
    }

} catch (error) {
    console.error('Error:', error.message);
}
