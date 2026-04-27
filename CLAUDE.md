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

- **Minimal and purposeful** — whitespace is intentional, not empty
- **Typography-forward** — large, expressive type carries the aesthetic
- **Media is the hero** — UI chrome recedes; photos and videos dominate
- **No generic patterns** — no cards with drop shadows, no rounded-everything, no stock layouts
- **Dark theme:** cinematic — near-black backgrounds, muted warm tones, high contrast on imagery
- **Light theme:** editorial/print — off-white backgrounds, fine typography, clean negative space
- **Consistent language:** English for all UI labels (navigation, section titles, metadata) regardless of image filenames

## Theme System

- Library: `next-themes`
- Strategy: `attribute="class"` on `<html>`
- Default: `system` (auto-detects OS preference, no flash on load)
- Toggle: icon-only button (sun/moon) in the navigation — no label
- Persist user selection in localStorage (handled automatically by `next-themes`)

## Responsive Breakpoints

Mobile-first. Three layouts:
- **Mobile:** < 640px — single column, stacked nav
- **Tablet:** 640–1024px — 2-column gallery, horizontal nav
- **Desktop:** > 1024px — 3-column gallery, full nav

## Site Structure (Single Page, Anchor Nav)

```
/ (single page)
├── #hero          — Full-viewport hero with name, title, subtle animation
├── #about         — Bio, profile photo, career summary, skills
├── #photography   — Filterable photo gallery by category
├── #video         — Video section with YouTube embeds
├── #design        — 2D illustration / graphic design work
├── #awards        — Competition awards with links
└── #contact       — Email, phone, social links
```

Navigation links scroll to anchors. Active section highlighted in nav.

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

### Skills (for About section)

| Tool | Level | Capabilities |
|---|---|---|
| Lightroom Classic | ★★★★★ | Color grading, tone correction, catalog management |
| Photoshop | ★★★★★ | Image editing, compositing, AI tools |
| Premiere Pro | ★★★★★ | Video editing, color correction, sound sync |
| Gemini | ★★★★★ | AI image generation, concept references |
| Chat GPT | ★★★★★ | Copywriting, concept ideation, research |
| After Effects | ★★★★☆ | Motion graphics, VFX, type animation |
| Illustrator | ★★★★☆ | Vector design, icons, print materials |
| Grok | ★★★★☆ | Fact-checking, image reference |
| Powerpoint | ★★★★☆ | Presentation design |
| Excel | ★★★★☆ | Data management |

## Career / Experience (for About section)

**라이즈에듀테이션코리아 (RISE Education Korea)** — Freelance, Oct 2010–present
- Writing competition sketch photography (2019, 2022)
- Online English lecture production — 47 episodes (2022)
- Christmas, Chuseok performance/event video production
- Campus Tour video production
- Student lecture sketch photography
- Student growth interviews, parent interviews
- Prof. Cho Seongmi invited lecture video

**롯데월드 (Lotte World)** — Entertainment Team, Video Planning Assistant Director, Sep–Nov 2024
- Official homepage seasonal performance video shoots
- Stage performance edit videos
- Stage performance broadcasting
- Seasonal performance banner design
- Performance guide video production

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
    │   ├── sections/       # Hero, About, Photography, Video, Design, Awards, Contact
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

Commit and push at every meaningful milestone — not just end of phase. Rule of thumb: if a component works independently, commit it. Never batch multiple completed components into one commit.

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

### Phase 1 — Foundation [ ]
> Goal: establish the full visual and technical base. Everything else inherits from this.

- [ ] Scaffold Next.js 14+ project (`npx create-next-app@latest .` — TypeScript, Tailwind, App Router, src dir)
- [ ] Add `notion_export/` to `.gitignore` (98MB source dump — not for version control)
- [ ] Install dependencies: `next-themes`, `framer-motion`
- [ ] Configure Tailwind: custom font variables, color tokens for light/dark, base spacing scale
- [ ] Set up `next-themes` provider in root layout, `attribute="class"`, default `system`
- [ ] Define global CSS: font imports (to be chosen), CSS custom properties for theme colors
- [ ] Build `Nav` component: logo/wordmark left, anchor links center, theme toggle right — responsive (hamburger on mobile)
- [ ] Build `ThemeToggle` component: sun/moon icon only, no label
- [ ] Build `Footer` component: minimal — name, year, email
- [ ] Verify light/dark switch works, no flash on load
- [ ] Commit: `feat: phase 1 — foundation, layout, theme system`

### Phase 2 — Hero + About [ ]
> Checkpoint: review design direction before building remaining sections.

- [ ] Build `Hero` section: full-viewport, name + title large type, subtle entrance animation
- [ ] Build `About` section: profile photo (`next/image`), bio text, career timeline, skills grid
- [ ] Confirm responsive layout on mobile / tablet / desktop
- [ ] Confirm light/dark rendering looks correct on both sections
- [ ] **User review checkpoint** — approve design direction before proceeding to Phase 3
- [ ] Commit: `feat: phase 2 — hero and about sections`

### Phase 3 — Photography Gallery [ ]
> Most complex phase. Requires image organization before wiring up the gallery.

- [ ] Organize images: copy from `notion_export/bosun_portfolio/non_folderized/` into `public/images/<category>/` with clean English filenames (prefer `_크게` versions)
- [ ] Write `src/lib/portfolio.ts`: typed `Project[]` array with all 13 photo categories, image paths, titles
- [ ] Build `Photography` section with filter tab bar (All / Product / Portrait / Fine Art / Interior)
- [ ] Build `GalleryGrid` component: responsive masonry or CSS grid (1→2→3 col)
- [ ] Add scroll-reveal entrance animation on gallery items (Framer Motion)
- [ ] Test all 13 categories filter correctly
- [ ] Commit: `feat: phase 3 — photography gallery`

### Phase 4 — Video, Design, Awards, Contact [ ]
> Remaining sections. Bundle together then do final polish pass.

- [ ] Build `Video` section: YouTube embed cards (`youtube-nocookie.com`), title + year, responsive grid
- [ ] Build `Design` section: image grid for 2D illustration/poster work
- [ ] Build `Awards` section: list with title, award body, year, link to YouTube
- [ ] Build `Contact` section: email, phone, minimal layout — no form needed
- [ ] Global polish: audit all responsive breakpoints, refine spacing and animation timing
- [ ] Performance check: `next build`, verify image optimization, no layout shift
- [ ] Commit: `feat: phase 4 — video, design, awards, contact, polish`

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
