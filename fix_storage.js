const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

async function createStorageBucket() {
    const supabase = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    console.log('🛠️  Attempting to create storage bucket: "inspection-photos"...');

    const { data, error } = await supabase.storage.createBucket('inspection-photos', {
        public: true,
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif'],
        fileSizeLimit: 5242880 // 5MB
    });

    if (error) {
        if (error.message.includes('already exists')) {
            console.log('✅ Bucket "inspection-photos" already exists.');
        } else {
            console.error('❌ Error creating bucket:', error.message);
        }
    } else {
        console.log('✅ Success! Bucket "inspection-photos" created and set to public.');
    }
}

createStorageBucket();
