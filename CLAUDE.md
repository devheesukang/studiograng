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

Source images for v2: `notion_export/portfolio_v2/notion1/only_pics/`.
When building, copy to `public/images/<category>/` using clean English filenames.

**v2 Notion folder structure** (Photograph section — 8 folders, in display order):
1. Cosmetics
2. still life
3. food
4. Fine Art
5. Portrait
6. AI Work
7. RISE 어학원 홈페이지 이미지 제작 (`rise-website`)
8. interior

Note: The Notion top-level section was renamed from "Work" → "Photography" in v2.

| Category | Key | Image Count | Description |
|---|---|---|---|
| Cosmetics | `cosmetics` | 14 | Beauty/skincare product photography |
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
| 희망리턴패키지 59초 영화제 3등 수상작 (59-Second Film Festival — 3rd Place) | IIzokW_guBs | 2023 |
| 공주시 홍보영상 장려수상작 (Gongju City Promotional Video) | JSfTl92wm8w | 2020 |
| 인생백화점 1등 수상작 (Life Department Store — 1st Place) | dJSKauRC10Q | 2022 |
| RISE Campus Tour | playlist: PLRwWCXTQW9LmoaKsVpJ91k8QDC94L4oi4; ids: NIfNigY9BTM, SpHT7xw2H_8, 40CKVKMa0GM, zYayAeEKgVU, ZsN0wKJjzwk, lwX0TnVOSIo, sPqSIZe9ZWA | — |
| RISE 학부모 강연 스케치 (Lecture Sketch) | QNbOoEFlRXY | 2024 |
| RISE 학부모 인터뷰 (Parent Interview) | SII47SSbrQ4, ocwCbBGUd3E, _xhvE1EbZlI, Bii3D2FXJgU, _ACOgVSNbFw | — |
| RISE 온라인 영어 강의 47편 (Online Lectures) | zbGUMiUtid0 | 2022 |
| 롯데월드 겨울 시즌 홍보영상 (Lotte World Winter) | AtQdyh_kXz0, 2NIGykeWHKg, UeEYKEIezi8, X5-gw-XTbiI | 2024 |
| 롯데월드 가을 시즌 홍보영상 (Lotte World Autumn) | 2nlyITLXdY0, opO4k4Wro9U, xL1va8khc-c | 2024 |
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

### Phase 9 — Missing Cosmetics Images + Duplicate Fix [x]
> Discovered via size-based audit comparing Notion v2 source against `public/images/`.

**Root causes found:**
- 4 cosmetics images in Notion v2 were never copied to `public/images/cosmetics/` during Phase 8
- `cosmetics-set.jpg` (v1 name) and `cosmetics-full.jpg` (Phase 8 addition) were identical files — same source `화장품.jpg`; duplicate removed from `portfolio.ts`

**Files added to `public/images/cosmetics/`:**

| Source (Notion v2) | Destination | Description |
|---|---|---|
| `세럼_복사2.jpg` | `serum.jpg` | Serum product |
| `비비_복사.jpg` | `bb-cream.jpg` | BB cream product |
| `Capture_One_Catalog01372_복사본_크게.jpeg` | `cosmetics-group.jpeg` | Group cosmetics shot |
| `풀리_썬크림_복사_복사.jpg` | `sunscreen-tube.jpg` | Tube sunscreen |

**`portfolio.ts` changes:**
- Removed `cosmetics-set.jpg` (duplicate of `cosmetics-full.jpg`)
- Added 4 new images: `serum.jpg`, `cosmetics-group.jpeg`, `sunscreen-tube.jpg`, `bb-cream.jpg`
- Reordered cosmetics array to match Notion v2 display order (14 images total)

- [x] Copy 4 missing cosmetics images to `public/images/cosmetics/`
- [x] Remove duplicate `cosmetics-set.jpg` from `portfolio.ts`, add 4 new images in Notion order
- [x] Commit: `content: add 4 missing cosmetics images, fix duplicate`

---

### Phase 10 — Admin CMS
> Goal: give Kang Bosun a private web interface to manage gallery images, videos, filter labels, and info text — without touching code or doing a redeploy.

#### Overview

The admin is a password-protected set of pages at `/admin`. It reads and writes a single `content.json` file stored in **Vercel Blob**. The public site reads this file at request time and merges it over the defaults in `portfolio.ts`. If no Blob config exists yet, the site falls back to `portfolio.ts` with no visible change.

New uploaded images are also stored in Vercel Blob (not in `public/images/`), so the filesystem constraint on Vercel is never an issue.

---

#### What the admin can edit

**Photography section**
- Toggle individual images on/off (show/hide without deleting)
- Drag to reorder images within a category
- Upload new images to a category (goes to Vercel Blob, URL stored in config)
- Toggle entire categories on/off
- Rename filter tab labels (e.g. "Still Life" → anything)
- Reorder filter tabs

**Video section**
- Toggle individual videos on/off
- Drag to reorder videos
- Add a new video entry: title, title (Korean), year, single YouTube ID or multiple YouTube IDs
- Edit an existing video entry's title, year, or IDs
- Delete a video entry

