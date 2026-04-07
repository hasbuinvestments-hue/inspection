const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/SIMPLIFIED DATA.xlsx');

try {
    const workbook = XLSX.readFile(filePath);
    const analysis = {
        sheets: workbook.SheetNames.map(name => {
            const sheet = workbook.Sheets[name];
            const data = XLSX.utils.sheet_to_json(sheet);
            return { name, rows: data.length };
        })
    };
    
    fs.writeFileSync(path.join(__dirname, '../data/final_analysis.json'), JSON.stringify(analysis, null, 2));
    console.log('Final analysis written to final_analysis.json');

} catch (error) {
    console.error('Error:', error.message);
}
