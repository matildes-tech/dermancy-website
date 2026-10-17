# Dermancy Medical House - Website Handover

## Project Overview

A complete Next.js 16 website for **Dermancy Medical House** (Dr. Ioannis Michalakis, Rhodes, Greece) featuring:

- **3 switchable design themes** — Clean Minimal, Dark Aesthetic (charcoal + rose gold), Modern Professional
- **8 languages** — English, Greek, German, French, Spanish, Italian, Hebrew (RTL), Chinese
- **10 public pages** — Home, About, Treatments (8 detail pages), 3D Body Scan, Technology, Booking, Contact, Privacy Policy, Theme Preview
- **Admin dashboard** — Stats, appointments, content management, analytics, settings
- **Interactive features** — 4-step booking wizard, AI chatbot, WhatsApp widget, 3D body visualization, cookie consent
- **SEO** — JSON-LD schemas (MedicalOrganization, Physician, MedicalProcedure), dynamic sitemap (136 URLs), per-page metadata with locale alternates

## Prerequisites

- Node.js 22+ (tested on v24.14.0)
- npm 11+
- Git

## Quick Start

```bash
# Clone
git clone git@github.com:st4rkis/dermancy-website.git
cd dermancy-website

# Install
npm install

# Run development server
npx next dev --turbopack --port 3000

# Build for production
npx next build

# Start production server
npx next start
```

Open http://localhost:3000/en to see the site.

## Key URLs

| Page | Path |
|------|------|
| Home | `/en` |
| About | `/en/about` |
| Treatments | `/en/treatments` |
| Botox Detail | `/en/treatments/botox` |
| 3D Body Scan | `/en/3d-body-scan` |
| Technology | `/en/technology` |
| Booking | `/en/booking` |
| Contact | `/en/contact` |
| Theme Switcher | `/en/theme-preview` |
| Admin Dashboard | `/admin` |
| Other languages | `/el/...`, `/de/...`, `/fr/...`, `/es/...`, `/it/...`, `/he/...`, `/zh/...` |

## Switching Themes

Three ways:
1. **Header** — 3 color-dot buttons in the top-right navbar (visible on all pages)
2. **Hero** — 3 labeled buttons ("Minimal", "Dark", "Modern") on the home page hero section
3. **Theme Preview page** — `/en/theme-preview` with full descriptions and instant switching

Theme choice persists in localStorage across page navigation and browser sessions.

## Project Structure

```
src/
├── app/
│   ├── globals.css              # 3 theme token sets + Tailwind v4 @theme inline
│   ├── [locale]/                # All public pages (8 locales)
│   ├── admin/                   # Admin dashboard (English only)
│   └── api/                     # booking, contact, chatbot endpoints
├── components/
│   ├── layout/                  # Header, MobileMenu, Footer, ThemeSwitcher, LanguageSwitcher
│   ├── home/                    # HeroSection, FeaturedTreatments, PhilosophySection, etc.
│   ├── booking/                 # BookingWizard (4-step flow)
│   ├── 3d/                      # BodyViewer (Three.js), BodyScanClient
│   ├── widgets/                 # WhatsAppWidget, AiChatWidget, CookieConsent
│   ├── ui/                      # Button, Card, Input, Textarea, Badge, Container
│   └── seo/                     # JsonLd, MedicalOrganizationSchema, PhysicianSchema
├── themes/                      # ThemeProvider, 3 theme configs, useThemeConfig hook
├── i18n/                        # next-intl config, routing, request
├── messages/                    # 8 translation JSON files (en, el, de, fr, es, it, he, zh)
├── lib/                         # constants, treatments data, fonts, utils
└── hooks/                       # useScrollDirection, useMediaQuery
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, TypeScript) |
| Styling | Tailwind CSS v4 + CSS custom properties |
| Theme switching | next-themes (attribute: data-theme) |
| i18n | next-intl (8 locales, RTL Hebrew) |
| Icons | Lucide React |
| 3D | Three.js + @react-three/fiber + @react-three/drei |
| Forms | React Hook Form + Zod |
| Fonts | 6 Google Fonts via next/font |

## Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

| Variable | Required | Description |
|----------|----------|-------------|
| `ADMIN_PASSWORD` | Yes | Password for admin dashboard login |
| `OPENAI_API_KEY` | No | For AI chatbot (falls back to rule-based) |
| `NEXT_PUBLIC_GA_ID` | No | Google Analytics ID |
| `SMTP_HOST/PORT/USER/PASS` | No | Email notifications for bookings |
| `NOTIFICATION_EMAIL` | No | Where booking notifications go |

## Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables
vercel env add ADMIN_PASSWORD
```

Or connect the GitHub repo at https://vercel.com/new and it auto-deploys on push.

## Deploy to Google Cloud Run

```bash
# Build Docker image
docker build -t dermancy-website .

# Tag for Google Container Registry
docker tag dermancy-website gcr.io/YOUR_PROJECT_ID/dermancy-website

# Push to GCR
docker push gcr.io/YOUR_PROJECT_ID/dermancy-website

# Deploy to Cloud Run
gcloud run deploy dermancy-website \
  --image gcr.io/YOUR_PROJECT_ID/dermancy-website \
  --platform managed \
  --region europe-west1 \
  --allow-unauthenticated \
  --set-env-vars ADMIN_PASSWORD=your-password
```

Note: You'll need a `Dockerfile` (not included yet — use the official Next.js Docker example).

## Custom Domain (dermancy.com)

1. Deploy to Vercel or Cloud Run
2. In your domain registrar (where dermancy.com is registered), update DNS:
   - **Vercel**: Add CNAME record pointing to `cname.vercel-dns.com`
   - **Cloud Run**: Add A record pointing to the Cloud Run IP
3. In Vercel/Cloud Run, add `dermancy.com` as a custom domain
4. SSL certificate is provisioned automatically

## What's Production-Ready

- All 10 public pages with full content
- 3 complete design themes with instant switching
- 8 language translations
- SEO (JSON-LD schemas, sitemap, metadata)
- Booking wizard UI (4-step flow)
- WhatsApp widget (links to clinic WhatsApp)
- AI chatbot (rule-based responses)
- Admin dashboard UI (stats, tables, content management)
- Cookie consent

## What Needs Work Before Production

| Item | Status | What's Needed |
|------|--------|---------------|
| **Images** | Placeholder only | Add real clinic photos, doctor headshot, treatment before/after images to `public/images/` |
| **AI Chatbot** | Rule-based fallback | Connect an LLM API in `/api/chatbot/route.ts` |
| **Database** | No persistence | Add SQLite/Postgres for appointments, patient data |
| **Admin Auth** | No login page | Implement cookie-based auth with login form |
| **Email Notifications** | Console.log only | Configure SMTP in booking/contact API routes |
| **3D Body Model** | Simple shapes | Replace with proper GLTF/GLB humanoid model |
| **Payment Processing** | None | Add Stripe for booking deposits |
| **Analytics** | GA ID only | Connect Google Analytics or Plausible |
| **PWA Service Worker** | Manifest only | Configure next-pwa with caching strategies |
| **Hebrew RTL** | Needs testing | Verify all components render correctly in RTL |
| **Chinese translations** | Basic | Review and refine zh.json with native speaker |
