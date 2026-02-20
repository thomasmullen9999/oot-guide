# 🗡️ Ocarina of Time — Hyrule Field Guide

A full-stack fan companion app for _The Legend of Zelda: Ocarina of Time_, built as a technical portfolio project demonstrating Vue 3, TypeScript, Node.js, Express, and SQLite.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Reference](#api-reference)
- [Architecture Decisions](#architecture-decisions)
- [Testing](#testing)
- [Design System](#design-system)

---

## Overview

This project is a feature-complete guide application covering Gold Skulltulas, Heart Pieces, Locations, Items, and a full game Walkthrough. It demonstrates a production-style separation of concerns between a Vue 3 frontend and a Node/Express REST API backed by a SQLite database.

Progress tracking is persisted locally per user via `localStorage`, managed through a custom Vue composable.

---

## Tech Stack

### Frontend

| Tool                    | Purpose                                        |
| ----------------------- | ---------------------------------------------- |
| Vue 3                   | UI framework (Composition API throughout)      |
| TypeScript              | Type safety across all components and services |
| Vue Router              | Client-side routing with dynamic route params  |
| Axios                   | HTTP client with centralised API service layer |
| Vite                    | Build tool and dev server                      |
| Tailwind CSS            | Utility styling base                           |
| Vitest + Vue Test Utils | Component and composable testing               |

### Backend

| Tool               | Purpose                                  |
| ------------------ | ---------------------------------------- |
| Node.js            | Runtime                                  |
| Express            | REST API framework                       |
| TypeScript         | Type safety on all routes and middleware |
| better-sqlite3     | Synchronous SQLite driver                |
| tsx                | TypeScript execution for development     |
| Vitest + Supertest | API integration testing                  |

---

## Features

- 📖 **Walkthrough** — 10-chapter collapsible guide from Kokiri Forest to Ganon's Castle
- 🕷️ **Gold Skulltulas** — All 100 tokens with real-time search and location filtering
- ❤️ **Heart Pieces** — All 36 pieces with search
- 🗺️ **Locations** — Every area in Hyrule with detail pages and cross-linking
- 🎒 **Items** — Full equipment index with category filtering
- 📊 **Progress Tracker** — Per-user completion tracking persisted in `localStorage`
- 🔗 **Smart Location Linking** — Skulltula and heart piece cards link directly to their matching location pages
- ⚡ **Debounced Search** — Keystroke search hits the API with a 300ms debounce
- 🌙 **Dark Fantasy UI** — Custom design system using Cinzel + Crimson Text typefaces

---

## Project Structure

```
oot-guide/
├── src/                        # Vue 3 frontend
│   ├── assets/
│   │   └── main.css            # Global design system & CSS variables
│   ├── components/
│   │   ├── NavBar.vue
│   │   ├── GoldSkulltula.vue   # Individual token card
│   │   ├── GoldSkulltulas.vue  # List with search, filter, progress bar
│   │   ├── HeartPiece.vue
│   │   ├── HeartPieces.vue
│   │   ├── ItemCard.vue
│   │   ├── ItemsComponent.vue
│   │   ├── LocationCard.vue
│   │   └── LocationsComponent.vue
│   ├── composables/
│   │   └── useProgress.ts      # localStorage-backed progress tracking
│   ├── data/                   # Source JSON (used by seed script)
│   │   ├── goldskulltulas.json
│   │   ├── heartpieces.json
│   │   ├── locations.json
│   │   └── items.json
│   ├── router/
│   │   └── index.ts
│   ├── services/
│   │   └── api.ts              # Centralised Axios service layer
│   ├── tests/
│   │   ├── components.test.ts
│   │   └── useProgress.test.ts
│   ├── types/
│   │   └── index.ts            # Shared TypeScript interfaces
│   └── views/
│       ├── HomeView.vue
│       ├── GoldSkulltulasView.vue
│       ├── GoldSkulltulaView.vue
│       ├── HeartPiecesView.vue
│       ├── HeartPieceView.vue
│       ├── LocationsView.vue
│       ├── LocationView.vue
│       ├── ItemsView.vue
│       ├── ItemView.vue
│       ├── WalkthroughView.vue
│       ├── StatsView.vue
│       └── NotFoundView.vue
├── server/                     # Express REST API
│   ├── db/
│   │   └── database.ts         # SQLite connection singleton (WAL mode)
│   ├── routes/
│   │   ├── goldskulltulas.ts
│   │   ├── heartpieces.ts
│   │   ├── locations.ts
│   │   └── items.ts
│   ├── tests/
│   │   └── api.test.ts         # Integration tests against a test DB
│   ├── app.ts                  # Express app (exported for testability)
│   ├── index.ts                # Entry point — binds app to port
│   ├── seed.ts                 # Populates oot.db from JSON source files
│   ├── vitest.config.ts
│   ├── tsconfig.json
│   ├── package.json
│   └── .env
├── .env                        # VITE_API_BASE_URL
├── vitest.config.ts            # Frontend test config
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm 9+

### 1. Install dependencies

```bash
# Frontend
npm install

# Backend
cd server && npm install
```

### 2. Configure environment variables

Create `.env` in the project root:

```env
VITE_API_BASE_URL=http://localhost:3001/api
```

The `server/.env` file is included and pre-configured:

```env
PORT=3001
CLIENT_ORIGIN=http://localhost:5173
```

### 3. Seed the database

```bash
npm run seed
```

This reads the JSON files in `src/data/` and populates `server/oot.db` with four tables: `goldskulltulas`, `heartpieces`, `locations`, and `items`. The database file is git-ignored — re-run the seed script any time to reset it.

### 4. Run the app

Open two terminal windows:

```bash
# Terminal 1 — Vue frontend (http://localhost:5173)
npm run dev

# Terminal 2 — Express API (http://localhost:3001)
npm run server
```

---

## API Reference

All endpoints return JSON. The base URL is `http://localhost:3001/api`.

### Health

| Method | Endpoint  | Description                |
| ------ | --------- | -------------------------- |
| GET    | `/health` | Returns `{ status: 'ok' }` |

### Gold Skulltulas

| Method | Endpoint              | Query Params    | Description                                        |
| ------ | --------------------- | --------------- | -------------------------------------------------- |
| GET    | `/goldskulltulas`     | `q`, `location` | All skulltulas. Filter by keyword or location name |
| GET    | `/goldskulltulas/:id` | —               | Single skulltula by ID                             |

### Heart Pieces

| Method | Endpoint           | Query Params | Description                         |
| ------ | ------------------ | ------------ | ----------------------------------- |
| GET    | `/heartpieces`     | `q`          | All heart pieces. Filter by keyword |
| GET    | `/heartpieces/:id` | —            | Single heart piece by ID            |

### Locations

| Method | Endpoint         | Description                          |
| ------ | ---------------- | ------------------------------------ |
| GET    | `/locations`     | All locations, sorted alphabetically |
| GET    | `/locations/:id` | Single location by ID                |

### Items

| Method | Endpoint     | Query Params    | Description                              |
| ------ | ------------ | --------------- | ---------------------------------------- |
| GET    | `/items`     | `q`, `category` | All items. Filter by keyword or category |
| GET    | `/items/:id` | —               | Single item by ID                        |

**Example requests:**

```bash
# Search skulltulas by keyword
curl "http://localhost:3001/api/goldskulltulas?q=slingshot"

# Filter by location
curl "http://localhost:3001/api/goldskulltulas?location=Forest%20Temple"

# Filter items by category
curl "http://localhost:3001/api/items?category=Medallions"
```

---

## Architecture Decisions

### Why SQLite over JSON files?

The initial implementation read JSON files directly on every request using `readFileSync`. This was replaced with SQLite (`better-sqlite3`) for several reasons:

- **Performance** — the database connection is opened once at startup via a singleton (`db/database.ts`) rather than re-reading files per request
- **Query flexibility** — SQL `LIKE` queries handle partial search across multiple columns cleanly
- **WAL mode** — Write-Ahead Logging is enabled for improved read performance
- **Transactions** — the seed script wraps all inserts in transactions, meaning the database is either fully seeded or not at all

### Why `app.ts` is separate from `index.ts`

The Express application is exported from `app.ts` without calling `listen`. The `index.ts` entry point imports the app and binds it to a port. This separation is a deliberate testing pattern — integration tests import `app.ts` directly and pass it to Supertest, avoiding port conflicts and making tests fully isolated from the running server.

### `useProgress` composable pattern

Progress state is defined outside the composable function itself, making it shared singleton state. Any component calling `useProgress()` gets the same reactive refs — meaning the progress bar in the list view and the collect button on each card stay in sync without Pinia or a global store. The state is watched and persisted to `localStorage` automatically.

### Debounced search

The search input watches the query ref and clears/resets a 300ms timeout before firing the API call. This avoids hammering the API on every keystroke while keeping the UI feeling responsive.

### Centralised API service

All HTTP calls go through `src/services/api.ts`, which creates a single Axios instance with the base URL pulled from the `VITE_API_BASE_URL` environment variable. This means switching between development and production environments requires only a `.env` change.

---

## Testing

### Frontend tests

```bash
npm run test        # watch mode
npm run test:run    # single run
```

Covers:

- `GoldSkulltula.vue` — renders correctly, truncates descriptions, expands on click, location linking
- `HeartPiece.vue` — same coverage
- `useProgress.ts` — toggle logic, percent calculations, reset, localStorage mock

### Backend tests

```bash
cd server
npm run test        # watch mode
npm run test:run    # single run
```

Covers every API endpoint including success cases, 404s, 400s for invalid IDs, search filtering, and location filtering. Tests run against a dedicated `oot.test.db` that is created before the suite and deleted after — the production database is never touched.

---

## Design System

The UI uses a custom dark fantasy design system defined in `src/assets/main.css` via CSS custom properties.

**Typefaces:**

- `Cinzel` — headings, labels, nav, badges (serif with Roman inscription character)
- `Crimson Text` — body copy, descriptions (warm readable serif)

**Core palette:**

```css
--midnight: #0a0d0f /* page background */ --card: #1c2428 /* card surfaces */
  --gold: #c9a84c /* primary accent */ --text-dim: #7a9aaa /* secondary text */
  --red: #b34040 /* heart piece accent */ --green: #3d7a5a /* collected state */;
```

Reusable classes like `.oot-card`, `.btn-gold`, `.oot-input`, `.oot-progress-track`, and `.section-heading` are available globally across all components.
