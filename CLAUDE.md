# Studio Grang — Portfolio Website

## Project Overview

Personal portfolio website for **Kang Bosun (강보선)**, photographer and video director, operating under the studio name **Studio Grang**. The site is a showcase for potential clients and companies to view her work.

- **Site name:** Studio Grang
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
| Variant | File | Personality | Display Font | Accent |
|---|---|---|---|---|
| V1 | `designs/v1-minimal.md` | Cinematic / Gold — dark/moody, Bebas, dramatic scale | Bebas Neue | Gold `#C8A96E` |
| V2 | `designs/v2-cinematic.md` | Embers / Copper — warm earth tones, copper accent | Bebas Neue | Copper `#C1714A` |
| V3 | `designs/v3-editorial.md` | Slate / Contemporary — geometric Syne font, cool slate-blue | Syne | Slate `#6B8CAE` |

**Hero image rule:** All three variants use `public/images/cosmetics/foundation-1.jpg` as a subtle full-bleed background (opacity ≈ 0.12). Placed with `next/image fill + object-cover + priority`, `absolute inset-0`. It is atmospheric texture, not a dominant image — type and content remain primary.

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

**Branding rule — studio over person:** The site presents **Studio Grang** as the brand, not Kang Bosun as an individual. The photographer's name appears only once, in the minimal Info section at the bottom. Everywhere else — hero, nav wordmark, page title, metadata — the identity is "Studio Grang". Do not foreground the person's name in any section heading, hero, or prominent UI element.

Navigation: wordmark left, section links center, theme toggle right. Links scroll to anchors smoothly. Active section indicated subtly (not aggressively highlighted).

## Portfolio Content

### Photography Projects

All source images are in `notion_export/bosun_portfolio/non_folderized/`.
When building, copy to `public/images/<category>/` using clean English filenames.
Prefer `_크게` (large) versions over `_복사` (copy) versions where both exist.

| Category | Key | Image Count | Description |
|---|---|---|---|
| Cosmetics | `cosmetics` | 11 | Beauty/skincare product photography |
| Still Life | `still-life` | 15 | Watches, light painting, personal work, vases |
| Food | `food` | 3 | Food & beverage still life |
| Portrait | `portrait` | 8 | Portrait subjects, large + web-res |
| AI Work | `ai-work` | 4 | AI-generated portrait composites |
| Fine Art | `fine-art` | 5 | Fine art series (순수_강보선) |
| Interior | `interior` | 7 | Airbnb + RISE campus merged |
| RISE Website Images | `rise-website` | 10 | Commercial: students, teachers, classrooms |

**Gallery groupings for UI filter tabs:**
- All
- Still Life (cosmetics, still-life, food) — filter key: `product`
- Portrait
- Fine Art (fine-art only)
- AI (ai-work) — filter key: `ai`
- Interior (interior, rise-website)

### Video Projects

Embed via `youtube-nocookie.com`. Show as cards with thumbnail + title + year.

| Title | YouTube IDs | Year |
|---|---|---|
| RISE Campus Tour | playlist: PLRwWCXTQW9LmoaKsVpJ91k8QDC94L4oi4; ids: NIfNigY9BTM, SpHT7xw2H_8, 40CKVKMa0GM, zYayAeEKgVU, ZsN0wKJjzwk, lwX0TnVOSIo, sPqSIZe9ZWA | — |
| RISE 학부모 인터뷰 (Parent Interview) | SII47SSbrQ4, ocwCbBGUd3E, _xhvE1EbZlI, Bii3D2FXJgU, _ACOgVSNbFw | — |
| RISE 학부모 강연 스케치 (Lecture Sketch) | QNbOoEFlRXY | 2024 |
| 롯데월드 가을 시즌 홍보영상 (Lotte World Autumn) | 2nlyITLXdY0, opO4k4Wro9U, xL1va8khc-c | 2024 |
| 롯데월드 겨울 시즌 홍보영상 (Lotte World Winter) | AtQdyh_kXz0, 2NIGykeWHKg, UeEYKEIezi8, X5-gw-XTbiI | 2024 |
| RISE 온라인 영어 강의 47편 (Online Lectures) | zbGUMiUtid0 | 2022 |
| AI 활용 2D 그래픽 영상 제작 (AI-Assisted 2D Graphic Video) | 1GEKvSYF1qU | 2024 |

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
│   ├── images/             # Organized project images (copy from notion_export)
│   │   ├── cosmetics/
│   │   ├── still-life/
│   │   ├── food/
│   │   ├── portrait/
│   │   ├── ai-work/
│   │   ├── fine-art/
│   │   ├── interior/
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