**Info section**
- Edit bio text (one line)
- Edit email address
- Edit phone number
- Edit Instagram handle

**What the admin cannot edit (stays in code)**
- Design variants (V1/V2/V3) and their colors/fonts — these are design decisions, not content
- Hero section copy ("Studio Grang", role subtitle) — brand identity, not user content
- Site structure and layout

---

#### How to access

URL: `yourdomain.com/admin`

A single password form is shown. No username — there is only one admin (Bosun). On correct password, a session cookie is set and the browser is redirected to `/admin/dashboard`.

**Admin pages:**
```
/admin                  → password login form
/admin/dashboard        → overview: links to each section
/admin/photography      → gallery management (toggle, reorder, upload)
/admin/videos           → video management (toggle, reorder, add, edit)
/admin/info             → info section text editor
```

---

#### Security

**Authentication method: password-only, httpOnly session cookie**

- The admin password is stored as an environment variable `ADMIN_PASSWORD` in Vercel (never in the codebase)
- Login: POST to `/api/admin/login` → compares submitted password against `ADMIN_PASSWORD` → on match, sets a signed httpOnly session cookie (JWT signed with `ADMIN_JWT_SECRET` env var) with a 24-hour expiry
- All `/admin/*` routes are protected by Next.js Middleware: if the cookie is missing or expired, redirect to `/admin` (login)
- Logout: DELETE to `/api/admin/logout` clears the cookie, redirects to `/admin`
- Login rate limiting: after 5 failed attempts within 10 minutes from the same IP, the login endpoint returns 429 for 10 minutes (tracked in Vercel Blob or in-memory per function instance)
- No password recovery UI — if password is lost, it is changed via `vercel env` CLI (intentional, keeps attack surface small)

**Environment variables required (set via `vercel env add`):**
```
ADMIN_PASSWORD        — the login password (min 12 chars recommended)
ADMIN_JWT_SECRET      — random 32-byte hex string for signing session tokens
BLOB_READ_WRITE_TOKEN — Vercel Blob token (auto-provisioned when Blob store is added)
```

---

#### Architecture: how data flows

```
Admin page
  ├── Upload image   → POST /api/admin/upload   → Vercel Blob (returns URL)
  ├── Save config    → POST /api/admin/content   → writes content.json to Vercel Blob
  └── Read config    → GET  /api/admin/content   → reads content.json from Vercel Blob

Public site (gallery, video, info sections)
  └── at render time → GET content.json from Vercel Blob → merge over portfolio.ts defaults
```

`content.json` structure stored in Vercel Blob:
```json
{
  "photography": {
    "filterLabels": {
      "product": "Still Life",
      "portrait": "Portrait",
      "fine-art": "Fine Art",
      "ai": "AI",
      "interior": "Interior"
    },
    "filterOrder": ["all", "product", "portrait", "fine-art", "ai", "interior"],
    "projects": [
      {
        "id": "cosmetics",
        "visible": true,
        "images": [
          { "src": "/images/cosmetics/foundation-1.jpg", "visible": true },
          { "src": "https://blob.vercel-storage.com/abc123.jpg", "visible": true }
        ]
      }
    ]
  },
  "videos": [
    {
      "id": "59sec-film",
      "visible": true,
      "order": 0,
      "title": "59-Second Film Festival",
      "titleKo": "희망리턴패키지 59초 영화제 3등 수상작",
      "year": "2023",
      "youtubeId": "IIzokW_guBs"
    }
  ],
  "info": {
    "bio": "Visual storyteller based in Seoul, specializing in brand and content direction.",
    "email": "wolfkang0514@naver.com",
    "phone": "010-6401-0514",
    "instagram": "studio.grang"
  }
}
```

**Key rule:** `portfolio.ts` remains the source of truth for the initial/default state. `content.json` in Blob is a delta — it only overrides what has been explicitly changed. If `content.json` does not exist in Blob, the site renders exactly as it does today with no change.

---

#### Dependencies to add

| Package | Purpose |
|---|---|
| `@vercel/blob` | Read/write Blob storage (images + content.json) |
| `@dnd-kit/core` + `@dnd-kit/sortable` | Drag-to-reorder in admin UI |
| `jose` | Sign and verify JWT session tokens (no heavy auth library) |

---

#### Checklist

**Setup:**
- [ ] Add Vercel Blob store via `vercel env` / Vercel dashboard — get `BLOB_READ_WRITE_TOKEN`
- [ ] Add `ADMIN_PASSWORD` and `ADMIN_JWT_SECRET` to Vercel env vars (all environments)
- [x] Install dependencies: `@vercel/blob`, `@dnd-kit/core`, `@dnd-kit/sortable`, `jose`
- [x] Create `.env.local` with `ADMIN_PASSWORD=1234` (local dev only), `ADMIN_JWT_SECRET`, placeholder `BLOB_READ_WRITE_TOKEN`
- [x] Confirm `.env*` is in `.gitignore` (already present)
- [x] Commit: `chore: add admin dependencies`

