const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    "https://xrcraomnvnzpjktvksre.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhyY3Jhb21udm56cGprdHZrc3JlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0NDQzNzIsImV4cCI6MjA5MTAyMDM3Mn0.9RxBVyLXEuimDRkKnIOSF1W21gPpI_e00gb3N_okanc"
);

async function testAuth() {
    const { data, error } = await supabase.auth.signUp({
        email: 'superadmin@nairobi.go.ke',
        password: 'Password123!'
    });

    if (error) {
        console.log("AUTH_ERROR_MESSAGE:", error.message);
        console.log("AUTH_ERROR_CODE:", error.status);
    } else {
        console.log("AUTH_SUCCESS: User created or already exists with session.");
    }
}

testAuth();
