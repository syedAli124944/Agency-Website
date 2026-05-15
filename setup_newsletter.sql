
-- Create the newsletter_subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to insert (so the form works for visitors)
CREATE POLICY "Allow public insert to newsletter_subscribers" 
ON newsletter_subscribers FOR INSERT 
WITH CHECK (true);

-- Create a policy that allows only the service role or admin to select (optional, for your dashboard)
CREATE POLICY "Allow admin to view subscribers" 
ON newsletter_subscribers FOR SELECT 
USING (true);
