const XLSX = require('xlsx');
const path = require('path');

const filePath = path.join(__dirname, '../data/SIMPLIFIED DATA.xlsx');

try {
    const workbook = XLSX.readFile(filePath);
    console.log('--- EXCEL SHEET ANALYSIS ---');
    console.log(`Sheet Names: ${workbook.SheetNames.join(', ')}`);
    console.log(`Total Sheets: ${workbook.SheetNames.length}`);
    
    let totalAllSheets = 0;
    workbook.SheetNames.forEach(sheetName => {
        const sheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(sheet);
        console.log(`Sheet: ${sheetName} | Rows: ${data.length.toLocaleString()}`);
        totalAllSheets += data.length;
    });
    console.log(`---`);
    console.log(`Total Records Across All Sheets: ${totalAllSheets.toLocaleString()}`);

} catch (error) {
    console.error('Error reading Excel file:', error.message);
}
