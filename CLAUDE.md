# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Marketing **landing page** (single-page site) for **PidemeYa / PediGas / PedidoAgua** — a WhatsApp-bot ordering system that automates orders for four business types: **licorerías, restaurantes, distribuidoras de agua, and distribuidoras de gas**. This repo is the frontend showcase only; the actual product lives in the sibling Laravel backend at `G:\Proyecto PediGas\pedidoAgua v 1.0` (multi-tenant Laravel 12 + WhatsApp bot via n8n; see its own `CLAUDE.md`). The landing's job is to explain *how the system works* to prospective business owners so they understand the value before signing up. Copy is in Spanish (Peru).

Stack: **React 19 + TypeScript + Vite 8 + TailwindCSS v4** (CSS-first `@theme`, no `tailwind.config`). Animations via **GSAP** (`@gsap/react`), smooth scroll via **Lenis**, optional 3D via **Spline**.

## Commands

```bash
npm run dev       # Vite dev server with HMR
npm run build     # tsc -b (typecheck) then vite build → dist/
npm run lint      # ESLint (flat config, eslint.config.js)
npm run preview   # serve the production build locally
```

No test suite is configured. `npm run build` runs the TypeScript project references (`tsc -b`) first, so a type error fails the build — run it to typecheck.

## Architecture

- **Routing** (`src/App.tsx`): React Router v7. All routes render inside a single `Layout`. Pages: `/` (Home), `/contactanos`, `/privacidad`, `/terminos`. Unknown paths (`*`) fall back to Home. Routes are Spanish kebab-case. (There was a `/proyectos` "Galería de Funcionalidades" page — removed once the Home `#demo` LiveDemo covered the same animations; links that pointed there now scroll to `/#demo`.)
- **Layout** (`src/components/Layout.tsx`): wraps everything in `SmoothScroll` (Lenis), renders a fixed `MeshBackground`, a timed preloader (1.5s), `Header`, `<Outlet/>`, `Footer`.
- **Home** (`src/pages/Home.tsx`): the core marketing narrative — a vertical stack of section components, each wrapped in a `<div id="...">` anchor: Hero → Sectors → `#servicios` Services → `#caracteristicas` Features → `#beneficios` Benefits → `#proceso` Process → `#resenas` Testimonials → `#precios` Pricing → `#contacto` Cta. **These anchor ids are the scroll-nav targets** — the `Header` nav (`navLinks`) and active-section highlighting depend on them; keep ids and Header's list in sync when adding/removing sections.
- **Content is hardcoded in components**, not fetched. Section data (e.g. the four sectors, features, pricing) lives in module-level `const` arrays inside each component file. To change what the site *shows about how the system works*, edit these arrays — e.g. the sector cards in `src/components/Sectors.tsx`.
- **Theming** (`src/context/ThemeContext.tsx`): light/dark via a `light` class on `<html>`, persisted to `localStorage`. **Defaults to dark** (the design is built around dark premium tones). Prefer semantic color tokens over raw hex.

## Design system & conventions

- **Colors are Material-style semantic tokens** defined in `src/index.css` under `@theme` (and overridden for light mode in the `.light` block). Use Tailwind classes like `bg-surface`, `text-on-surface`, `text-primary-container`, `border-on-surface/10` — **do not hardcode hex**. Brand accent is `primary-container` = orange `#fb650a`.
- **Fonts**: everything is Plus Jakarta Sans, aliased across `font-headline`, `font-body`, `font-label`, `font-button`, `font-ui`. Icons use Material Symbols (`<span className="material-symbols-outlined">name</span>`).
- **Animation idioms**: GSAP via `useGSAP` for scroll-driven and entrance animations; `ScrollReveal` component wraps content for on-scroll reveals; magnetic hover and elastic easings are used heavily in `Header`. Match these patterns for new interactive elements.
- **Mixed `.tsx`/`.jsx`**: most components are TypeScript `.tsx`; a few newer ones are plain `.jsx` (`ChatCommercial.jsx`, `animations.jsx`, `RepartidorDemo.jsx`). Prefer `.tsx` for new files.
- Static assets (logos, `icono_pidemeya.webp`, images) live in `public/` and are referenced by absolute path (`/images/...`).
- Windows dev environment; the Bash tool here is Git Bash (POSIX sh).
