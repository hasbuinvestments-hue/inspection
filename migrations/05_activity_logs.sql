-- Drop table if it exists
DROP TABLE IF EXISTS public.system_activity_logs;

-- Create system_activity_logs table
CREATE TABLE public.system_activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    user_name TEXT,
    action_type TEXT NOT NULL,
    description TEXT NOT NULL,
    zone TEXT,
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Turn on Row Level Security
ALTER TABLE public.system_activity_logs ENABLE ROW LEVEL SECURITY;

-- Policy: Only Super Admins can view activity logs
CREATE POLICY "Super Admins can view activity logs"
ON public.system_activity_logs
FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM public.user_profiles
        WHERE id = auth.uid() AND role = 'super_admin' AND is_active = true
    )
);

-- Policy: Authenticated users can insert activity logs (to record their actions)
CREATE POLICY "Authenticated users can insert activity logs"
ON public.system_activity_logs
FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

-- Enable Realtime for this table
-- Note: You might also need to add it to the 'supabase_realtime' publication
-- ALTER PUBLICATION supabase_realtime ADD TABLE system_activity_logs;
