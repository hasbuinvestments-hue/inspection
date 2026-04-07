-- Run this in the Supabase SQL Editor to create the inspections table
CREATE TABLE IF NOT EXISTS inspections (
    id                          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id                 UUID REFERENCES businesses(id),
    inspector_name              TEXT NOT NULL,
    inspection_date             TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    personnel                   TEXT[],
    next_inspection_date        DATE,
    service_type                TEXT,
    areas_affected              TEXT[],
    pest_types                  TEXT[],
    chemicals_used              TEXT[],
    treatment_methods           TEXT[],
    chemical_dosages            JSONB,
    issues_found                TEXT[],
    pest_sightings              JSONB,
    housekeeping_rating         TEXT,
    waste_management_rating     TEXT,
    stacking_rating             TEXT,
    overall_sanitation_rating   TEXT,
    recommendations             TEXT[],
    notes                       TEXT,
    photo_urls                  TEXT[],
    photo_meta                  JSONB,
    is_paid                     BOOLEAN DEFAULT FALSE,
    amount_paid                 NUMERIC(10,2) DEFAULT 0,
    payment_ref                 TEXT,
    payment_date                TIMESTAMP WITH TIME ZONE,
    status                      TEXT DEFAULT 'completed',
    created_at                  TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS and add basic policies
ALTER TABLE inspections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON inspections
    FOR SELECT USING (true);

CREATE POLICY "Allow service role full access" ON inspections
    FOR ALL USING (auth.role() = 'service_role');
