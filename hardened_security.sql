-- ==========================================
-- 🔒 DEEP SECURITY HARDENING
-- Target: Lockdown Admin Access to Master Email
-- ==========================================

-- 1. NEWSLETTER SUBSCRIBERS
-- Allow anyone to join (Insert)
DROP POLICY IF EXISTS "Allow public insert to newsletter_subscribers" ON public.newsletter_subscribers;
CREATE POLICY "Allow public insert to newsletter_subscribers" ON public.newsletter_subscribers FOR INSERT WITH CHECK (true);

-- LOCKDOWN READ: Only aliabbas.as777@gmail.com can see subscribers
DROP POLICY IF EXISTS "Allow admin read access on newsletter_subscribers" ON public.newsletter_subscribers;
CREATE POLICY "Allow admin read access on newsletter_subscribers" ON public.newsletter_subscribers FOR SELECT USING (
  auth.jwt() ->> 'email' = 'aliabbas.as777@gmail.com'
);

-- LOCKDOWN DELETE: Only aliabbas.as777@gmail.com can delete
DROP POLICY IF EXISTS "Allow admin delete on newsletter_subscribers" ON public.newsletter_subscribers;
CREATE POLICY "Allow admin delete on newsletter_subscribers" ON public.newsletter_subscribers FOR DELETE USING (
  auth.jwt() ->> 'email' = 'aliabbas.as777@gmail.com'
);


-- 2. CONTACT MESSAGES
-- Allow anyone to send messages
DROP POLICY IF EXISTS "Allow public insert to contact_messages" ON public.contact_messages;
CREATE POLICY "Allow public insert to contact_messages" ON public.contact_messages FOR INSERT WITH CHECK (true);

-- LOCKDOWN READ: Only aliabbas.as777@gmail.com can read leads
DROP POLICY IF EXISTS "Allow admin read access on contact_messages" ON public.contact_messages;
CREATE POLICY "CREATE POLICY Allow admin read access on contact_messages" ON public.contact_messages FOR SELECT USING (
  auth.jwt() ->> 'email' = 'aliabbas.as777@gmail.com'
);


-- 3. BOOKINGS
-- Allow public booking
DROP POLICY IF EXISTS "Allow public insert to bookings" ON public.bookings;
CREATE POLICY "Allow public insert to bookings" ON public.bookings FOR INSERT WITH CHECK (true);

-- LOCKDOWN READ: Only aliabbas.as777@gmail.com can see bookings
DROP POLICY IF EXISTS "Allow admin read access on bookings" ON public.bookings;
CREATE POLICY "Allow admin read access on bookings" ON public.bookings FOR SELECT USING (
  auth.jwt() ->> 'email' = 'aliabbas.as777@gmail.com'
);

-- 4. ENABLE RLS (Safety Check)
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
