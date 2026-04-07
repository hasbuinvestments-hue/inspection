-- Add assigned_nccg_id column to user_profiles to track PHO to NCCG Officer allocation
ALTER TABLE user_profiles
  ADD COLUMN IF NOT EXISTS assigned_nccg_id UUID REFERENCES user_profiles(id) ON DELETE SET NULL;