**Before every commit during a phase:**
1. Tick the completed checklist items in CLAUDE.md (`[ ]` → `[x]`)
2. Stage CLAUDE.md alongside the other changed files
3. The commit message should reflect what was just completed

**Always push immediately after committing:**
```bash
git add <specific files> CLAUDE.md
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
- [x] **User review checkpoint** — approved: "Studio Grang" branding applied across all three variants
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

### Phase 5 — Deployment [x]
- [x] Connect repo to Vercel
- [x] Verify production build on Vercel preview URL
- [x] Commit: `chore: production deployment setup`

### Phase 6 — Client Edit Round 1 [x]
> Goal: apply first round of client-requested changes across design variants, gallery, and contact info.

**Variant rotation & new designs:**
- [x] Rotate variants: old V2 (Cinematic/Bebas/Gold) → new V1. Retire old V1 (Cormorant/Minimal) and V3 (Playfair/Editorial).
- [x] New V2 — "Embers" (Copper/Rust): Bebas Neue display + DM Sans body, accent `#C1714A`, light bg `#F6F1EC`, dark bg `#100907`
- [x] New V3 — "Slate" (Contemporary): **Syne** display (new font import) + DM Sans body, accent `#6B8CAE`, light bg `#F3F4F7`, dark bg `#080B10`
- [x] Add `Syne` to `src/app/layout.tsx` via `next/font/google`, expose as `--font-syne` variable
- [x] Update `src/app/globals.css`: rewrite all three `[data-design]` blocks with new palettes and font references
- [x] Update `src/components/sections/Hero.tsx`: old HeroV2 → HeroV1, write new HeroV2 (Embers) and HeroV3 (Slate)
- [x] Update `designs/` spec files to reflect new variant personalities
- [x] Commit: `feat: rotate design variants — V1=cinematic-gold, V2=embers, V3=slate`

**Hero background image:**
- [x] Add `foundation-1.jpg` (`public/images/cosmetics/foundation-1.jpg`) as a subtle full-bleed background to all three hero variants
- [x] Use `next/image` with `fill` + `object-cover`, `priority` prop, opacity ≈ 0.12 (atmospheric, not dominant)
- [x] Place image layer behind all content divs using `absolute inset-0`
- [x] Commit: `feat: add hero background image to all variants`

**Gallery — filter labels & AI category:**
- [x] `src/lib/portfolio.ts`: rename `FILTER_LABELS.product` from `'Product'` → `'Still Life'`
- [x] `src/lib/portfolio.ts`: add `'ai'` to `FilterGroup` type and `FILTER_GROUPS`, add `FILTER_LABELS.ai: 'AI'`
- [x] `src/lib/portfolio.ts`: change `ai-work` project's `filterGroup` from `'fine-art'` → `'ai'`
- [x] `src/components/sections/Photography.tsx`: add `'ai'` to `FILTER_GROUPS` array (it reads the array to render tabs — no other change needed)
- [x] Commit: `feat: add AI filter tab, rename Product to Still Life`

**Gallery — hide behind images:**
- [x] `src/lib/portfolio.ts`: remove `fine-art-behind-1.jpg` and `fine-art-behind-2.jpg` from the `fine-art` project's `images` array (files stay on disk)
- [x] Commit: `content: hide fine-art behind images from gallery`

