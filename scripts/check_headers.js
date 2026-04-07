const XLSX = require('xlsx');
const path = require('path');

const filePath = path.join(__dirname, '../data/SIMPLIFIED DATA.xlsx');

try {
    const workbook = XLSX.readFile(filePath);
    
    workbook.SheetNames.forEach(sheetName => {
        const sheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        console.log(`Sheet: ${sheetName} | Headers:`);
        console.log(JSON.stringify(data[0], null, 2));
        console.log('---');
    });

} catch (error) {
    console.error('Error reading Excel file:', error.message);
}
