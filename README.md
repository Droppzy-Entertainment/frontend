# Droppzy Entertainment — v1 Website

## 1. What this is

This is the **v1 promotional website for Droppzy Entertainment** — a
single-page (anchor-navigated) marketing site built with a production-grade,
security-hardened Next.js stack: hero, about, categories, videos, stats,
talent-submission form, and a contact form that dispatches real email via
Resend.

The repository is laid out **monorepo-style**, with two top-level folders:

```
droppzy-site/
├── frontend/   ← the actual v1 site (everything described below)
└── backend/    ← reserved for v2, not wired to anything in v1
```

`backend/` exists today only as a **forward-looking placeholder** — a Prisma
schema, a `package.json` with just `@prisma/client`/`prisma`, and its own
README describing the planned v2 data model (persisted talent/contact
submissions, a real video/category CMS, admin accounts). **Nothing in
`backend/` is imported, called, or deployed by `frontend/` in v1.** The v1
site's two forms send email directly through Resend
(`frontend/src/lib/mail.ts`); no database is read from or written to. The
folder is kept in the repo now so the v2 schema can be reviewed and agreed
upon ahead of time without blocking or coupling to the v1 launch. See
[`backend/README.md`](./backend/README.md) for the full v2 scope.

## 2. Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) |
| UI library | React 19 |
| Language | TypeScript, `strict: true` |
| Styling | Tailwind CSS v3.4 + a hand-authored `@layer components` design system in `globals.css` |
| Animation | Framer Motion (scroll-reveal, count-up stats, reduced-motion aware) |
| Icons | Lucide React |
| Validation | Zod (one schema per form, shared by client and server) |
| Forms | React Hook Form + `@hookform/resolvers` (`zodResolver`) |
| Email | Resend |
| Database layer | Prisma — **schema only**, not connected in v1 (`backend/`) |
| Deploy target | Vercel |

## 3. Folder structure

This tree reflects what was actually built (verified against the live
filesystem, not copied from the design plan):

```
droppzy-site/
├── README.md
├── SECURITY.md
├── .gitignore
├── backend/
│   ├── README.md              # v2 scope + "parameterized queries only" rule
│   ├── package.json           # @prisma/client + prisma only
│   ├── .env.example
│   ├── .env                   # local placeholder, git-ignored
│   └── prisma/
│       └── schema.prisma      # inert in v1 — TalentSubmission, ContactSubmission,
│                               # Video, Category, Admin models + enums
└── frontend/
    ├── package.json
    ├── tsconfig.json
    ├── tailwind.config.ts
    ├── postcss.config.mjs
    ├── eslint.config.mjs
    ├── next.config.ts         # static security headers, poweredByHeader: false
    ├── .env.example
    ├── .env.local             # local placeholder-valid values, git-ignored
    ├── public/
    │   └── brand/
    │       └── droppzy-logo.png   # the ONE real, non-placeholder asset
    └── src/
        ├── middleware.ts       # per-request CSP nonce (src/, not project root — see note below)
        ├── fonts/
        │   └── index.ts        # next/font/google: Archivo Black, Inter, Caveat
        ├── lib/
        │   ├── env.ts          # Zod-validated env, fails fast at import
        │   ├── validation.ts   # TalentFormSchema / ContactFormSchema (shared client+server)
        │   ├── rate-limit.ts   # RateLimiter interface + InMemoryRateLimiter
        │   ├── sanitize.ts     # escapeHtml / stripControlChars / etc. for email content
        │   ├── security.ts     # buildCSP, STATIC_SECURITY_HEADERS, honeypot/timing/origin helpers
        │   ├── mail.ts         # Resend dispatch for both forms
        │   ├── categories.ts   # single source of truth for the 5 content categories
        │   ├── videos.ts       # PLACEHOLDER_VIDEOS (documented YouTube API v3 swap point)
        │   ├── constants.ts    # site name, nav links
        │   ├── og-assets.ts    # shared logo-decoding helper for the ImageResponse generators
        │   └── cn.ts           # tiny hand-rolled classname joiner
        ├── components/
        │   ├── Navbar.tsx          (client — mobile drawer menu)
        │   ├── Hero.tsx
        │   ├── About.tsx
        │   ├── BehindTheScenes.tsx
        │   ├── Categories.tsx
        │   ├── Videos.tsx
        │   ├── Stats.tsx           (client — count-up on scroll into view)
        │   ├── SubscribeStrip.tsx
        │   ├── TalentForm.tsx      (client — React Hook Form + Zod)
        │   ├── Contact.tsx         (client — React Hook Form + Zod)
        │   ├── Footer.tsx
        │   └── ui/
        │       ├── Button.tsx
        │       ├── Card.tsx
        │       ├── Eyebrow.tsx
        │       ├── Field.tsx
        │       ├── Input.tsx
        │       ├── Textarea.tsx
        │       ├── Select.tsx
        │       ├── Section.tsx
        │       ├── SectionHeading.tsx
        │       ├── Marquee.tsx
        │       ├── PlaceholderImage.tsx
        │       └── StatCounter.tsx  (client — Framer Motion useInView)
        └── app/
            ├── layout.tsx           # root shell, fonts, metadata, reads CSP nonce
            ├── page.tsx             # composes all sections in order
            ├── globals.css          # :root design tokens + @layer components
            ├── icon.tsx             # generated favicon (ImageResponse + real logo)
            ├── apple-icon.tsx
            ├── opengraph-image.tsx
            ├── twitter-image.tsx    # re-exports opengraph-image.tsx
            ├── robots.ts
            ├── sitemap.ts
            └── api/
                ├── talent/route.ts
                └── contact/route.ts
```