**Photography section — bigger text:**
- [x] `src/components/sections/Photography.tsx`: increase section label from `text-[9px]` to `text-xs` or `text-sm`
- [x] Increase filter button font from `text-[10px]` to `text-xs`, increase padding (`px-5 py-2` or similar)
- [x] Commit: `style: larger photography section heading and filter buttons`

**Info section — contact details:**
- [x] `src/components/sections/Info.tsx`: add `lowercase` class (or `style={{ textTransform: 'lowercase' }}`) to email `<a>` element
- [x] Add phone number `010-6401-0514` below email, same minimal style
- [x] Add Instagram row: gray Instagram SVG icon + `studio.grang` handle as `<a href="https://www.instagram.com/studio.grang/" target="_blank" rel="noopener noreferrer">`, hover opacity
- [x] Commit: `feat: info section — lowercase email, phone, Instagram link`

**Image download protection:**
- [x] `src/components/ui/GalleryGrid.tsx`: add `onContextMenu={(e) => e.preventDefault()}` to each gallery item wrapper
- [x] Add `draggable={false}` to each `<Image>` component
- [x] Add transparent overlay `<div>` (`position: absolute, inset: 0, z-index: 1`) on each gallery item to intercept pointer events
- [x] Note: this is a deterrent — motivated users can still access images via DevTools
- [x] Commit: `feat: block right-click image download in gallery`

**CLAUDE.md update:**
- [x] Update variant table to reflect V1=Cinematic/Gold, V2=Embers/Copper, V3=Slate/Syne
- [x] Update gallery groupings table: Product → Still Life, add AI row
- [x] Update hero image rule: all variants now use `foundation-1.jpg` as subtle background
- [x] Commit: `chore: update CLAUDE.md for Phase 6 changes`

### Phase 7 — Client Edit Round 2 [x]
> Goal: investigate and prepare second round of client-requested visual fixes. Do not apply code changes until approved.

**Gallery — AI filter layout:**
- [x] Root cause: all 4 AI images are `768x1344`, very tall portrait images. Current `GalleryGrid` uses CSS columns/masonry (`columns-3`), which balances column heights instead of forcing row-by-row placement.
- [x] With 4 equal-height tall items in 3 masonry columns, the browser can visually distribute them as 2 stacked images in one column and 2 stacked images in another, leaving the third column empty. This makes the AI filter look like 2 images per row even though the 3-column style exists.
- [x] Fix: switch `GalleryGrid` from CSS columns to CSS grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`) so the AI filter shows 3 images on the first row and 1 image on the second row.
- [x] Tradeoff: CSS grid forces row-based layout and may reduce the masonry height variation that other gallery filters currently have.
- [x] Alternative considered: keep masonry and add more AI images so the 3-column masonry distribution has enough items to fill out naturally.

**Hero background image visibility:**
- [x] Current issue: `public/images/cosmetics/foundation-1.jpg` is too invisible at the current subtle opacity (`opacity-[0.12]`).
- [x] Fix: increase hero background opacity to `opacity-[0.52]`.
- [x] Add an image-layer fade/mask toward the bottom so the image remains more visible through the main hero area but becomes more hidden behind the bottom gradient / large "Studio Grang" text area.

**V1 dark mode text contrast:**
- [x] Current issue: "Photography & Video Direction" in V1 dark mode is almost invisible because the font is thin and the muted color reads too faint.
- [x] Current issue: the small "Photography" label above the filter buttons and inactive filter button text are also too invisible in V1 dark mode.
- [x] Fix: update V1 dark mode muted text color from `#999999` to `#C0C0C0`.
- [x] Fix: update V1 dark mode line/border color from `#1A1A1A` to `#333333` so inactive filter buttons have clearer borders.
- [x] Ensure light/dark theme changes continue to use appropriate gray values per theme instead of one fixed color.

**Info section typography:**
- [x] Increase info section font sizes, including Photographer & Video Director, email, phone number, and Instagram handle.
- [x] Commit: `fix: phase 7 client edit round 2`

### Phase 8 — Notion v2 Content Update [x]
> Source: `notion_export/portfolio_v2/notion1/only_pics/` (new Notion export).
> Goal: restructure photography categories, add new images, update video data to match v2.
> Do NOT make any code changes until this phase is explicitly started.

