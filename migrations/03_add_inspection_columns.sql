-- Run this in your Supabase SQL Editor to add the new columns
-- Go to: Supabase Dashboard > SQL Editor > New Query > Paste & Run

ALTER TABLE inspections
    ADD COLUMN IF NOT EXISTS inspection_date       timestamptz,
    ADD COLUMN IF NOT EXISTS personnel             text[],
    ADD COLUMN IF NOT EXISTS service_type          text,
    ADD COLUMN IF NOT EXISTS areas_affected        text[],
    ADD COLUMN IF NOT EXISTS pest_types            text[],
    ADD COLUMN IF NOT EXISTS issues_found          text[],
    ADD COLUMN IF NOT EXISTS pest_sightings        jsonb,
    ADD COLUMN IF NOT EXISTS housekeeping_rating   text,
    ADD COLUMN IF NOT EXISTS waste_management_rating text,
    ADD COLUMN IF NOT EXISTS stacking_rating       text,
    ADD COLUMN IF NOT EXISTS overall_sanitation_rating text,
    ADD COLUMN IF NOT EXISTS recommendations       text[];
