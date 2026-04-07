const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

const filePath = path.join(__dirname, '../data/SIMPLIFIED DATA.xlsx');

try {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    // Convert to JSON with a high header to see the actual headers
    const data = XLSX.utils.sheet_to_json(sheet);

    const output = {
        sheetName: sheetName,
        first10: data.slice(0, 5)
    };
    
    fs.writeFileSync(path.join(__dirname, '../data/excel_output.json'), JSON.stringify(output, null, 2));
    console.log("Done writing to excel_output.json");
} catch (error) {
    console.error('Error reading Excel file:', error.message);
}
