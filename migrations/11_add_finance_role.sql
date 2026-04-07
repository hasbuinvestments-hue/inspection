-- Update user_profiles role constraint to include finance_manager
-- This allows for a specialized dashboard for revenue tracking

DO $$ 
BEGIN 
    -- Drop the existing check constraint on 'role'
    ALTER TABLE public.user_profiles DROP CONSTRAINT IF EXISTS user_profiles_role_check;
    
    -- Add the expanded constraint including finance_manager
    ALTER TABLE public.user_profiles 
    ADD CONSTRAINT user_profiles_role_check 
    CHECK (role IN ('super_admin', 'admin', 'inspector', 'nccg_officer', 'finance_manager'));
END $$;
