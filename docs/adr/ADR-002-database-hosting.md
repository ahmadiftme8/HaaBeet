# ADR-002: Database Hosting

## Status

Accepted

## Context

This project was originally scaffolded with a local SQLite file (`dev.db`) for development, with Drizzle ORM initially configured for the MySQL dialect. The app needed to be deployed to Vercel, which does not support persistent local file writes or a self-hosted MySQL instance on a free tier. A hosted, serverless-compatible database was required so that local development and production could share the same real data source.

## Options Considered

1. **Keep MySQL, find a free MySQL-compatible host (e.g. PlanetScale)** — Stay on the existing MySQL dialect and point Drizzle at a hosted MySQL service. PlanetScale removed its free tier in 2024, making this option impractical without a paid plan.
2. **Neon (Postgres), serverless with a genuinely free tier and native Vercel integration** — Migrate the schema to Postgres and use Neon's serverless Postgres with first-class Vercel Storage integration.
3. **Supabase (Postgres), also free-tier, but with more bundled features (auth, storage) not needed for this project's current scope** — Adopt Supabase as the Postgres host; its auth and storage offerings add surface area we do not need while Auth.js already covers authentication.

## Decision

Adopt **Neon Postgres**, integrated via **Vercel's Storage tab**.

## Reasoning

Neon's free tier is reliable and generous enough for a portfolio project. Its serverless architecture with database branching reflects current industry-standard practice worth demonstrating in this codebase. Native Vercel integration minimizes deployment friction, and the switch required only a schema dialect migration (`mysqlTable` → `pgTable`) rather than a full application rewrite.

## Consequences

The migration required converting all schema types from MySQL to Postgres syntax, including fixing an invalid composite primary key definition on the `circle_members` table. Local development and production now share the same live database rather than being fully isolated environments.