**Auth:**
- [x] Create `src/middleware.ts`: protect `/admin/dashboard`, `/admin/photography`, `/admin/videos`, `/admin/info` — redirect to `/admin` if session cookie missing or invalid
- [x] Create `POST /api/admin/login`: verify password, set signed JWT cookie, return 200 or 401
- [x] Create `POST /api/admin/logout`: clear cookie, return 200
- [x] Build `/admin` login page: single password field, submit button, error state
- [x] Create `src/app/admin/layout.tsx`: standalone layout (no portfolio nav/theme), noindex robots
- [x] Commit: `feat: admin auth — password login, session cookie, middleware`

**Content API:**
- [x] Create `GET /api/admin/content`: read `content.json` from Blob; if not found, return merged default from `portfolio.ts`
- [x] Create `POST /api/admin/content`: write updated `content.json` to Blob
- [x] Create `POST /api/admin/upload`: receive image file, upload to Vercel Blob, return public URL
- [x] Create `src/lib/adminContent.ts`: shared helpers — `buildDefaultConfig`, `readContentConfig`, `writeContentConfig`, `getEffectiveConfig`
- [x] Create `src/lib/adminAuth.ts`: shared `verifyAdminSession` helper used by all API routes
- [x] Commit: `feat: admin content API — read/write Blob config, image upload`

**Public site — read from Blob:**
- [x] Update `page.tsx` to async server component — calls `getEffectiveConfig()`, passes data as props to each section
- [x] Update `Photography` section: accept `projects`, `filterLabels`, `filterOrder` as props (no longer imports from `portfolio.ts`)
- [x] Update `Video` section: accept `videos: VideoConfig[]` as props
- [x] Update `Info` section: accept `info: ContentConfig['info']` as props (bio, email, phone, instagram driven by config)
- [x] Set `export const revalidate = 0` on `page.tsx` so Blob config is always fresh
- [x] Commit: `feat: public site reads live config from Vercel Blob`

**Admin UI — Photography:**
- [x] Build `/admin/photography` page: list all categories, each showing its images in order
- [x] Per image: thumbnail preview, visibility toggle, drag handle for reorder
- [x] Per category: visibility toggle, upload button
- [x] Upload button per category: opens file picker, uploads to Blob, appends to category image list
- [x] Filter label editor: inline text inputs for each tab label
- [x] Save button: POSTs updated config to `/api/admin/content`
- [x] Commit: `feat: admin photography management UI`

**Admin UI — Videos:**
- [x] Build `/admin/videos` page: list all video entries, drag to reorder
- [x] Per video: visibility toggle, edit button (opens inline form for title/year/IDs), delete button
- [x] Add video form: title, title Korean, year, YouTube ID (single) or IDs (comma-separated)
- [x] Save button: POSTs updated config
- [x] Commit: `feat: admin video management UI`

**Admin UI — Info:**
- [x] Build `/admin/info` page: text inputs for bio, email, phone, Instagram handle
- [x] Live preview of how info section will look
- [x] Save button: POSTs updated config
- [x] Commit: `feat: admin info editor UI`

**Admin dashboard:**
- [x] Build `/admin/dashboard`: three cards linking to Photography, Videos, Info editors; logout button in nav
- [x] Build `AdminNav` shared component: nav links + sign-out button
- [x] Commit: `feat: admin dashboard`

**Testing & security review:**
- [x] Verify unauthenticated requests to all `/admin/*` routes redirect to login (307 → /admin)
- [x] Verify `/api/admin/*` routes return 401 without valid session cookie
- [x] Verify login with wrong password returns 401
- [x] Verify login with correct password sets session cookie and returns 200
- [x] Verify `/api/admin/content` with valid cookie returns full config (falls back to portfolio.ts when Blob not configured)
- [x] Verify public site falls back to portfolio.ts defaults when BLOB_READ_WRITE_TOKEN is not set
- [x] Commit: `chore: admin phase complete`

---

### Phase 11 — Admin Layout Fix, Variant Control, Filter Tab Management
> Goal: fix admin header overlap, move design variant control to admin, let admin manage filter tabs.

#### Summary of changes

**1. Fix admin header overlap (root layout isolation)**

The root `src/app/layout.tsx` currently renders the portfolio `Nav` and `Footer` on every page, including `/admin/*`. This causes the portfolio nav to appear on top of the admin UI.

Fix: use Next.js **route groups** to split portfolio and admin into separate layout trees.

New structure:
```
src/app/
├── layout.tsx                  ← bare root: html, body, global CSS, fonts only — no Nav, no Footer
├── (site)/
│   ├── layout.tsx              ← portfolio layout: ThemeProvider, DesignVariantProvider, Nav, Footer
│   └── page.tsx                ← portfolio home (moved from src/app/page.tsx)
└── admin/
    └── layout.tsx              ← admin layout: plain wrapper div, no html/body (root layout provides those)
```

Route groups (folders wrapped in parentheses) do not affect the URL. `/` still resolves to `(site)/page.tsx`.

The `DesignVariantProvider` and `ThemeProvider` stay inside `(site)/layout.tsx` — admin pages need neither.

