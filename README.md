# ⚡ NovaSpark — Agency Website

A premium, cinematic digital agency website built with **React + Vite**, featuring glassmorphism UI, smooth animations, and a full suite of client-facing features.

---

## 🚀 Live Features

| Feature | Details |
|---|---|
| **Animated Navbar** | Glass-mirror header with scroll-progress bar, mouse-tracking spotlight, spring-animated active indicator |
| **Hero Section** | Animated headline typewriter, floating dashboard UI mockup |
| **Blog Engine** | Clickable cards → full article page with parallax hero, read-progress bar, social sharing, related posts |
| **Booking System** | 3-step calendar flow — date picker, time slots (30/60 min), confirmation screen |
| **Auth (Supabase)** | Email/password + Google OAuth via Supabase, glassmorphism login/signup UI |
| **Portfolio** | Filterable project grid with hover animations |
| **Contact Form** | EmailJS-powered form with inline map |
| **Smooth Scroll** | Lenis physics-based smooth scrolling throughout |
| **Custom Cursor** | Magnetic cursor with hover effects |
| **Section Tracking** | Active nav indicator slides to the current section in real-time |

---

## 🛠 Tech Stack

- **React 18** + **Vite**
- **Framer Motion** — page transitions, spring animations, scroll-linked effects
- **Tailwind CSS v4** — utility styling
- **Supabase** — authentication backend
- **Lenis** — smooth scroll engine
- **Lucide React** — icon set
- **EmailJS** — contact form delivery

---

## 📦 Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/<your-username>/Agency-Website.git
cd Agency-Website

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Fill in your Supabase and EmailJS keys

# 4. Start dev server
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file in the root with:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON=your_supabase_anon_key
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── common/          # Reusable UI (MagneticButton, SectionHeading, etc.)
│   ├── layout/          # Navbar, Footer, BackToTop, CustomCursor
│   └── sections/        # Hero, About, Services, Portfolio, Blog, Contact...
├── data/
│   └── siteData.js      # All content: nav links, services, blog posts, etc.
├── lib/
│   └── utils.js         # Animation variants, helpers
├── pages/
│   ├── AuthPage.jsx     # Login / Signup
│   ├── BlogPostPage.jsx # Full article reader
│   └── BookingPage.jsx  # Session booking flow
└── App.jsx              # Root routing via state (no React Router)
```

---

## ✨ Design Highlights

- **Cinematic UI** — dark mode, neon glow accents (cyan / purple / pink)
- **Glassmorphism** — frosted glass panels with `backdrop-filter: blur + saturate`
- **Micro-animations** — hover lifts, shimmer sweeps, magnetic buttons
- **Parallax** — blog post hero image moves at 30% scroll speed
- **Mobile-first** — responsive across all breakpoints with an animated slide-in drawer

---

## 📄 License

MIT © NovaSpark Agency
