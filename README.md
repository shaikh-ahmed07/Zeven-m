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

## Forms & chatbot

Forms are front-end only. Connect `submitEnquiry()` in `components/forms/EnquiryForm.tsx` to your
CRM or API route. The chatbot (`components/widgets/Chatbot.tsx`) uses predefined responses in
`respond()`. Extend it there or swap in a live assistant.

## Structure

```
app/                      routes (home, projects/[slug], privacy, terms, 404)
components/home/          homepage sections
components/project/       project-detail sections
components/projects/      ProjectCard (shared)
components/forms/         EnquiryForm (shared)
components/widgets/       Chatbot, EnquiryPanel, FloatingActions
components/layout/        Navbar, Footer, Logo
components/ui/            Icon, Button, Modal, Counter, SectionHeading
components/providers/     UIProvider (enquiry drawer, chat state, scroll reveals, parallax)
lib/data.ts               all content
```

## Navigation & interaction notes

- **In-page links** (`/#projects`, `#gallery`, footer links…) are handled centrally in
  `components/providers/UIProvider.tsx`: open menus/sheets close first, then the page scrolls so
  the section content lands just below the sticky navbar (and the project sub-nav). Section IDs:
  `home`, `about`, `services`, `projects`, `why-zeven`, `process`, `contact`, plus
  `service-<slug>` for each service card.
- **Scroll-driven effects** (navbar state, progress line, active link, parallax, process timeline)
  share one throttled loop in `lib/scroll.ts`. `useScrollLock()` there is the only way the site
  locks page scrolling (menu, chat on phones, enquiry panel, sheets) — it is reference-counted
  and iOS-safe.
- **Brand intro** plays once per browser session (see `INIT_SCRIPT` in `app/layout.tsx`).
- **Reduced motion**: all reveal, parallax, intro and drift animations are disabled and scrolling
  becomes instant when the visitor's OS requests reduced motion.