> **Note on `middleware.ts`'s location.** Because this project uses the
> `src/` layout (`src/app`, `src/components`, `src/lib`), Next.js requires
> middleware to live at `src/middleware.ts`, not at the project root — a
> root-level `frontend/middleware.ts` would silently never execute. This was
> verified directly against Next's docs during the app-shell build phase.

## 4. Getting started

```bash
cd frontend
npm install
npm run dev
```

A working `frontend/.env.local` with **placeholder-valid values** is already
committed for local development (it's git-ignored from version control going
forward, but exists on disk right now) — so `npm run dev` boots immediately
without any setup. It satisfies `lib/env.ts`'s Zod schema but contains no
real secrets: the Resend key is a fake `re_placeholder_dev_key`, and the
recipient addresses are `@droppzy.example`. Form submissions will fail to
actually send mail until you swap in a real `RESEND_API_KEY` and verified
sender/recipient addresses (see the env var table below and
`frontend/.env.example`).

The app runs at `http://localhost:3000`.

## 5. Environment variables

All variables are defined and validated in `frontend/src/lib/env.ts`
(Zod schema, parsed at module load — the app fails fast on boot if a
required variable is missing or malformed). Full documentation for each
lives in `frontend/.env.example`.

| Name | Required | Purpose | Example |
|---|---|---|---|
| `RESEND_API_KEY` | Yes | API key for the Resend transactional email service; used by `lib/mail.ts` to send both forms' submissions. | `re_123abc...` |
| `MAIL_FROM_ADDRESS` | Yes | The verified "From" address used when sending outbound mail via Resend. | `onboarding@droppzy.example` |
| `CONTACT_RECIPIENT_EMAIL` | Yes | Inbox that receives Contact form submissions. | `contact@droppzy.example` |
| `TALENT_RECIPIENT_EMAIL` | No | Inbox that receives Talent form submissions; falls back to `CONTACT_RECIPIENT_EMAIL` if unset. | `talent@droppzy.example` |
| `ALLOWED_ORIGINS` | No | Comma-separated additional allowed request origins for the API routes' Origin/Referer check, beyond `NEXT_PUBLIC_SITE_URL` itself. | `https://staging.droppzy.example,https://preview.droppzy.example` |
| `RATE_LIMIT_MAX` | No (default `5`) | Max requests allowed per IP per route within one rate-limit window. | `5` |
| `RATE_LIMIT_WINDOW_MS` | No (default `600000`) | Length of the rate-limit fixed window, in milliseconds. | `600000` |
| `NEXT_PUBLIC_SITE_URL` | Yes | Public canonical site URL, no trailing slash. Used for metadata, `sitemap.ts`/`robots.ts`, and the API routes' same-origin check. | `https://droppzy.example` |
| `NEXT_PUBLIC_YOUTUBE_CHANNEL_URL` | Yes | Public URL of the Droppzy YouTube channel; used by every "Subscribe"/"Watch on YouTube" link on the site. | `https://www.youtube.com/@droppzy` |

Any variable prefixed `NEXT_PUBLIC_` is inlined into the client bundle at
build time and is **not secret** — never put real secrets behind that
prefix. All other variables above are server-only.

## 6. Placeholder asset disclosure

This is a **v1 build with placeholder imagery** everywhere except one file.
Before a real production launch, everything flagged below must be replaced.

- **The real Droppzy logo — `frontend/public/brand/droppzy-logo.png` — is
  the one genuine, non-placeholder visual asset in this project.** It was
  copied (not re-created) from the source brand file. Every favicon,
  Apple touch icon, and Open Graph/Twitter card image on the site is
  generated at build/request time from this same real logo via
  `next/og`'s `ImageResponse` (`app/icon.tsx`, `app/apple-icon.tsx`,
  `app/opengraph-image.tsx`, `app/twitter-image.tsx`).
