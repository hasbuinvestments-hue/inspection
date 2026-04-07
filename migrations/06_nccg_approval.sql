-- Add NCCG Officer workflow columns
ALTER TABLE inspections
  ADD COLUMN IF NOT EXISTS approval_status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'declined'
  ADD COLUMN IF NOT EXISTS nccg_notes TEXT,
  ADD COLUMN IF NOT EXISTS nccg_officer_name TEXT,
  ADD COLUMN IF NOT EXISTS approved_at TIMESTAMP WITH TIME ZONE;