The current `src/app/admin/layout.tsx` incorrectly includes `<html>` and `<body>` tags (not valid in a nested layout). This is fixed by removing those tags and having it return a plain wrapper.

**2. Remove variant switcher from public nav**

`VariantSwitcher` component is removed from `Nav`. The `DesignVariantProvider` and its localStorage logic is also removed — the active variant is now controlled entirely by the admin.

The active variant is stored as `activeVariant: 'v1' | 'v2' | 'v3'` in `content.json` (Blob). Default: `'v1'`.

The `(site)/layout.tsx` server component reads `activeVariant` from `getEffectiveConfig()` and sets `data-design` as the initial value on a wrapper `<div>` (or passes it to a thin client component that sets it on `<html>` without flash). `defaultDesign` is set to `'v1'` if Blob is not configured.

**3. Add variant control to admin**

New page: `/admin/design`

Displays three variant cards (V1 Cinematic/Gold, V2 Embers/Copper, V3 Slate/Contemporary). Admin clicks one to select it. Selection is saved to `content.json` under `activeVariant`. On save, the public site immediately reflects the new variant (since `revalidate = 0`).

Add `/admin/design` link to `AdminNav` and dashboard cards.

`content.json` gains one new top-level field:
```json
{ "activeVariant": "v1" }
```

**4. Filter tab management — add and delete**

Currently `/admin/photography` shows filter labels as fixed key→value pairs. The admin can rename labels but cannot add new tabs or remove existing ones.

New behaviour in `/admin/photography` filter label section:
- Each existing filter row gets a **Delete** button (trashcan / `×`). Deleting a filter key removes it from both `filterLabels` and `filterOrder`.
- An **Add filter** form at the bottom: two inputs (key slug e.g. `commercial`, display label e.g. `Commercial`) + Add button. Adds the new key to `filterLabels` and appends it to `filterOrder`.
- Constraint: `all` cannot be deleted (it is the catch-all tab).
- Note: adding a filter tab only creates the tab — images must be reassigned to the new `filterGroup` key via code (admin cannot reassign existing images to a new tab through the UI; that would require a separate image re-categorisation feature outside this phase scope).

---

#### Checklist

**Layout isolation (route groups):**
- [x] Create `src/app/(site)/` directory
- [x] Move portfolio layout (ThemeProvider, Nav, Footer) to `src/app/(site)/layout.tsx`
- [x] Move `src/app/page.tsx` to `src/app/(site)/page.tsx`
- [x] Strip `src/app/layout.tsx` to bare minimum: fonts, `globals.css`, `data-design` from Blob, `{children}` only — no Nav/Footer
- [x] Fix `src/app/admin/layout.tsx`: remove `<html>` and `<body>` tags, return plain wrapper div
- [x] Root layout is now async — calls `getEffectiveConfig()` (React.cache, one Blob fetch per request) to set `data-design` attribute
- [x] Commit: `refactor: route groups — isolate portfolio layout from admin`

**Variant switcher removal + server-side variant:**
- [x] Remove `<VariantSwitcher />` import and JSX from `src/components/layout/Nav.tsx`
- [x] Remove `DesignVariantProvider` from root layout (no longer needed)
- [x] Add `activeVariant: Variant` to `ContentConfig` type in `src/lib/adminContent.ts`
- [x] Update `buildDefaultConfig()` to include `activeVariant: 'v1'`
- [x] Wrap `getEffectiveConfig` with `React.cache` to deduplicate Blob fetches within one request
- [x] Update `src/app/api/admin/content/route.ts` to use `getEffectiveConfig` (removed now-private `readContentConfig` export)
- [x] Commit: `feat: remove public variant switcher — variant controlled by admin`

**Admin design page:**
- [x] Add `activeVariant` to `AdminNav` link list: `/admin/design`
- [x] Add Design card to `/admin/dashboard`
- [x] Build `/admin/design` page: three variant cards with accent swatch, font, name; active highlighted; click to select; Save button POSTs config
- [x] Add `/admin/design` to middleware `PROTECTED` list and `matcher`
- [x] Commit: `feat: admin design variant selector`

**Filter tab add/delete:**
- [x] In `/admin/photography`: render filter rows in `filterOrder` sequence (not arbitrary object key order)
- [x] Per row: `×` delete button (disabled and titled for `all` key)
- [x] Delete removes key from `filterLabels` and `filterOrder`
- [x] Add filter form (dashed border row): key input (auto-sanitized to slug), label input, `+ Add` button
- [x] Add button disabled when key is empty, label is empty, or key already exists
- [x] Add appends key to `filterLabels` and end of `filterOrder`
- [x] Commit: `feat: admin filter tab add/delete`

---

### Phase 12 — Admin Nav Responsive Fix + View Site Navigation
> Goal: fix admin header breaking on narrow viewports; add a way to navigate from admin back to the public portfolio.

#### Summary of changes

**1. Admin nav responsive fix**

The current `AdminNav` is a single horizontal `<header>` row containing the wordmark, five nav links (Photography, Videos, Info, Design), and a Sign out button. On narrow viewports (laptop at 50% width, tablet, mobile) the links overflow horizontally — "Sign out" is clipped and the row wraps awkwardly.

