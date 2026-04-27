# Grang Studio — Portfolio Website

## Project Overview

Personal portfolio website for **Kang Bosun (강보선)**, photographer and video director, operating under the studio name **Grang Studio**. The site is a showcase for potential clients and companies to view her work.

- **Site name:** Grang Studio
- **Deployment:** Vercel (Next.js)
- **Navigation style:** Single-page / SPA with anchor-based section navigation

## Person

- **Name:** Kang Bosun (강보선), born 1999.05.14
- **Role:** Photographer & Video Director (포토그래퍼, 영상 디렉터)
- **Location:** Seongsu-dong, Seongdong-gu, Seoul
- **Email:** wolfkang0514@naver.com
- **Phone:** 010-6401-0514
- **Education:** Sangmyung University — Photography & Video Content, B.A. (2018–2022), GPA 3.63/4.5
- **Profile photo:** `notion_export/bosun_portfolio/non_folderized/증명사진.jpeg`

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Theme:** `next-themes` with `attribute="class"`, default `system`
- **Animation:** Framer Motion (scroll reveals, fade-ins — subtle and purposeful)
- **Images:** `next/image` for all photos (WebP, lazy loading, responsive sizing)
- **Video:** YouTube embed (no YouTube branding if possible — use `youtube-nocookie.com`)
- **No UI component library** — all components hand-crafted for a unique artistic feel

## Design Principles

- **The work is everything** — images and videos are the entire point; UI exists only to serve them
- **Minimal and purposeful** — whitespace is intentional, not empty; nothing decorative that doesn't serve the art
- **No résumé elements** — no skills bars, no career timelines, no award badges, no tech stack displays
- **Scroll as experience** — transitions between sections should feel intentional and atmospheric, not mechanical
- **Animations: subtle and cool** — entrance reveals, smooth fades, parallax where appropriate; never distracting
- **Typography-forward** — large, expressive type carries the identity; used sparingly
- **Dark theme:** cinematic — near-black backgrounds, high contrast on imagery, moody atmosphere
- **Light theme:** editorial/print — off-white, clean negative space, gallery-wall feeling
- **No generic patterns** — no cards with drop shadows, no rounded-everything, no stock portfolio layouts

## Theme System

- Library: `next-themes`
- Strategy: `attribute="class"` on `<html>`
- Default: `system` (auto-detects OS preference, no flash on load)
- Toggle: icon-only button (sun/moon) in the navigation — no label
- Persist user selection in localStorage (handled automatically by `next-themes`)

## Design Variants

The site ships with **3 distinct design variants** so the client can compare and choose. A variant switcher UI element (separate from the light/dark toggle) lets the viewer cycle between them in real time.

**Purpose:** client preview and selection — the chosen variant becomes the final production design.

**Architecture:**
- Active variant stored in a `data-design` attribute on `<html>` (e.g. `data-design="v1"`)
- Each variant is a set of CSS custom properties scoped to `[data-design="v1"]` etc.
- Light/dark theme and design variant are fully independent — each variant works in both themes
- Variant choice persisted in `localStorage` alongside theme preference
- Switcher component: small, unobtrusive — positioned bottom-right or top-right of nav, labeled `V1 / V2 / V3`
- **Extensible by design** — adding V4 means adding a CSS block and a new switcher option; no structural changes needed

**The 3 variants:**
| Variant | File | Personality |
|---|---|---|
| V1 | `designs/v1-minimal.md` | Ultra-minimal, raw, lots of negative space |
| V2 | `designs/v2-cinematic.md` | Dark, moody, full-bleed imagery, dramatic type |
| V3 | `designs/v3-editorial.md` | Magazine/editorial, structured grid, refined typography |

Each variant's full spec (colors, fonts, spacing, animation style, layout details) lives in its own file under `designs/`. CLAUDE.md does not duplicate that detail here.

## Responsive Breakpoints

