const { createClient } = require('@supabase/supabase-js');

// 1. Initialize Supabase
const supabase = createClient(
    "https://xrcraomnvnzpjktvksre.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhyY3Jhb21udm56cGprdHZrc3JlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0NDQzNzIsImV4cCI6MjA5MTAyMDM3Mn0.9RxBVyLXEuimDRkKnIOSF1W21gPpI_e00gb3N_okanc"
);

async function seedRBAC() {
    console.log("🚀 Starting RBAC Clean Seeding...");

    // A. Users to creation
    const usersToCreate = [
        { email: 'superadmin@nairobi.go.ke', password: 'Password123!', role: 'super_admin', name: 'General Manager' },
        { email: 'admin@nairobi.go.ke',      password: 'Password123!', role: 'admin',       name: 'Area Manager', zone: 'Global' }
    ];

    for (const u of usersToCreate) {
        console.log(`\nCreating ${u.name} (${u.email})...`);
        
        // 1. SignUp via Official Auth API
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: u.email,
            password: u.password
        });

        if (authError) {
            console.error(`- Auth Error for ${u.email}:`, JSON.stringify(authError, null, 2));
            continue;
        }

        console.log("- Auth account created successfully.");

        // 2. Link Profile
        const { error: profileError } = await supabase
            .from('user_profiles')
            .insert({
                id: authData.user.id,
                full_name: u.name,
                role: u.role,
                zone: u.zone || null,
                is_active: true
            });

        if (profileError) {
            console.error(`- Profile Error for ${u.email}:`, profileError.message);
        } else {
            console.log("- System profile linked successfully.");
        }
    }

    console.log("\n✅ Seeding Complete!");
    console.log("NOTE: If your project has 'Email Confirmation' enabled, please confirm these users in the Supabase Dashboard before logging in.");
}

seedRBAC();