Fix: convert `AdminNav` from a fixed horizontal bar to a **left sidebar** that collapses to a hamburger on narrow viewports.

Layout approach:
- On `md` and above (≥768px): persistent left sidebar, `w-48`, fixed height, `flex-col` layout with links stacked vertically. Page content area sits to the right (`ml-48`).
- Below `md`: top bar with a hamburger button that toggles a slide-out drawer (same vertical link list). Drawer overlays the content.
- The sidebar/drawer is the same component — only the breakpoint-triggered layout changes.

**Affected files:**
- `src/components/admin/AdminNav.tsx` — rewrite to sidebar/hamburger layout
- All admin page files (`dashboard`, `photography`, `videos`, `info`, `design`) — remove `<AdminNav />` from the page body since it will be part of the admin layout instead, OR keep it in the page and adjust outer padding to account for sidebar width. Simplest: keep it in each page but change the page `<main>` to use left padding matching sidebar width on `md+`.
- Alternative: move `<AdminNav />` out of individual pages and into `src/app/admin/layout.tsx` as a shared sidebar so pages don't each need to include it. This is cleaner — each page's `<main>` just renders content without worrying about nav positioning.

**Chosen approach:** Move `AdminNav` into `src/app/admin/layout.tsx` so it renders exactly once. Each admin page's root div/main drops the `<AdminNav />` and focuses on content only. The layout provides the sidebar shell; the page slot fills the right content area.

New `admin/layout.tsx` structure:
```tsx
export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-neutral-950 flex">
      <AdminNav />  {/* sidebar — fixed left */}
      <div className="flex-1 md:ml-48">{children}</div>
    </div>
  )
}
```

`AdminNav` renders:
- Desktop (md+): `fixed left-0 top-0 h-full w-48 flex flex-col border-r border-neutral-800 px-4 py-6`
- Mobile: `fixed top-0 left-0 right-0 h-12 flex items-center px-4 border-b border-neutral-800` + hamburger button toggling a `fixed inset-y-0 left-0 w-48 flex flex-col` drawer with backdrop overlay

**2. View Site navigation**

Two changes:
- **Logout redirects to `/`** (public portfolio) instead of `/admin` (login page). This lets the client view the site immediately after signing out.
- **"View Site" link** in the sidebar nav (below the section links, above Sign out). Opens the public portfolio in a new tab (`target="_blank"`). Styled as a subtle link, clearly distinct from the admin section links.

---

#### Checklist

**Admin nav → sidebar:**
- [x] Move `<AdminNav />` from individual page files into `src/app/admin/layout.tsx`
- [x] Update `src/app/admin/layout.tsx`: flex row wrapper, `AdminNav` left, content right with `md:ml-48`
- [x] Rewrite `src/components/admin/AdminNav.tsx`:
  - Desktop: fixed left sidebar, `w-48`, stacked vertical links
  - Mobile: fixed top bar + hamburger state (`useState`) → slide-out drawer + backdrop
  - Remove `AdminNav` import/JSX from `dashboard`, `photography`, `videos`, `info`, `design` page files
- [x] Verify all 5 admin pages render correctly with sidebar (no double nav, no content hidden behind sidebar on mobile)
- [x] Commit: `feat: admin sidebar nav — responsive fix`

**View Site link + logout redirect:**
- [x] Add "View Site →" link in `AdminNav` pointing to `/` with `target="_blank"`
- [x] Change `handleLogout` in `AdminNav.tsx` to `router.push('/')` (was `router.push('/admin')`)
- [x] Commit: `feat: admin sidebar nav — responsive fix, view site link, logout to portfolio`

---

### Phase 13 — Admin No-Overflow Responsive Pass
> Goal: fix remaining admin UI breakage on very narrow widths so admin pages stay responsive and never create horizontal document overflow.

#### Summary of changes

**1. Admin shell viewport containment**

The admin layout should constrain the admin surface to the viewport. The shell gets `w-full`, `min-w-0`, and `overflow-x-hidden` where needed so a child row cannot push the whole admin document wider than the screen.

**2. Mobile-first admin page chrome**

All admin page wrappers use smaller mobile padding and full-width constrained mains. Page headers switch from one fixed row to a wrapping column/row layout so long titles, save status text, and Save buttons can wrap naturally at narrow widths.

**3. Dense row wrapping**

Sortable admin rows, especially `/admin/videos`, use mobile-first wrapping. The drag handle and primary title remain on the first line; metadata and actions wrap below on small screens and return to inline layout on larger screens.

**4. Flexible controls**

Forms, filter editors, category headers, variant cards, and repeated controls use `min-w-0`, responsive widths, truncation, or wrapping so long titles, filenames, labels, and placeholders remain inside their containers.

---

#### Checklist

**Admin shell containment:**
- [x] Update `src/app/admin/layout.tsx` with `w-full`, `min-w-0`, and admin-scoped `overflow-x-hidden`
- [x] Tighten `AdminNav` mobile top bar/drawer so the wordmark truncates and the drawer cannot exceed viewport width