- **Every other image on the site is a rendered CSS/SVG placeholder — not
  stock photography, not a binary image file.** This includes:
  - the Hero section's 4-image collage,
  - the About section's feature photo,
  - all video thumbnails,
  - the "behind the scenes" horizontal strip.

  These are all rendered through one shared component,
  `frontend/src/components/ui/PlaceholderImage.tsx`, which draws a
  duotone-gradient placeholder and always carries a real `aria-label`
  describing what belongs there. Every call site is marked in code with a
  `// PLACEHOLDER:` comment naming the real asset that should eventually
  replace it (e.g. "PLACEHOLDER: hero collage photo 1 of 4 — real behind-
  the-scenes photography"). Swapping in real photography later is a
  same-shape swap inside each existing wrapper — no markup restructuring
  required.
- **The YouTube channel URL is a placeholder** —
  `NEXT_PUBLIC_YOUTUBE_CHANNEL_URL` currently points at a placeholder
  handle (see `.env.local`/`.env.example`). Every "Subscribe on YouTube" /
  "Watch on YouTube" button/link across Navbar, Hero, SubscribeStrip, and
  Footer reads from this single env var, so pointing it at the real channel
  is a one-variable fix, not a multi-file hunt.
- **`lib/videos.ts`'s `PLACEHOLDER_VIDEOS` array** (titles, view counts,
  categories) is placeholder editorial data, documented inline as the swap
  point for a real YouTube Data API v3 integration in v2.

None of the above are load-bearing for the security posture of the site —
they are purely visual/content placeholders — but all of them must be
swapped before treating this as a real public launch.

## 7. Security summary

The site implements CSP with per-request nonces, a full set of static
security headers (HSTS, `X-Frame-Options`, `X-Content-Type-Options`,
`Referrer-Policy`, `Permissions-Policy`, `X-DNS-Prefetch-Control`), and a
multi-layered anti-abuse pipeline on both public forms (origin verification,
body-size guard, Zod strict-schema validation, a honeypot field, a
minimum-fill-time check, per-IP rate limiting, and server-side sanitization
before any email is sent).

Full detail — exact header/CSP values, the request-by-request data flow,
known v1 limitations, and the v2 security roadmap — is in
**[`SECURITY.md`](./SECURITY.md)**.

## 8. Backend / v2 roadmap

`backend/` is reserved, schema-only, and not wired to `frontend/` in v1.
See **[`backend/README.md`](./backend/README.md)** for the planned v2 scope
(persisted submissions, a real video/category CMS, admin authentication) and
the hard "parameterized queries only" rule that governs all future database
access.

## 9. Scripts

Run from `frontend/`:

| Script | Command | Purpose |
|---|---|---|
| `dev` | `next dev` | Start the local development server. |
| `build` | `next build` | Production build. |
| `start` | `next start` | Serve the production build (run `build` first). |
| `lint` | `next lint` | Lint the codebase; should report zero warnings. |
| `typecheck` | `tsc --noEmit` | TypeScript strict type-check with no emitted output. |

## 10. Deployment notes (Vercel)

- Deploy `frontend/` as the Vercel project root (or set its "Root Directory"
  to `frontend/` in the Vercel dashboard if the whole `droppzy-site/` repo is
  connected as one project).
- Set every environment variable from the table in §5 in the **Vercel
  project dashboard** (Project → Settings → Environment Variables) for the
  Production (and Preview, if used) environments. **Do not commit real
  secrets** — `.env.local` and `backend/.env` are git-ignored specifically so
  real values never end up in version control; only the documented
  `.env.example` files are tracked.
- **Caution on HSTS preload**: `STATIC_SECURITY_HEADERS` in
  `lib/security.ts` already ships
  `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`.
  The `preload` directive is effectively permanent once submitted to
  browsers' HSTS preload lists — only enable/submit preload once the final
  production domain is confirmed to serve **all** subdomains over HTTPS
  only, with no plan to ever run any subdomain on plain HTTP. Removing a
  domain from the preload list afterward is slow and unreliable, so treat
  this as a one-way door.
- `next.config.ts` sets `poweredByHeader: false` and `reactStrictMode: true`
  already — no additional Vercel-side configuration is needed for those.

## 11. Dependency hygiene

Run `npm audit` periodically (at minimum before every deploy, and on a
recurring schedule such as monthly) in both `frontend/` and `backend/`, and
keep dependencies patched — especially `next`, `react`/`react-dom`, and
`resend`, since this app handles untrusted public form input end to end.
See `SECURITY.md`'s v2 roadmap for adding automated dependency scanning
(Dependabot/`npm audit`/Snyk) in CI.
