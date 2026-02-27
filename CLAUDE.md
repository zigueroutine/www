# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Zigueroutine is a Portuguese tire shop e-commerce site. The UI is entirely in Portuguese (pt-PT). It's a single-page Next.js app where customers browse tires by category, add them to a cart, and submit orders via phone number. Orders are persisted and trigger email notifications via Resend.

## Commands

- `npm run dev` — Start development server (http://localhost:3000)
- `npm run build` — Production build
- `npm run lint` — Run ESLint

## Tech Stack

- **Next.js 16** (App Router) with TypeScript, React 19
- **Tailwind CSS 4** via `@tailwindcss/postcss`
- **Resend** for transactional email
- **@vercel/blob** for order persistence in production
- **JetBrains Mono** as the sole font (monospace aesthetic)
- Path alias: `@/*` → `./src/*`

## Architecture

The app is minimal by design — four source files total:

- **`src/app/page.tsx`** — The entire storefront UI as a single `"use client"` component. Contains the tire catalog data (hardcoded), cart logic, order modal, and all state management via `useState` hooks. All UI text is in Portuguese.
- **`src/app/api/order/route.ts`** — POST endpoint that validates orders, generates a unique 6-char code (2 letters + 4 digits), persists the order, and sends an HTML email notification via Resend. Uses dual persistence: local filesystem (`data/orders/`) in dev, Vercel Blob in production.
- **`src/app/layout.tsx`** — Root layout with metadata and font import.
- **`src/app/globals.css`** — Tailwind import, JetBrains Mono font, and a `fadeIn` keyframe animation used for category tab transitions.

## Key Data Types

```typescript
type Tire = { id: number; brand: string; name: string; price: number };
type CartItem = Tire & { qty: number };
type TireList = { label: string; tires: Tire[] };
```

Tire catalog has 2 categories: Ligeiros (light vehicles), Pesados (heavy vehicles).

## Environment Variables

- `RESEND_API_KEY` — Resend API key for email delivery
- `ORDER_NOTIFICATION_EMAIL` — Email address receiving order notifications
- `BLOB_READ_WRITE_TOKEN` — Vercel Blob token (production only)

## Design Conventions

- Monospace, minimalist/notion-style aesthetic with grayscale palette
- Mobile-first responsive layout (`max-w-2xl` container, `sm:` breakpoints)
- Orders persist to `data/orders/` in dev (git-ignored), Vercel Blob in prod