**Admin page responsive chrome:**
- [x] Update `/admin/dashboard` page wrapper and cards for full-width mobile layout
- [x] Update `/admin/photography` page wrapper and header controls for wrapping mobile layout
- [x] Update `/admin/videos` page wrapper and header controls for wrapping mobile layout
- [x] Update `/admin/info` page wrapper and header controls for wrapping mobile layout
- [x] Update `/admin/design` page wrapper, header controls, and variant cards for wrapping mobile layout

**Dense admin controls:**
- [x] Update video sortable rows so year/actions wrap below titles on small screens
- [x] Update video form action buttons to wrap on small screens
- [x] Update photography category headers, image rows, and filter add form to avoid fixed-width overflow

**Verification:**
- [x] Run production build check (`npm run build`)
- [x] Run lint check (`npm run lint`)
- [x] Verify narrow viewport no-overflow behaviour for `/admin/videos`, `/admin/photography`, `/admin/info`, `/admin/design`, and `/admin/dashboard`

---

### Phase 14 — Private Vercel Blob Store Compatibility
> Goal: fix admin save/upload failures when the Vercel Blob store is configured with private access.

#### Summary of changes

**1. Private admin content config**

`content.json` is internal site configuration and should be written as a private blob. Admin saves use `access: 'private'` and `allowOverwrite: true`; server reads use the Blob SDK `get()` helper with `access: 'private'` instead of fetching a public blob URL.

**2. Private upload handling**

Admin image uploads also use `access: 'private'` so they work with the configured private store. The upload API returns an app-local URL instead of the raw Blob URL.

**3. Public image proxy for uploads**

Because the portfolio is public but the Blob store is private, uploaded images are served through `/api/blob/uploads/*`. The proxy only allows `uploads/` paths and does not expose `content.json` or other private blob keys.

---

#### Checklist

**Content config Blob access:**
- [x] Update `writeContentConfig()` to put `content.json` with `access: 'private'`
- [x] Add `allowOverwrite: true` so repeated admin saves update the same config blob
- [x] Update config reads to use authenticated `get(..., { access: 'private', useCache: false })`

**Admin uploads:**
- [x] Update `/api/admin/upload` to upload files with `access: 'private'`
- [x] Return an app-local `/api/blob/uploads/...` URL for uploaded images

**Private upload proxy:**
- [x] Add `/api/blob/[...pathname]` route for serving private uploaded images
- [x] Restrict the proxy to `uploads/` paths only

**Verification:**
- [x] Run production build check (`npm run build`)
- [x] Verify authenticated `POST /api/admin/content` succeeds against the private Blob store
- [x] Re-run lint check (`npm run lint`)

---

### Phase 15 — Admin Theme Toggle
> Goal: add a dark/light mode toggle to admin that behaves like the public site toggle but only affects admin pages.

#### Summary of changes

**1. Admin-only theme state**

Admin theme state is stored separately from the public site theme using the `studio-grang-admin-theme` localStorage key. It does not use or mutate the public `next-themes` state.

**2. Admin theme toggle placement**

The admin theme toggle appears in the sidebar/drawer action area directly above the View Site link. It uses the same sun/moon icon language as the public site toggle.

**3. Admin light theme styling**

The existing admin UI uses neutral dark utility classes. Admin-scoped CSS overrides under `.admin-shell[data-admin-theme="light"]` provide a light admin surface without affecting the public portfolio.

**4. View Site tab navigation**

The View Site action opens the public portfolio with `window.open('/', '_blank')` from the click handler and no window feature string. This requests a new browser tab; final tab/window placement is still controlled by the user's browser settings.

---

#### Checklist

**Admin theme state:**
- [x] Add `AdminThemeProvider` with admin-only localStorage state
- [x] Wrap `src/app/admin/layout.tsx` with the admin theme provider
- [x] Avoid hydration mismatch by rendering dark on the server/first client pass, then applying saved admin theme after mount

**Admin toggle UI:**
- [x] Add `AdminThemeToggle` with sun/moon icons matching the public toggle
- [x] Place the toggle above View Site in `AdminNav`

**Admin theme styling:**
- [x] Add admin-scoped light theme CSS overrides in `globals.css`
- [x] Keep public site theme state and styling untouched

**View Site navigation:**
- [x] Change View Site to a click handler that requests a new tab without popup window features

**Verification:**
- [x] Run production build check (`npm run build`)
- [x] Run lint check (`npm run lint`)
- [x] Verify View Site opens `/` as a second browser page from a fresh production server

---

### Phase 16 — Admin Video YouTube URL Editing
> Goal: let admins paste normal YouTube links instead of raw YouTube IDs when adding or editing videos.

#### Summary of changes

**1. URL-first video form**

The admin video form now labels the single video field as `YouTube URL` and accepts normal YouTube watch, short, live, embed, and playlist URLs.

**2. Multiple URL input**

The multiple-video field is now a textarea that accepts YouTube URLs separated by commas or new lines.

**3. Backward-compatible storage**

