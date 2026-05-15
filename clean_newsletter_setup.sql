
-- ONLY create the newsletter table and its specific rules
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS just for this new table
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Policy for visitors to subscribe (Insert only)
DROP POLICY IF EXISTS "Allow public insert to newsletter_subscribers" ON newsletter_subscribers;
CREATE POLICY "Allow public insert to newsletter_subscribers" 
ON newsletter_subscribers FOR INSERT 
WITH CHECK (true);

-- Policy for you to see your list (Select only)
DROP POLICY IF EXISTS "Allow admin to view subscribers" ON newsletter_subscribers;
CREATE POLICY "Allow admin to view subscribers" 
ON newsletter_subscribers FOR SELECT 
USING (true);