#### Summary of changes

The v2 Notion export introduces a major reorganization: many old sub-categories are collapsed into broader groups, two new categories are added (`still life` and `food`), two new portrait images are added, cosmetics gains two new images, and all video entries now have individual YouTube IDs (some have multiple per project). The old `watch`, `glass`, `glasses`, `vase`, `light-painting`, and `assignment` categories are retired as separate public folders; their images are redistributed.

---

#### A. Photography — files deleted from the site (not present in v2 source)

These files are **removed from `public/images/`** and from `portfolio.ts`. They exist in `notion_export/bosun_portfolio/non_folderized/` but were dropped from the v2 Notion export.

| File deleted from `public/images/` | Korean source (v1) | Reason |
|---|---|---|
| `glasses/glasses-1.jpg` | `안경.jpg` | Eyewear category removed from v2 entirely |
| `glasses/glasses-2.jpg` | `안경2.jpg` | Eyewear category removed from v2 entirely |
| `glasses/sunglasses.jpg` | `선글라스.jpg` | Eyewear category removed from v2 entirely |
| `watch/watch-prx.jpg` | `prx_복사본.jpg` | PRX model dropped from still life in v2 |
| `airbnb/bedroom-2.jpeg` | `침실3_크게.jpeg` | Only 1 bedroom survives in merged interior |
| `airbnb/bedroom-3.jpeg` | `침실8_크게.jpeg` | Only 1 bedroom survives in merged interior |
| `airbnb/bedroom-4.jpeg` | `침실14_크게.jpeg` | Only 1 bedroom survives in merged interior |
| `glass/glass-still.jpg` | unknown | Not referenced in v2 Notion categories |
| `glass/perfume-1.png` | `향수1.png` | Moved to Cosmetics in v2 (Phase 8 handles the re-copy) |
| `cosmetics/` — 3 files TBD | `tjstmxlr.jpg`, `선크림.jpg`, `오브제파데3.jpg` | Replaced by updated versions in v2; exact English filename mapping to be confirmed during Phase 8 execution |

**`portfolio.ts` entries affected (image files stay on disk — only removed from arrays/projects):**
- `glasses` project: **removed entirely** from `projects` array (files stay in `public/images/glasses/`)
- `watch` project: remove `'/images/watch/watch-prx.jpg'` from images array (file stays on disk)
- `airbnb` project: remove `bedroom-2.jpeg`, `bedroom-3.jpeg`, `bedroom-4.jpeg` from images array (files stay on disk)
- `glass` project: remove `'/images/glass/glass-still.jpg'` from images array (file stays on disk; perfume-1.png stays referenced until Phase 8 full migration)

---

#### B. Photography — retired category folders (removed after images migrated to new structure)

The following `public/images/` sub-folders will be **fully deleted** once Phase 8 completes:

| Old folder | Images | Destination |
|---|---|---|
| `watch/` | watch-1.png, watch-2.jpg, watch-3.png, watch-4.jpg | → `still-life/` |
| `glass/` | glass-bottle.jpg, perfume-1.png | → `food/` and `cosmetics/` respectively |
| `glasses/` | *(all 3 deleted — see section A)* | removed |
| `vase/` | vase-1.jpeg, vase-2.jpeg | → `still-life/` |
| `light-painting/` | light-painting-1..5.jpeg | → `still-life/` |
| `assignment/` | assignment-1..4.jpeg | → `still-life/` (개인작업 images) |
| `airbnb/` | bedroom-1.jpeg, kitchen.jpeg | → `interior/` (bedroom-2..4 deleted) |
| `rise-interior/` | front-desk.jpeg, hallway.jpeg, library.jpeg, library-3.jpeg, restroom.jpeg | → `interior/` (all 5 survive) |

---

#### B. Photography — new and updated categories

**NEW: `public/images/still-life/`**
Copy from `notion_export/portfolio_v2/notion1/only_pics/` using these clean names:

