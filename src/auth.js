// Ensure Supabase is initialized
const _authSupabase = window.supabase.createClient(window.SUPABASE_CONFIG.url, window.SUPABASE_CONFIG.anonKey);
window._authSupabase = _authSupabase; // expose for ActivityTracker

const AuthProvider = {
    /**
     * Get the current logged-in user and their profile
     */
    async getCurrentUser() {
        // 1. Get auth user
        const { data: { user }, error: authError } = await _authSupabase.auth.getUser();
        
        if (authError || !user) {
            return { user: null, profile: null };
        }

        // 2. Get user profile from user_profiles table
        const { data: profile, error: profileError } = await _authSupabase
            .from('user_profiles')
            .select('*')
            .eq('id', user.id)
            .single();

        if (profileError) {
            console.error("Error fetching user profile:", profileError.message);
            // Even if logged in, if they have no profile, they can't do anything
            return { user, profile: null };
        }

        return { user, profile };
    },

    /**
     * Log in a user and return their profile to determine routing
     */
    async login(email, password) {
        const { data, error } = await _authSupabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            throw new Error(error.message);
        }

        const { profile } = await this.getCurrentUser();

        if (!profile || !profile.is_active) {
            // Sign out immediately if no valid profile or inactive
            await _authSupabase.auth.signOut();
            throw new Error("Your account is not active or missing a profile. Contact the administrator.");
        }

        // Set global profile temporarily for the activity tracker
        window.CURRENT_USER = data.user;
        window.CURRENT_PROFILE = profile;

        // Log activity: User Login
        ActivityTracker.log('user_login', `System Administrator / Inspector logged in: ${profile.full_name}`, { role: profile.role });

        return profile;
    },

    /**
     * Log out the current user
     */
    async logout() {
        const { error } = await _authSupabase.auth.signOut();
        if (error) throw new Error(error.message);
        
        // Clear any stored session variables if we had them
        window.location.href = 'login.html';
    },

    /**
     * Guard function to put at the top of protected pages.
     * Checks if the user is logged in AND has an allowed role.
     * @param {string[]} allowedRoles Array of roles that can access this page (e.g. ['super_admin', 'admin'])
     */
    async checkAuth(allowedRoles = []) {
        const { user, profile } = await this.getCurrentUser();

        // Not logged in or no valid profile
        if (!user || !profile || !profile.is_active) {
            window.location.href = 'login.html';
            return null;
        }

        // Role check
        if (allowedRoles.length > 0 && !allowedRoles.includes(profile.role)) {
            // Unauthorized - route them to their proper dashboard
            if (profile.role === 'super_admin') window.location.href = 'superadmin.html';
            else if (profile.role === 'admin') window.location.href = 'admin.html';
            else if (profile.role === 'nccg_officer') window.location.href = 'nccg.html';
            else if (profile.role === 'finance_manager') window.location.href = 'finance.html';
            else window.location.href = 'index.html'; 
            return null;
        }

        // Add user info to global window scope for easy access by other scripts
        window.CURRENT_USER = user;
        window.CURRENT_PROFILE = profile;

        // Display user name in header if element exists
        const headerNameEl = document.getElementById('header-user-name');
        if (headerNameEl) {
            headerNameEl.textContent = profile.full_name;
        }
        
        // Setup logout button listener if element exists
        const logoutBtn = document.getElementById('btn-logout');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.logout());
        }

        return { user, profile };
    }
};

window.AuthProvider = AuthProvider;