Mobile-first. Three layouts:
- **Mobile:** < 640px — single column, stacked nav
- **Tablet:** 640–1024px — 2-column gallery, horizontal nav
- **Desktop:** > 1024px — 3-column gallery, full nav

## Site Structure (Single Page, Anchor Nav)

```
/ (single page)
├── #hero          — Full-viewport atmospheric opener: name + role, minimal type, entrance animation
├── #photography   — Main gallery: filterable photo grid, the heart of the site
├── #video         — Video work: embedded YouTube, cinematic presentation
├── #design        — 2D / graphic design work: poster and illustration grid
└── #info          — Bottom of page: short one-line bio, email, Instagram — nothing more
```

**What this site is not:** a résumé. No skills, no career timeline, no awards section, no education. Viewers are here to experience the work.

**Branding rule — studio over person:** The site presents **Grang Studio** as the brand, not Kang Bosun as an individual. The photographer's name appears only once, in the minimal Info section at the bottom. Everywhere else — hero, nav wordmark, page title, metadata — the identity is "Grang Studio". Do not foreground the person's name in any section heading, hero, or prominent UI element.

Navigation: wordmark left, section links center, theme toggle right. Links scroll to anchors smoothly. Active section indicated subtly (not aggressively highlighted).

## Portfolio Content

### Photography Projects

All source images are in `notion_export/bosun_portfolio/non_folderized/`.
When building, copy to `public/images/<category>/` using clean English filenames.
Prefer `_크게` (large) versions over `_복사` (copy) versions where both exist.

| Category | Key | Image Count | Description |
|---|---|---|---|
| Cosmetics | `cosmetics` | 12 | Beauty/skincare product photography |
| Watch | `watch` | 5 | Watch product shots incl. PRX model |
| Glass | `glass` | 3 | Perfume bottles, glass objects |
| Glasses Cutout | `glasses` | 3 | Clean background eyewear shots |
| Vase | `vase` | 2 | Still life |
| Portrait | `portrait` | 6 | 3 subjects, large + web-res pairs |
| Light Painting | `light-painting` | 5 | Long exposure light art |
| AI Work | `ai-work` | 4 | AI-generated portrait composites |
| Fine Art | `fine-art` | 7 | Fine art series (순수_강보선 + behind) |
| Assignment | `assignment` | 4 | University assignment work |
| Airbnb Interior | `airbnb` | 5 | Airbnb listing interior photography |
| RISE Campus Interior | `rise-interior` | 5 | Language school campus |
| RISE Website Images | `rise-website` | 10 | Commercial: students, teachers, classrooms |

**Gallery groupings for UI filter tabs:**
- All
- Product (cosmetics, watch, glass, glasses, vase)
- Portrait
- Fine Art (fine-art, light-painting, ai-work, assignment)
- Interior (airbnb, rise-interior, rise-website)

### Video Projects

Embed via `youtube-nocookie.com`. Show as cards with thumbnail + title + year.

| Title | YouTube URL | Year |
|---|---|---|
| RISE Campus Tour | https://www.youtube.com/playlist?list=PLRwWCXTQW9LmoaKsVpJ91k8QDC94L4oi4 | — |
| RISE 학부모 인터뷰 (Parent Interview) | https://www.youtube.com/watch?v=cwtHU1EBCYU | — |
| RISE 학부모 강연 스케치 (Lecture Sketch) | https://youtu.be/QNbOoEFlRXY | 2024 |
| 롯데월드 가을 시즌 홍보영상 (Lotte World Autumn) | — | 2024 |
| 롯데월드 겨울 시즌 홍보영상 (Lotte World Winter) | — | 2024 |
| RISE 온라인 영어 강의 47편 (Online Lectures) | — | 2022 |

### 2D Design / Illustration

| Title | Images | Notes |
|---|---|---|
| Christmas Event Poster | 포스터.png, 포스터-2.png, 포스터-3.png, 포스터-4.png | Lotte World event |
| Lotte World Theater Thumbnails | image.png, image 1.png, image 2.png | YouTube thumbnails |
| No Seat Saving Banner | image 3.png | Lotte World signage |