| Source filename | Destination |
|---|---|
| `시계.png` | `still-life/watch-1.png` |
| `시계_복사.jpg` | `still-life/watch-2.jpg` |
| `시계2.png` | `still-life/watch-3.png` |
| `시계_복사1.jpg` | `still-life/watch-4.jpg` |
| `라이트페인팅1.jpeg` | `still-life/light-painting-1.jpeg` |
| `라이트페인팅2.jpeg` | `still-life/light-painting-2.jpeg` |
| `라이트페인팅3.jpeg` | `still-life/light-painting-3.jpeg` |
| `라이트페인팅4_크게.jpeg` | `still-life/light-painting-4.jpeg` |
| `라이트페인팅5.jpeg` | `still-life/light-painting-5.jpeg` |
| `개인작업_크게_2.jpeg` | `still-life/personal-work-1.jpeg` |
| `개인작업_크게.jpeg` | `still-life/personal-work-2.jpeg` |
| `개인작업1_크게.jpeg` | `still-life/personal-work-3.jpeg` |
| `개인작업2_크게.jpeg` | `still-life/personal-work-4.jpeg` |
| `화병_복사2_크게.jpeg` | `still-life/vase-1.jpeg` |
| `화병2(1)_복사2_크게.jpeg` | `still-life/vase-2.jpeg` |

**NEW: `public/images/food/`**
Copy from `notion_export/portfolio_v2/notion1/only_pics/`:

| Source filename | Destination |
|---|---|
| `Capture_One_Catalog0111_복사본_크게.jpeg` | `food/food-1.jpeg` |
| `still_2x_비율.jpg` | `food/food-2.jpg` |
| `유리병_복사.jpg` | `food/food-3.jpg` |

**NEW: `public/images/interior/`** (merges old airbnb + rise-interior)
Copy from `notion_export/portfolio_v2/notion1/only_pics/` — all are already in `public/images/` under old names:

| Source filename | Destination | Old location |
|---|---|---|
| `부엌3_크게.jpeg` | `interior/kitchen.jpeg` | airbnb/kitchen.jpeg |
| `침실4_크게.jpeg` | `interior/bedroom.jpeg` | airbnb/bedroom-1.jpeg |
| `프론트_크게.jpeg` | `interior/front-desk.jpeg` | rise-interior/front-desk.jpeg |
| `도서관_크게.jpeg` | `interior/library.jpeg` | rise-interior/library.jpeg |
| `복도_크게.jpeg` | `interior/hallway.jpeg` | rise-interior/hallway.jpeg |
| `도서관3_크게.jpeg` | `interior/library-3.jpeg` | rise-interior/library-3.jpeg |
| `세면대_크게.jpeg` | `interior/restroom.jpeg` | rise-interior/restroom.jpeg |

Note: `부엌3_크게.jpeg` appears twice in the source md (duplicate entry) — copy once only.

**UPDATED: `public/images/cosmetics/`** — 2 new images added (12 → 14):

| Source filename | Destination |
|---|---|
| `화장품.jpg` | `cosmetics/cosmetics-full.jpg` |
| `향수1.png` | `cosmetics/perfume.png` |

All other cosmetic filenames were already present in v1 under different English names — no re-copy needed.

**UPDATED: `public/images/portrait/`** — 2 new images added (6 → 8):

| Source filename | Destination |
|---|---|
| `IMG_4212_복사2.jpg` | `portrait/portrait-4.jpg` |
| `IMG_5732_복사.jpg` | `portrait/portrait-5.jpg` |

**UNCHANGED:** `fine-art/`, `ai-work/`, `rise-website/`, `design/` — no file changes needed.

---

#### C. `src/lib/portfolio.ts` — category and project changes

**Type changes:**
- `Category` type: remove `'watch' | 'glass' | 'glasses' | 'vase' | 'light-painting' | 'assignment' | 'airbnb' | 'rise-interior'`; add `'still-life' | 'food' | 'interior'`
- `FilterGroup` type: unchanged (`all | product | portrait | fine-art | ai | interior`)
- `VideoProject` type: add `youtubeIds?: string[]` field to support multi-video projects

