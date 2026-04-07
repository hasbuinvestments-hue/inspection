-- Backfill approval_status for existing inspections
-- This ensures they show up in the NCCG Officer review queue
UPDATE inspections 
SET approval_status = 'pending' 
WHERE approval_status IS NULL;
