-- Final Robust RLS Fix
-- Ensures Super Admins and Admins are never locked out of profile lookups

BEGIN;

-- 1. Helper Function (Same as before, ensure it exists)
CREATE OR REPLACE FUNCTION public.get_my_role()
RETURNS text AS $$
BEGIN
  RETURN (
    SELECT role FROM public.user_profiles 
    WHERE id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Drop all previous attempts
DROP POLICY IF EXISTS "Users can view own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Admins can view personnel" ON public.user_profiles;
DROP POLICY IF EXISTS "Admins can insert personnel" ON public.user_profiles;
DROP POLICY IF EXISTS "Admins can update personnel" ON public.user_profiles;
DROP POLICY IF EXISTS "SuperAdmins manage all" ON public.user_profiles;

-- 3. The New Rules

-- A. Super Admin: Full Unrestricted Access
CREATE POLICY "SuperAdmins manage all"
ON public.user_profiles
FOR ALL
USING (get_my_role() = 'super_admin');

-- B. Every active user can always see their own profile (Critical for Login)
CREATE POLICY "Users can view own profile"
ON public.user_profiles
FOR SELECT
USING (id = auth.uid());

-- C. Admins: Can view and manage their team (Inspectors, Finance, NCCG)
CREATE POLICY "Admins can view personnel"
ON public.user_profiles
FOR SELECT
USING (
    get_my_role() = 'admin'
    AND role IN ('inspector', 'nccg_officer', 'finance_manager')
);

CREATE POLICY "Admins can manage personnel"
ON public.user_profiles
FOR INSERT, UPDATE
WITH CHECK (
    get_my_role() = 'admin'
    AND role IN ('inspector', 'nccg_officer', 'finance_manager')
);

COMMIT;
