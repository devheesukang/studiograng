# Studio Grang

Portfolio website for **Studio Grang** — a photography and video direction practice based in Seoul, South Korea.

The site is an art-viewing experience built for potential clients and companies to explore the studio's work across photography, video, and graphic design. The focus is entirely on the work itself, presented with minimal UI and intentional scroll experience.

## Features

- **Single-page SPA** with anchor-based section navigation
- **3 design variants** (V1 Minimal / V2 Cinematic / V3 Editorial) with a live switcher for client preview and selection
- **Light / dark theme** — auto-detects system preference, toggleable, no flash on load
- **Responsive** — mobile, tablet, and desktop layouts
- **Framer Motion** animations — scroll reveals, entrance fades, atmospheric transitions
- Photography gallery with category filtering
- YouTube video embeds (privacy-enhanced)

## Tech Stack

- [Next.js 16](https://nextjs.org) — App Router
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS v4](https://tailwindcss.com)
- [next-themes](https://github.com/pacocoursey/next-themes) — theme management
- [Framer Motion](https://www.framer.com/motion/) — animations

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Commands

```bash
npm run dev        # development server
npm run build      # production build
npm run lint       # ESLint
```

## Design Variants

The site ships with three distinct visual designs that can be switched live via the V1 / V2 / V3 buttons in the navigation. Each variant has its own typography, color palette, spacing, and animation style:

| Variant | Personality |
|---|---|
| V1 — Minimal | Ultra-minimal, generous negative space, Cormorant Garamond |
| V2 — Cinematic | Dark, dramatic, full-bleed, Bebas Neue |
| V3 — Editorial | Magazine-structured, asymmetric grid, Playfair Display |

Design specs for each variant live in [`designs/`](./designs/).

## Deployment

Deployed on [Vercel](https://vercel.com). Pushes to `main` trigger automatic deployment.
