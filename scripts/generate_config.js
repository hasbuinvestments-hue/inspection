const fs = require('fs');
require('dotenv').config();

const config = `
window.SUPABASE_CONFIG = {
    url: "${process.env.SUPABASE_URL}",
    anonKey: "${process.env.SUPABASE_ANON_KEY}"
};`;

fs.writeFileSync('./src/config.js', config);
console.log('✅ Generated config.js for the frontend.');
