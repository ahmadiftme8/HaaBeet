# HaaBeet

HaaBeet is a full-stack habit tracker built to help people build routines and keep streaks alive. It is a portfolio project that demonstrates real authentication, persistent data, and a focused product UI end to end.

<!-- Add screenshots here -->

## Tech Stack

- **Next.js 16** — App Router, server and client components
- **React 19** — UI and interactive client surfaces
- **TypeScript** — typed application and data layer
- **Tailwind CSS** — styling and responsive layout
- **TanStack Query** — client-side data fetching and cache
- **Drizzle ORM** — typed SQL and migrations
- **Neon Postgres** — hosted PostgreSQL
- **Auth.js** — session-based authentication (Credentials provider)

## Features

- **Real authentication** — sign up and log in with email/password; sessions managed by Auth.js
- **Habit CRUD** — create, update, and delete habits tied to the signed-in user
- **Daily & weekly frequency** — schedule habits on a daily or weekly rhythm
- **Streak tracking** — consistency tracked over time with a visual calendar
- **Responsive design** — usable on desktop and mobile without a separate app shell

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- [pnpm](https://pnpm.io/)

### Setup

```bash
git clone https://github.com/ahmadiftme8/HaaBeet.git
cd HaaBeet
pnpm install
```

Create a `.env` file in the project root and set:

- `DATABASE_URL`
- `AUTH_SECRET`
- `AUTH_URL`

Then start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Roadmap

Features intentionally deferred for a later iteration:

- Full contribution-style heatmap view
- Focus timer widget
- Sidebar dashboard navigation
- Social / circles features (partially reflected in the schema already)

## Architecture Decisions

Key technical decisions for HaaBeet are documented as Architecture Decision Records under [`/docs/adr`](./docs/adr). Start there if you want the reasoning behind auth, database hosting, and related choices.
