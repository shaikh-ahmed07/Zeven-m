# Zeven-M Projects & Realty — Website Template

Next.js 16 (App Router) + TypeScript + plain CSS. No UI framework.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Where to change content

| What | File |
| --- | --- |
| Phone, WhatsApp, email, office, stats, services, testimonials, projects | `lib/data.ts` |
| Colours, fonts, spacing, all styling | `app/globals.css` (tokens at the top) |
| Logo files | `public/logo/` |
| SEO title / description | `app/layout.tsx`, per-project in `app/projects/[slug]/page.tsx` |

**Zeven-M Ace Apartments** (`/projects/zeven-m-ace-apartments`) is the real, featured project —
its details come from the brochure in `public/brochures/` and its renders/floor plan from
`public/images/projects/ace/`. Real projects set `placeholder: false` and can also define
`highlights`, `brochure`, `floorPlan`, `specifications`, `nearby`, `mapQuery` and `disclaimer`
(see the `Project` type in `lib/data.ts`); the page adds the brochure buttons, specifications
section and a live Google Map automatically. Contact: +91 85001 03000 · zevenmgroup@gmail.com
(also used for every WhatsApp link).

Everything marked `PLACEHOLDER` in `lib/data.ts` is demo content: figures, prices, areas,
RERA details, possession dates, travel times, testimonials and phone numbers. Replace these
before going live. Adding a project to `projects` automatically creates its page at
`/projects/<slug>` and adds it to the homepage grid, filters and "More Projects".

## Images

Placeholder photography comes from Unsplash through `photo()` in `lib/data.ts`. To use real
images, put them in `public/images/` and replace `photo('…')` with `'/images/your-file.jpg'`.

## Logo

- `zeven-m-logo-plate.png` — the supplied logo (gold on brand green), cropped to the mark. Used on the light, scrolled navbar.
- `zeven-m-logo-gold.png` — the same gold artwork with only the green background removed. Used over dark imagery (hero, footer, chat).

Colours and proportions are unchanged. The supplied file is 452×452 px, so a higher-resolution
original (SVG or ≥1500 px PNG) will give a sharper result on retina screens.

## Pages

| Route | Content |
| --- | --- |
| `/` | Hero, featured development, about intro, stats, services overview, project preview, testimonials |
| `/about` | Company story, pillars, design + construction process (`/about#process`) |
| `/services` | One section per service with scope of work (`/services#service-<slug>`) |
| `/projects` | Filterable portfolio — `/projects?filter=villas` etc. are shareable |
| `/projects/<slug>` | Project detail (generated from `projects` in `lib/data.ts`) |
| `/why-zeven` | Principles and craftsmanship |
| `/contact` | Contact details and enquiry form — `/contact?interest=Construction` pre-selects the interest |
| `/privacy`, `/terms` | Legal placeholders |

## Enquiries (forms + chatbot site visits)

Every form posts to `POST /api/enquiry` (`app/api/enquiry/route.ts`), which validates the data and
forwards it as JSON to **`ENQUIRY_WEBHOOK_URL`** — a CRM, Zapier/Make webhook, Google Apps
Script, Slack incoming webhook, etc. Copy `.env.example` to `.env.local` and set it.

Until it is set, the API returns 503 and visitors see *"Your enquiry was not sent"* with Call,
WhatsApp and Email buttons pre-filled with what they typed — nothing is faked. To use a hosted form
service instead, set `NEXT_PUBLIC_ENQUIRY_ENDPOINT`.

The API route needs a Node server (`npm run build && npm start`, or Vercel / any Node host).

The chatbot's answers are predefined in `respond()` in `components/widgets/Chatbot.tsx`.

## Structure

```
app/                      routes (home, projects/[slug], privacy, terms, 404)
components/sections/      page sections shared across routes
components/project/       project-detail sections
components/projects/      ProjectCard (shared)
components/forms/         EnquiryForm (shared)
components/widgets/       Chatbot, EnquiryPanel, FloatingActions
components/layout/        Navbar, Footer, Logo, PageHero
components/ui/            Icon, Button, Modal, Counter, SectionHeading
components/providers/     UIProvider (enquiry drawer, chat state, scroll reveals, parallax)
lib/data.ts               all content
lib/enquiry.ts            validation + submission shared by forms, chat and the API
lib/scroll.ts             scroll loop, scroll lock, offset-aware section scrolling
```

## Navigation & interaction notes

- **Navigation** uses real routes. The active navbar item follows the URL (`isActivePath` in
  `lib/data.ts`); project detail pages highlight "Projects".
- **Anchors** (`/about#process`, `/services#service-contracting`, the project sections menu) are
  handled in `components/providers/UIProvider.tsx`: menus close first, then the page scrolls so the
  content lands just below the sticky navbar — also when arriving from another page.
- **Scroll-driven effects** (navbar state, progress line, active link, parallax, process timeline)
  share one throttled loop in `lib/scroll.ts`. `useScrollLock()` there is the only way the site
  locks page scrolling (menu, chat on phones, enquiry panel, sheets) — it is reference-counted
  and iOS-safe.
- **Brand intro** plays once per browser session (see `INIT_SCRIPT` in `app/layout.tsx`).
- **Reduced motion**: all reveal, parallax, intro and drift animations are disabled and scrolling
  becomes instant when the visitor's OS requests reduced motion.