### Awards

| Title | URL | Year | Host |
|---|---|---|---|
| 희망리턴패키지 59초 영화제 3등 (59-sec Film, 3rd place) | https://youtube.com/shorts/IIzokW_guBs | 2023 | 소상공인진흥공단 |
| 공주시 홍보영상 장려상 (Gongju City Promo, Honorable Mention) | https://youtu.be/JSfTl92wm8w | 2020 | 공주시 |
| 인생백화점 1등 (Life Department Store, 1st place) | https://youtu.be/dJSKauRC10Q | 2022 | 성동구청 |

### Info Section (bottom of page — minimal)

Only these elements appear on the site:
- **Name:** Kang Bosun
- **Role:** Photographer & Video Director
- **Bio (one line):** Visual storyteller based in Seoul, specializing in brand and content direction.
- **Email:** wolfkang0514@naver.com

Nothing else. No skills, no career history, no education, no awards on the site.

## Directory Structure

```
/
├── CLAUDE.md
├── notion_export/          # Source assets — do not modify
│   └── bosun_portfolio/
│       └── non_folderized/ # All raw images here
├── public/
│   ├── images/             # Organized project images (copy from non_folderized)
│   │   ├── cosmetics/
│   │   ├── watch/
│   │   ├── glass/
│   │   ├── glasses/
│   │   ├── vase/
│   │   ├── portrait/
│   │   ├── light-painting/
│   │   ├── ai-work/
│   │   ├── fine-art/
│   │   ├── assignment/
│   │   ├── airbnb/
│   │   ├── rise-interior/
│   │   ├── rise-website/
│   │   └── design/
│   └── profile/            # Profile photo
└── src/
    ├── app/                # Next.js App Router
    │   ├── layout.tsx
    │   ├── page.tsx        # Single page — all sections
    │   └── globals.css
    ├── components/
    │   ├── layout/         # Nav, Footer, ThemeToggle
    │   ├── sections/       # Hero, Photography, Video, Design, Info
    │   └── ui/             # Shared primitives (GalleryGrid, VideoCard, etc.)
    ├── lib/
    │   └── portfolio.ts    # All typed content data (projects, videos, awards)
    └── types/
        └── index.ts        # Project, Video, Award, Category types
```

## Content Data Pattern

All portfolio content lives in `src/lib/portfolio.ts` as typed arrays — no CMS needed.

```ts
// Example shape
type Project = {
  id: string
  title: string
  category: Category
  images: string[]   // paths relative to /public/images/
  featured?: boolean
}
```

## Commands

```bash
npm run dev      # local dev server
npm run build    # production build
npm run lint     # ESLint
npm run typecheck # tsc --noEmit
```

## Git Conventions

- Branch: `main`
- Remote: `git@github.com:devheesukang/grangstudio.git`
- Commit format: `type: description` (feat, fix, style, content, refactor, chore)
- Examples: `feat: add photography gallery filter`, `content: add watch project images`

### Commit & Push Workflow

**Commits and pushes only happen during active phase execution — never during planning.**

During a phase, commit + push at every meaningful milestone. Rule of thumb: if a component works independently, commit it. Never batch multiple completed components into one commit.

**Within a phase, commit + push after each:**
- New component is built and renders correctly
- Dependency install or config change
- Image organization batch (per category)
- Content data file created or updated

**Always push immediately after committing:**
```bash
git add <specific files>
git commit -m "type: description

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
git push
```

Never use `git add .` or `git add -A` — always stage specific files to avoid accidentally committing sensitive files or build artifacts.

## Deployment

- Platform: Vercel
- Auto-deploy on push to `main`
- No environment variables required at launch (no CMS, no auth)

## Build Phases

Phases are completed sequentially. Each ends with a git commit. Check off tasks as done.