**Project array — remove these entries entirely:**
- `watch`, `glass`, `glasses`, `vase`, `light-painting`, `assignment`, `airbnb`, `rise-interior`

**Project array — add these new entries:**

```ts
{
  id: 'still-life',
  title: 'Still Life',
  category: 'still-life',
  filterGroup: 'product',
  images: [
    '/images/still-life/watch-1.png',
    '/images/still-life/watch-2.jpg',
    '/images/still-life/watch-3.png',
    '/images/still-life/watch-4.jpg',
    '/images/still-life/light-painting-1.jpeg',
    '/images/still-life/light-painting-2.jpeg',
    '/images/still-life/light-painting-3.jpeg',
    '/images/still-life/light-painting-4.jpeg',
    '/images/still-life/light-painting-5.jpeg',
    '/images/still-life/personal-work-1.jpeg',
    '/images/still-life/personal-work-2.jpeg',
    '/images/still-life/personal-work-3.jpeg',
    '/images/still-life/personal-work-4.jpeg',
    '/images/still-life/vase-1.jpeg',
    '/images/still-life/vase-2.jpeg',
  ],
},
{
  id: 'food',
  title: 'Food',
  category: 'food',
  filterGroup: 'product',
  images: [
    '/images/food/food-1.jpeg',
    '/images/food/food-2.jpg',
    '/images/food/food-3.jpg',
  ],
},
{
  id: 'interior',
  title: 'Interior',
  category: 'interior',
  filterGroup: 'interior',
  images: [
    '/images/interior/kitchen.jpeg',
    '/images/interior/bedroom.jpeg',
    '/images/interior/front-desk.jpeg',
    '/images/interior/library.jpeg',
    '/images/interior/hallway.jpeg',
    '/images/interior/library-3.jpeg',
    '/images/interior/restroom.jpeg',
  ],
},
```

**Project array — update existing entries:**

- `cosmetics` images: add `'/images/cosmetics/cosmetics-full.jpg'` and `'/images/cosmetics/perfume.png'` at end of array
- `portrait` images: add `'/images/portrait/portrait-4.jpg'` and `'/images/portrait/portrait-5.jpg'` at end of array
- `rise-website` filterGroup: change from `'interior'` → keep `'interior'` (unchanged)

**`FILTER_LABELS`:** The label for `product` is already `'Still Life'` — no change needed.

---

#### D. Video — updates to `src/lib/portfolio.ts`

The `VideoProject` type needs a new optional field:
```ts
youtubeIds?: string[]  // for projects with multiple individual videos
```

**Updated video entries:**

| Entry | Change |
|---|---|
| RISE Campus Tour | Add `youtubeIds: ['NIfNigY9BTM', 'SpHT7xw2H_8', '40CKVKMa0GM', 'zYayAeEKgVU', 'ZsN0wKJjzwk', 'lwX0TnVOSIo', 'sPqSIZe9ZWA']`; keep `playlistId` |
| RISE Parent Interview | Replace `youtubeId: 'cwtHU1EBCYU'` with `youtubeIds: ['SII47SSbrQ4', 'ocwCbBGUd3E', '_xhvE1EbZlI', 'Bii3D2FXJgU', '_ACOgVSNbFw']` |
| Lotte World Autumn | Add `youtubeIds: ['2nlyITLXdY0', 'opO4k4Wro9U', 'xL1va8khc-c']`; remove single `youtubeId` |
| Lotte World Winter | Add `youtubeIds: ['AtQdyh_kXz0', '2NIGykeWHKg', 'UeEYKEIezi8', 'X5-gw-XTbiI']`; remove single `youtubeId` |
| RISE Lecture Sketch | Unchanged |
| RISE Online Lectures | Unchanged |
| **NEW** | Add entry: `{ id: 'ai-2d-video', title: 'AI-Assisted 2D Graphic Video', titleKo: 'AI 활용 2D 그래픽 영상 제작', year: '2024', youtubeId: '1GEKvSYF1qU' }` |

