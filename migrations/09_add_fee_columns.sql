-- Add missing columns for fee calculation details
-- These are required for the "Finalize Inspection" submission logic
ALTER TABLE inspections 
ADD COLUMN IF NOT EXISTS fee_category TEXT,
ADD COLUMN IF NOT EXISTS fee_premise TEXT,
ADD COLUMN IF NOT EXISTS calculated_fee NUMERIC(10,2);
