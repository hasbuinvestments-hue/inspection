-- Update user_profiles role constraint to include nccg_officer
-- First, we need to drop the old constraint (usually automatically named, but we can target the check)

DO $$ 
BEGIN 
    -- Try to drop the existing check constraint on 'role'
    ALTER TABLE public.user_profiles DROP CONSTRAINT IF EXISTS user_profiles_role_check;
    
    -- Add the expanded constraint
    ALTER TABLE public.user_profiles 
    ADD CONSTRAINT user_profiles_role_check 
    CHECK (role IN ('super_admin', 'admin', 'inspector', 'nccg_officer'));
END $$;