For multi-video projects, the Video section UI will need to handle `youtubeIds` — show the first video as the primary embed, or show a scrollable set of thumbnails. Decide on approach during implementation.

---

#### E. `src/components/sections/Photography.tsx` — filter tab update

The `FILTER_GROUPS` array in `Photography.tsx` currently includes tabs: `all | product | portrait | fine-art | ai | interior`. No tab label changes needed — `'Still Life'` and `'Interior'` labels stay. The new `still-life`, `food`, and `interior` categories already map to the correct existing `filterGroup` values (`product` and `interior`).

---

#### F. CLAUDE.md — documentation updates after phase completes

- Update Portfolio Content table (remove retired categories, add still-life and food rows)
- Update Gallery groupings: Still Life now covers (cosmetics, food, still-life); Fine Art covers (fine-art only); Interior covers (interior, rise-website)
- Update Video Projects table with new IDs

---

#### Checklist

**Image files (copy from `notion_export/portfolio_v2/notion1/only_pics/` — files stay on disk, never deleted):**
- [x] Copy 15 new images to `public/images/still-life/`
- [x] Copy 3 new images to `public/images/food/`
- [x] Copy 7 new images to `public/images/interior/`
- [x] Copy 2 new images to `public/images/cosmetics/` (화장품.jpg → cosmetics-full.jpg, 향수1.png → perfume.png)
- [x] Copy 2 new images to `public/images/portrait/` (IMG_4212_복사2.jpg → portrait-4.jpg, IMG_5732_복사.jpg → portrait-5.jpg)
- [x] Commit: `content: notion v2 — copy new images`

**`src/lib/portfolio.ts` — deletions from arrays (files stay on disk):**
- [x] Remove `glasses` project entry entirely from `projects` array
- [x] Remove `'/images/watch/watch-prx.jpg'` from `watch` project images array
- [x] Remove `'/images/airbnb/bedroom-2.jpeg'`, `bedroom-3.jpeg`, `bedroom-4.jpeg` from `airbnb` project images array
- [x] Remove `'/images/glass/glass-still.jpg'` from `glass` project images array
- [x] Identify and remove the 3 deprecated cosmetics files (tjstmxlr.jpg → cosmetic-3.jpg, 선크림.jpg → sunscreen-1.jpg, 오브제파데3.jpg → foundation-2.jpg) from `cosmetics` images array

**`src/lib/portfolio.ts` — type and project additions:**
- [x] Update `Category` type: add `'still-life' | 'food' | 'interior'`
- [x] Add `youtubeIds?: string[]` to `VideoProject` type
- [x] Add `still-life` project entry
- [x] Add `food` project entry
- [x] Add `interior` project entry (replaces retired `airbnb` and `rise-interior` entries)
- [x] Update `cosmetics` images array with 2 new images
- [x] Update `portrait` images array with 2 new images
- [x] Update video entries with new/multiple YouTube IDs
- [x] Add new `ai-2d-video` entry to `videos` array
- [x] Commit: `content: notion v2 — restructure portfolio.ts categories and videos`

**UI:**
- [x] Update Video section component to handle `youtubeIds` array (multi-video display)
- [x] Commit: `feat: video section — support multi-video projects`

**Cleanup (old folder entries retired from `portfolio.ts` — files remain on disk):**
- [x] Remove `watch`, `glass`, `glasses`, `vase`, `light-painting`, `assignment`, `airbnb`, `rise-interior` project entries once their content is fully migrated into new entries
- [x] Update CLAUDE.md content tables to reflect new category structure
- [x] Commit: `content: notion v2 — update CLAUDE.md content tables`

---

## Notes

- `notion_export/` is source-only — never import from it directly in the app
- All UI text in English; Korean appears only in alt text or metadata where helpful for SEO
- The studio name "Studio Grang" comes from 봉사활동 동아리 그랑 (volunteer club "Grang") which Bosun ran 2015–2022 — it's personal and meaningful
- `npx plugins add vercel/vercel-plugin` run this for vercel plugin. also check for other mcp server or any add ons that would help for this project managment.
