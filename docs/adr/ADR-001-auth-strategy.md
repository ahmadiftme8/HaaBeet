# ADR-001: Authentication Strategy

## Status

Accepted

## Context

HaaBeet is a Next.js 16 + React 19 + TypeScript application backed by Drizzle ORM and MySQL. The database already has a `users` table with a `password_hash` column, but the app does not perform real authentication—it routes requests using a hardcoded demo user ID. This leaves session management, credential verification, and user identity unresolved for any production or portfolio review scenario.

## Options Considered

1. **Hand-rolled JWT/session auth** — Implement custom login, token or cookie sessions, and middleware entirely in-house against the existing `users` table.
2. **Auth.js (NextAuth) with Credentials provider** — Use Auth.js with a Credentials provider that validates email/password against the existing Drizzle `users` table and `bcryptjs`.
3. **Hosted auth (Clerk/Auth0)** — Delegate authentication to a third-party service with prebuilt UI, social login, and managed sessions.

## Decision

Adopt **Auth.js with a Credentials provider**, validating users against the existing Drizzle `users` table and comparing passwords with **bcryptjs** (already a project dependency).

## Reasoning

This approach keeps user data and credentials in our own MySQL database, which aligns with how the schema and seed data are already structured. Auth.js handles session security, CSRF protection, and Next.js integration without us reinventing those primitives. For a portfolio project, avoiding hosted-auth vendor lock-in also makes it easier for reviewers to inspect the database layer and auth flow end to end.

## Consequences

For v1 we forgo social login and the hosted sign-in UI that Clerk or Auth0 would provide; login and registration must be implemented in the app.