Existing saved IDs are displayed back to the admin as normal YouTube URLs. On save, URLs are parsed back into the existing `youtubeId`, `youtubeIds`, or `playlistId` fields so the public embed code does not need to change.

---

#### Checklist

**Admin video form:**
- [x] Replace raw `YouTube ID` label/placeholder with normal YouTube URL wording
- [x] Convert the multiple ID input into a URL textarea
- [x] Display existing IDs/playlists as regular YouTube URLs while editing

**URL parsing:**
- [x] Parse `youtube.com/watch?v=...`
- [x] Parse `youtu.be/...`
- [x] Parse `youtube.com/shorts/...`, `/live/...`, and `/embed/...`
- [x] Parse playlist URLs through the `list` query parameter
- [x] Preserve the existing embed data shape on save

**Verification:**
- [x] Run production build check (`npm run build`)
- [x] Run lint check (`npm run lint`)
- [x] Verify an unsaved design draft survives navigation from Design → Info → Design

---

### Phase 17 — Admin Photography Image Deletion + Custom Categories
> Goal: make photography admin tabs behave like editable categories, and let admins remove images from categories.

#### Summary of changes

**1. Image deletion**

Each photography image row now has a `Del` action. Deleting removes the image from that category after confirmation.

**2. New tab creates category**

Adding a filter tab now also creates an empty project/category block with the same key. The admin can upload images into it, toggle visibility, reorder images, and save it with the rest of the photography config.

**3. Custom category rendering**

Admin-created categories are no longer ignored by the public site. The public photography section now falls back to admin `title` and `filterGroup` metadata when a project is not present in the static `portfolio.ts` defaults.

**4. Safe custom tab deletion**

Deleting a custom tab removes its custom category too. If that custom category already has images, the admin gets a confirmation prompt before the category is removed. Built-in portfolio categories are not deleted when their tab label is removed.

---

#### Checklist

**Image deletion:**
- [x] Add `Del` action to each photography image row
- [x] Remove deleted image entries from the selected category
- [x] Confirm before deleting an image

**Custom categories:**
- [x] Extend admin project config with optional `title` and `filterGroup`
- [x] Add default title/filterGroup metadata for built-in projects
- [x] Create an empty editable category when adding a new filter tab
- [x] Keep label edits in sync with matching custom category titles

**Public rendering:**
- [x] Render admin-created categories without requiring a matching static `portfolio.ts` project
- [x] Use admin metadata as fallback title/filter group for custom categories

**Verification:**
- [x] Run production build check (`npm run build`)
- [x] Run lint check (`npm run lint`)

---

### Phase 18 — Admin Design Variant Verification
> Goal: verify that changing the design variant in admin actually affects the public portfolio.

#### Verification

- [x] Authenticate against the local admin API
- [x] Read the original `activeVariant`
- [x] Save a temporary variant through `POST /api/admin/content`
- [x] Fetch `/` and confirm the root `<html>` renders the temporary `data-design` value
- [x] Restore the original variant through `POST /api/admin/content`
- [x] Fetch `/` again and confirm the original `data-design` value is restored

---

### Phase 19 — Admin Button Cursor + Light Theme Contrast
> Goal: polish admin interaction affordances and fix selected design variant text contrast in light mode.

#### Summary of changes

**1. Button cursor affordance**

Enabled `<button>` elements and enabled `[role="button"]` controls should show `cursor: pointer`. Disabled controls should show `cursor: not-allowed`.

**2. Design variant active-card contrast**

The selected design variant card uses a dark active background in both admin themes. In light admin mode, the global `.text-white` override made the selected variant title unreadable. The design variant card now sets explicit active title/subtitle colors so selected text stays visible.

---

#### Checklist

**Cursor affordance:**
- [x] Add global pointer cursor for enabled buttons
- [x] Add disabled cursor for disabled buttons

**Light theme contrast:**
- [x] Set explicit active title color for selected design variant
- [x] Set explicit active subtitle color for selected design variant

**Verification:**
- [x] Run production build check (`npm run build`)
- [x] Run lint check (`npm run lint`)

---

### Phase 20 — Admin Uploaded Image Blob Deletion
> Goal: when an admin deletes an uploaded photography image, remove the corresponding private Vercel Blob object as well as the admin config entry.

#### Summary of changes

**1. Server-side Blob delete API**

Add an authenticated admin API route for deleting uploaded image blobs. The route accepts an image URL/path from admin config, maps app-local `/api/blob/uploads/...` URLs back to the private Blob pathname, and deletes only files under `uploads/`.

**2. Static image protection**

Static portfolio images under `/images/...` are not Blob files and should not be passed to Vercel Blob deletion. Deleting those images only removes the category entry from admin config.

**3. Admin image delete flow**

When the admin deletes an image, the UI first confirms the action. If the image points to an uploaded Blob file, the admin page calls the delete API before removing the image from local config. If Blob deletion fails, the image stays in the category and the admin sees an error.

**4. Custom category delete flow**

When the admin deletes a custom tab/category, uploaded Blob images inside that category are deleted before the category is removed from config. Tab deletion uses one browser confirmation up front. If any Blob deletion fails, the category stays in place and the page status shows an error without opening a second alert.

