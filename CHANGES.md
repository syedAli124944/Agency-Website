# 🚀 Agency Master Control Guide

Use this guide whenever you want to update your agency's settings, emails, or bank details.

## 1. 📧 Changing Agency Emails
To change the email from `syedali.as888@gmail.com` to your new agency email:

- **Website Contact Form**:
  - Open `supabase/functions/send-email/index.ts`.
  - Update the `from` and `to` fields (Line 35 & 36).
- **Supabase Dashboard**:
  - Go to **Project Settings** -> **Auth** -> **Email Templates**.
  - Update the "Support Email" and "Sender Name".
- **Resend.com**:
  - Log in to Resend.com.
  - Go to **Settings** -> **Verified Domains**.
  - Add your new agency domain (e.g., `agency.com`).
- **Google & Github Auth**:
  - Go to [Google Cloud Console](https://console.cloud.google.com/) -> **APIs & Services** -> **OAuth Consent Screen**.
  - Go to [Github Developer Settings](https://github.com/settings/developers) -> **OAuth Apps**.

## 2. 🏛️ Adding Bank Details (HBL)
To update the bank details shown to clients:
- Open `src/components/sections/Pricing.jsx`.
- Look for the `BANK_DETAILS` constant (I am adding this now).

## 3. 🖼️ Updating Team & Portfolio
- **Team Images**:
  - Upload your images to `public/team/`.
  - Go to your Supabase Dashboard -> **Table Editor** -> `team_members`.
  - Change the `image_url` column to match your filename (e.g., `/team/new_ceo.png`).
- **Social Links**:
  - Go to Supabase Dashboard -> **Table Editor** -> `team_members`.
  - Update the `twitter_url`, `linkedin_url`, or `github_url` columns.
- **New Projects**:
  - Upload project images to `public/portfolio/`.
  - Go to Supabase Dashboard -> **Table Editor** -> `portfolio_items`.
  - Add a new row with your project details.

## 4. 💳 Payment System
- **Switching to Live Mode**:
  - Once you are ready for real money, get your **Secret Key** from Stripe (Live mode).
  - Run this in terminal: 
    `npx supabase secrets set STRIPE_SECRET_KEY=sk_live_...`
- **Changing Prices**:
  - Open `supabase/functions/create-checkout/index.ts`.
  - Update the `PRICE_MAP` values.
## 5. 📊 Intelligence Command Dashboard
You now have a real-time admin dashboard to manage your agency growth.
- **Accessing the Dashboard**:
  - Sign in with your master email: `aliabbas.as777@gmail.com`.
  - A new "Admin" button will appear in the top Navbar and Mobile Menu.
- **Managing Admin Access**:
  - To change who has admin access, open `src/components/layout/Navbar.jsx`.
  - Search for `aliabbas.as777@gmail.com` and replace it with your new email.
- **Dashboard Features**:
  - **Newsletter**: View all captured emails from your "Join Intelligence" form.
  - **Leads**: Read all incoming messages from your Contact form.
  - **Bookings**: Monitor and manage your strategy call schedule.
- **Manual Data Updates**:
  - You can also manage this data directly in the Supabase Dashboard under the `newsletter_subscribers`, `contact_messages`, and `bookings` tables.
