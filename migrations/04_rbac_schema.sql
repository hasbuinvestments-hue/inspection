-- Drop table if it exists
DROP TABLE IF EXISTS public.user_profiles;

-- Create user_profiles table
CREATE TABLE public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('super_admin', 'admin', 'inspector')),
    zone TEXT,
    phone TEXT,
    badge_number TEXT,
    created_by UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    is_active BOOLEAN DEFAULT TRUE
);

-- Turn on Row Level Security
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Policy 1: Users can view their own profile
CREATE POLICY "Users can view their own profile"
ON public.user_profiles
FOR SELECT
USING (auth.uid() = id);

-- Policy 2: Super Admins can view all profiles
CREATE POLICY "Super Admins can view all profiles"
ON public.user_profiles
FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM public.user_profiles
        WHERE id = auth.uid() AND role = 'super_admin' AND is_active = true
    )
);

-- Policy 3: Admins can view profiles they created or profiles in their zone
CREATE POLICY "Admins can view relevant profiles"
ON public.user_profiles
FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM public.user_profiles AS current_user
        WHERE current_user.id = auth.uid() AND current_user.role = 'admin' AND current_user.is_active = true
    )
    AND (created_by = auth.uid() OR zone = (SELECT zone FROM public.user_profiles WHERE id = auth.uid()))
);

-- Policy 4: Super Admins can insert/update all profiles
CREATE POLICY "Super Admins can manage all profiles"
ON public.user_profiles
FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM public.user_profiles
        WHERE id = auth.uid() AND role = 'super_admin' AND is_active = true
    )
);

-- Policy 5: Admins can insert/update inspector profiles
CREATE POLICY "Admins can manage inspectors"
ON public.user_profiles
FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM public.user_profiles
        WHERE id = auth.uid() AND role = 'admin' AND is_active = true
    )
    AND role = 'inspector'
);