---

#### Checklist

**Blob delete API:**
- [x] Add authenticated admin image-delete route
- [x] Accept only uploaded image paths that resolve to `uploads/...`
- [x] Call Vercel Blob `del()` for private uploaded files
- [x] Return a no-op success for non-upload/static images or keep static deletion client-only

**Admin photography UI:**
- [x] Detect uploaded image URLs before calling the delete API
- [x] Keep existing confirmation prompt
- [x] Remove the image from config only after any required Blob delete succeeds
- [x] Show an error if Blob deletion fails
- [x] Delete uploaded Blob images inside a custom category before removing that category
- [x] Keep the category if any Blob deletion fails during category removal
- [x] Use only one browser confirmation for tab/category deletion

**Verification:**
- [x] Run production build check (`npm run build`)
- [x] Run lint check (`npm run lint`)

---

### Phase 21 — Admin Sticky Save Bar + Unsaved Changes Guard
> Goal: make saving harder to miss on admin edit pages and warn admins only when they try to leave with actual unsaved changes.

#### Summary of changes

**1. Sticky save bar**

Admin edit pages should use a sticky top action bar instead of a save button that scrolls away with the page header. The bar stays visible at the top of the content area across desktop, tablet, and mobile layouts. It contains the page title, save status, and Save button.

Apply to the admin pages that edit persisted content:
- `/admin/photography`
- `/admin/videos`
- `/admin/info`
- `/admin/design`

Dashboard and login do not need this because they do not edit content.

**2. Shared dirty-state detection**

Each admin edit page should store a serialized snapshot of the last loaded/saved config. The page is dirty only when the current config differs from that snapshot. After a successful save, the snapshot updates to the saved config.

**3. Leave-page warning only when dirty**

When dirty, admin pages should warn before:
- browser refresh / tab close / external navigation via `beforeunload`
- internal admin navigation through sidebar links or other anchor clicks

Warning message:
`변경사항이 저장되지 않을 수도 있습니다. 페이지를 떠나시겠습니까?`

No warning should appear when no actual data changes exist.

**4. Save button disabled state**

The sticky Save button should be disabled when there are no unsaved changes or while saving. This makes the dirty state visible and avoids unnecessary writes.

---

#### Checklist

**Shared admin save utilities:**
- [x] Add reusable dirty-state hook for loaded/saved snapshots
- [x] Add reusable sticky save bar component
- [x] Add browser/internal navigation guard using the Korean warning message

**Admin edit pages:**
- [x] Update `/admin/photography` to use sticky save bar and dirty-state guard
- [x] Update `/admin/videos` to use sticky save bar and dirty-state guard
- [x] Update `/admin/info` to use sticky save bar and dirty-state guard
- [x] Update `/admin/design` to use sticky save bar and dirty-state guard

**Verification:**
- [x] Run production build check (`npm run build`)
- [x] Run lint check (`npm run lint`)

---

### Phase 22 — Shared Admin Draft + Header Save Navigation
> Goal: make admin edits persist across admin page navigation and move the Save action into a fixed admin header.

#### Summary of changes

**1. Shared admin draft state**

Admin content config should be loaded once in the admin layout and stored in a shared client provider. Photography, Videos, Info, and Design pages all read/write the same draft config, so edits remain available while navigating between those admin pages.

**2. One save for all admin changes**

The fixed admin header owns the Save action. Because all edit pages share one draft config, the admin can change photography, videos, info, and design, then click Save once from the header.

**3. Admin navigation layout**

Desktop admin should use a fixed top header, similar to the public site structure. Mobile/tablet should keep a top bar with a right-side drawer for navigation.

**4. Unsaved changes guard remains global**

The dirty-state guard moves from individual pages to the shared provider, so browser refresh/tab close and internal navigation warnings are based on the full shared admin draft, not one page at a time.

---

#### Checklist

**Shared admin content state:**
- [x] Add admin content provider in the admin layout
- [x] Load `/api/admin/content` once for protected admin pages
- [x] Keep draft config when navigating among Photography, Videos, Info, and Design
- [x] Save the shared draft once from the admin header

**Admin header navigation:**
- [x] Replace desktop sidebar with fixed desktop top header
- [x] Add Save controls to the desktop/mobile admin header
- [x] Use a right-side drawer for mobile/tablet navigation
- [x] Remove per-page sticky save bars

**Admin edit pages:**
- [x] Update Photography page to use shared admin config
- [x] Update Videos page to use shared admin config
- [x] Update Info page to use shared admin config
- [x] Update Design page to use shared admin config

**Verification:**
- [x] Run production build check (`npm run build`)
- [x] Run lint check (`npm run lint`)

---

## Notes
- All UI text in English; Korean appears only in alt text or metadata where helpful for SEO
- The studio name "Studio Grang" comes from 봉사활동 동아리 그랑 (volunteer club "Grang") which Bosun ran 2015–2022 — it's personal and meaningful
- `npx plugins add vercel/vercel-plugin` run this for vercel plugin. also check for other mcp server or any add ons that would help for this project managment.
