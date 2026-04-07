-- Run this in the Supabase SQL Editor to create the target table
CREATE TABLE IF NOT EXISTS businesses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_no TEXT,
    permit_no TEXT,
    customer_name TEXT,
    business_name TEXT,
    subcounty_name TEXT,
    ward_name TEXT,
    building_name TEXT,
    plot_no TEXT,
    street_name TEXT,
    stall_no TEXT,
    payment_plan TEXT,
    application_stage TEXT,
    issued_date DATE,
    business_description TEXT,
    business_subsidiary_name TEXT,
    owner_mobile_number TEXT,
    owner_address TEXT,
    contact_person TEXT,
    contact_person_mobile_no TEXT,
    contact_person_email TEXT,
    permit_start_date DATE,
    permit_expiry_date DATE,
    permit_duration TEXT,
    permit_status TEXT,
    ubp_permit_fee DECIMAL,
    invoice_no TEXT,
    paid BOOLEAN,
    payment_ref TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS and add basic policy
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON businesses
    FOR SELECT USING (true);

CREATE POLICY "Allow service role full access" ON businesses
    FOR ALL USING (auth.role() = 'service_role');
