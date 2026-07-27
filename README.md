# Daniel Ramirez Gil — Portfolio

> Static, zero-build, bilingual portfolio for a Full Stack Developer based in Pereira, Colombia.
> No frameworks. No bundlers. No dependencies. Just HTML, CSS, and vanilla JS.

[![Live Site](https://img.shields.io/badge/live-ramirezdg.github.io-F5C400?style=for-the-badge&logo=github-pages&logoColor=white)](https://ramirezdg.github.io/)
[![License](https://img.shields.io/badge/license-MIT-F5C400?style=for-the-badge)](LICENSE)
[![Languages](https://img.shields.io/badge/i18n-ES%20%7C%20EN-F5C400?style=for-the-badge)](#internationalization)

---

## Table of Contents

- [Overview](#overview)
- [Live Demo](#live-demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [Internationalization](#internationalization)
- [Accessibility](#accessibility)
- [SEO](#seo)
- [Local Development](#local-development)
- [Deployment](#deployment)
- [Projects Showcased](#projects-showcased)
- [Conventions](#conventions)
- [License](#license)

---

## Overview

A single-page personal portfolio for **Daniel Ramirez Gil**, a Full Stack Developer specializing in React, Laravel, and NestJS. The site is deployed as a GitHub Pages user site — pushing to `main` publishes immediately.

Built with a deliberate zero-build, zero-dependency philosophy: every feature is implemented with native browser APIs and vanilla ES6+ JavaScript in a single `main.js` file. No `package.json`, no `node_modules`, no bundler, no framework.

---

## Live Demo

**[ramirezdg.github.io](https://ramirezdg.github.io/)**

---

## Features

### Core

- **Bilingual (ES/EN)** — Full i18n system with runtime language switching, persisted in `localStorage`. Default language: Spanish.
- **Dark theme** — Single theme, carefully tuned: yellow accent (`#F5C400`), near-black background (`#0C0C0C`), off-white text (`#F5F5F0`).
- **Fluid typography** — `clamp()`-based type scale from `--text-xs` to `--text-4xl`. No breakpoints needed for font sizes.
- **Responsive** — Mobile-first, breakpoints at 480px, 768px, 1024px, 1440px.
- **Scroll reveal** — `IntersectionObserver`-driven entrance animations with staggered delays.

### Interactive Components

| Feature | Implementation |
|---|---|
| **Project carousel** | True infinite scroll with cloned slides, touch swipe, keyboard arrows, dots, and autoplay (4s, pauses on hover/hidden tab) |
| **Project filters** | Category-based filtering (All / Full Stack / Backend) with dynamic track rebuild |
| **Image lightbox** | Click or keyboard-accessible preview for project screenshots, closes on Escape/click-outside/✕ |
| **Avatar swap** | Hover on desktop, tap-to-toggle on mobile (`.is-flipped` class with `stopPropagation`) |
| **Mobile menu** | Slide-in panel with overlay, Escape to close, aria-expanded state |
| **Contact form** | Formspree backend, localized status messages, honeypot bot trap |
| **CV download** | Floating FAB (appears after 400px scroll) + CTA button in contact section |
| **Skills ticker** | Infinite-loop marquee rows, pauses on hover, fade-edge overlays |
| **Active nav tracking** | IntersectionObserver sets `aria-current` on the visible section's nav link |

### Accessibility

- Skip link to `#main`
- `:focus-visible` styling with accent outline
- Full keyboard navigation (carousel, lightbox, menu, form)
- ARIA: `role="navigation"`, `role="menubar"` / `menuitem`, `role="tab"` on carousel dots, `aria-expanded` / `aria-controls` on mobile menu, `aria-current` on active nav link, `aria-modal` on lightbox
- `prefers-reduced-motion` respected — disables all animations and scroll behavior
- Contact form status uses `role="status"` + `aria-live="polite"`

### SEO

- Complete meta tags: description, keywords, robots, theme-color
- Canonical URL + `hreflang` alternates (es, en, x-default)
- Open Graph (type, url, title, description, image with dimensions, site name, locale)
- Twitter/X Card (`summary_large_image`)
- JSON-LD structured data (`Person` schema with jobTitle, worksFor, address, sameAs, knowsAbout)

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Markup** | Semantic HTML5 |
| **Styling** | CSS3 — custom properties, `clamp()`, `IntersectionObserver`-driven reveal, no preprocessor |
| **Logic** | Vanilla JavaScript (ES6+) — IIFE modules, no imports/exports |
| **Fonts** | Syne (display) + DM Sans (body), loaded via Google Fonts `<link>` |
| **Form backend** | Formspree (`https://formspree.io/f/xlgqovdy`) |
| **Hosting** | GitHub Pages (user site, served from `main` branch root) |

---

## Project Structure

```
ramirezDg.github.io/
├── index.html              # Single-page markup, all sections, SEO meta, JSON-LD
├── main.js                 # All behavior: i18n, carousel, lightbox, form, etc.
├── styles.css              # Design tokens + all component styles + responsive
├── assets/
│   ├── avatar.jpg           # Primary avatar (hero)
│   ├── avatar.png           # Hover/tap state avatar
│   ├── favicon.ico
│   ├── og-image.jpg         # Open Graph / Twitter card image
│   ├── lampp-tui.png        # Project screenshot (carousel)
│   ├── tara.jpg             # Project screenshot (carousel)
│   └── DANIEL RAMIREZ GIL CV - DEV.pdf
├── .gitignore
└── README.md
```

No `package.json`. No `node_modules`. No build step.

---

## Architecture

### `main.js` — IIFE Block Organization

The JavaScript file is organized as numbered self-contained IIFE blocks. Each block caches its own DOM queries and guards with early returns. This structure is deliberate — do not refactor into modules without explicit intent.

| Block | Responsibility |
|---|---|
| 1. i18n — TRANSLATIONS | `TRANSLATIONS` object (en/es) + `I18N` module (apply, toggle, get, updateMeta) |
| 2. MOBILE MENU TOGGLE | Slide-in menu, overlay, aria-expanded, Escape to close |
| 3. SCROLL REVEAL | `IntersectionObserver` — adds `.is-visible` on enter, unobserves after |
| 4. ACTIVE NAV LINK | `IntersectionObserver` — sets `aria-current` on visible section's link |
| 5. PROJECT CAROUSEL | True infinite scroll: clones, normalize on `transitionend`, touch swipe, autoplay, filters |
| 6. NAV BACKGROUND | Toggle `.is-scrolled` after 50px scroll |
| 6b. CV FAB VISIBILITY | Toggle `.is-visible` after 400px scroll |
| 7. CONTACT FORM | `preventDefault` + `fetch` to Formspree, localized status, honeypot |
| 8. IMAGE LIGHTBOX | Open/close, focus management, keyboard accessible |
| 9. AVATAR TOUCH TOGGLE | Mobile tap-to-flip with `stopPropagation`, click-outside reset |

### `styles.css` — Design Token System

All design tokens live in `:root` at the top of the file:

- **Colors**: 3 main (yellow accent, dark bg, off-white text) + neutrals
- **Typography**: Syne (display) / DM Sans (body) with fluid `clamp()` scale
- **Spacing**: 8px base grid (`--space-1` through `--space-24`)
- **Motion**: `--ease-out: cubic-bezier(0.22, 1, 0.36, 1)`, `--duration: 350ms`
- **Layout**: `--container: min(90vw, 1200px)`, `--nav-height: 4rem`

Reuse tokens; do not hardcode hex values or magic numbers downstream.

---

## Internationalization

The site is bilingual — Spanish (`es`) and English (`en`) — with Spanish as the default.

- Language is stored in `localStorage` under `'drg_lang'`
- HTML static text is Spanish by default to avoid flash of English on load
- The language toggle button shows the language you can switch **TO** (EN when in ES, ES when in EN)
- `I18N.apply(lang)` walks `[data-i18n]` nodes and updates text via `TreeWalker` — never wipes inner HTML
- For elements with child nodes (text + `<br>`), strings use `\n` to split across text nodes
- `[data-i18n-placeholder]` for input placeholders
- `[data-i18n-aria-label]` for ARIA labels
- `I18N.updateMeta(lang)` rewrites `<title>`, meta description, and OG tags per language

**Adding a new string:**
1. Add the key to **both** `en` and `es` in `TRANSLATIONS`
2. Add the matching `data-i18n="key"` attribute in `index.html`

---

## Local Development

There's no build step. To preview changes locally:

```bash
# Option 1: Open directly
open index.html

# Option 2: Static server (for cross-device testing)
python -m http.server 8000
# Then visit http://localhost:8000
```

---

## Deployment

The site is a GitHub Pages **user site** — it deploys automatically from the `main` branch root.

```bash
git add .
git commit -m "feat: your change description"
git push origin main
```

The live site updates within ~30 seconds of pushing to `main`. Be deliberate — the site is live immediately.

---

## Projects Showcased

| Project | Category | Tech | Status |
|---|---|---|---|
| **AgendaPro** | Full Stack | Laravel, React, PostgreSQL, Redis | In development |
| **CRM Template** | Full Stack | NestJS, React, PostgreSQL | [Open source](https://github.com/ramirezDg/crm-base) |
| **lampp-tui** | Backend | Go, Bubble Tea, CLI/TUI | [Open source](https://github.com/ramirezDg/lampp-tui) |
| **Tara** | Full Stack | React, PostgreSQL, Java, Spring Boot | Private — in development |

---

## Conventions

- **HTML**: `lang="es"` by default; runtime switches `document.documentElement.lang`
- **CSS**: 4-space indentation, tokens from `:root`, no preprocessor
- **JS**: 2-space indentation, IIFEs only, no `import`/`export`, no external libraries
- **Git**: Conventional Commits — `feat:`, `fix:` (no scope, lowercase summary)
- **Carousel hard constraint**: `SLIDE_GAP = 24` in `main.js` must match `gap: 1.5rem` in `styles.css`

---

## License

MIT — feel free to use this as inspiration for your own portfolio, but please don't copy it verbatim. Make it yours.