### Phase 1 — Foundation [x]
> Goal: establish the full visual and technical base. Everything else inherits from this.

- [x] Scaffold Next.js 14+ project (`npx create-next-app@latest .` — TypeScript, Tailwind, App Router, src dir)
- [x] Add `notion_export/` to `.gitignore` (98MB source dump — not for version control)
- [x] Install dependencies: `next-themes`, `framer-motion`
- [x] Implement design variant system: `data-design` attribute on `<html>`, CSS custom properties per variant, `localStorage` persistence
- [x] Configure Tailwind: custom font variables, color tokens scoped per variant + theme, base spacing scale
- [x] Set up `next-themes` provider in root layout, `attribute="class"`, default `system`
- [x] Define global CSS: font imports for all 3 variants, CSS custom properties for all variant × theme combinations
- [x] Build `Nav` component: logo/wordmark left, anchor links center, theme toggle + variant switcher right — responsive (hamburger on mobile)
- [x] Build `ThemeToggle` component: sun/moon icon only, no label
- [x] Build `VariantSwitcher` component: V1 / V2 / V3 labels, cycles variants, persists to localStorage
- [x] Build `Footer` component: minimal — name, year, email
- [x] Verify light/dark + all 3 variants work in combination, no flash on load
- [x] Commit + push: `feat: phase 1 — foundation, theme system, design variants`

### Phase 2 — Hero [x]
> Checkpoint: review design direction before building remaining sections.

- [x] Build `Hero` section: full-viewport, atmospheric, name + role in large type, entrance animation
- [x] Confirm scroll transition from Hero into the next section feels intentional
- [x] Confirm responsive layout on mobile / tablet / desktop
- [x] Confirm light/dark rendering feels right (cinematic dark / editorial light)
- [x] **User review checkpoint** — approved: "Grang Studio" branding applied across all three variants
- [x] Commit: `feat: phase 2 — hero section`

### Phase 3 — Photography Gallery [x]
> Most complex phase. Requires image organization before wiring up the gallery.

- [x] Organize images: copy from `notion_export/bosun_portfolio/non_folderized/` into `public/images/<category>/` with clean English filenames (prefer `_크게` versions)
- [x] Write `src/lib/portfolio.ts`: typed `Project[]` array with all 13 photo categories, image paths, titles
- [x] Build `Photography` section with filter tab bar (All / Product / Portrait / Fine Art / Interior)
- [x] Build `GalleryGrid` component: responsive masonry or CSS grid (1→2→3 col)
- [x] Add scroll-reveal entrance animation on gallery items (Framer Motion)
- [x] Test all 13 categories filter correctly
- [x] Commit: `feat: phase 3 — photography gallery`

### Phase 4 — Video, Design, Info + Polish [x]
> Remaining sections. Bundle together then do final polish pass.

- [x] Build `Video` section: YouTube embed cards (`youtube-nocookie.com`), cinematic presentation, responsive
- [x] Build `Design` section: poster and illustration image grid
- [x] Build `Info` section: one-line bio, email — absolute minimum, bottom of page
- [x] Global scroll experience polish: section transitions, animation timing, spacing rhythm
- [x] Audit all responsive breakpoints (mobile / tablet / desktop)
- [x] Performance check: `next build`, verify image optimization, no layout shift
- [x] Commit: `feat: phase 4 — video, design, info, polish`

### Phase 5 — Deployment [ ]
- [ ] Connect repo to Vercel
- [ ] Verify production build on Vercel preview URL
- [ ] Set custom domain if available
- [ ] Commit: `chore: production deployment setup`

---

## Notes

- `notion_export/` is source-only — never import from it directly in the app
- All UI text in English; Korean appears only in alt text or metadata where helpful for SEO
- The studio name "Grang Studio" comes from 봉사활동 동아리 그랑 (volunteer club "Grang") which Bosun ran 2015–2022 — it's personal and meaningful
