# Agent Instructions (AGENTS.md)

Welcome! This file provides essential guidelines and context for any AI agents or developers working in this repository.

## Project Overview

Storyteller Studio is a 5W short-form video creator. Users structure a story as five beats (WHO, WHAT, WHERE, WHEN, WHY), pick a visual style, and preview an animated mockup.

## Architecture

This is a full-stack monorepo application containing both the frontend and backend in a single package.
- **Frontend (`client/`)**: React Single Page Application built with Vite.
- **Backend (`server/`)**: Express server that serves both the API (`/api/*`) and acts as a Vite dev-server middleware in development.
- **Shared (`shared/`)**: Types, schemas, and logic shared between client and server (e.g., Drizzle/PostgreSQL schemas).
- **Scripts (`script/`)**: Build scripts (Vite + esbuild).
- **Assets (`attached_assets/`)**: Static assets referenced at build time.

## Key Technologies
- **Frontend**: React, Vite, Tailwind CSS v4, shadcn/ui (Radix primitives), Framer Motion, wouter, TanStack Query.
- **Backend**: Express, Drizzle ORM (PostgreSQL).

## Path Aliases
When importing, use the following aliases to avoid relative paths:
- `@/*` resolves to `client/src/*`
- `@shared/*` resolves to `shared/*`
- `@assets/*` resolves to `attached_assets/*`

## Commands to Know

- `npm run dev`: Starts the development server on port 5000 (Express + Vite). Use this for all development.
- `npm run check`: Runs TypeScript type checking.
- `npm run build`: Orchestrates the production build (Vite to `dist/public`, esbuild to `dist/index.cjs`).
- `npm start`: Runs the production build.
- `npm run db:push`: Syncs Drizzle schema changes to PostgreSQL.

## Development Guidelines

### Database & Storage
- Do not write raw SQL queries unless absolutely necessary. Use **Drizzle ORM**.
- The main database schema is located in `shared/schema.ts`.
- `server/storage.ts` provides an `IStorage` interface. Ensure that any database implementation conforms to this interface, so components stay decoupled from the concrete implementation (e.g., swapping `MemStorage` for PostgreSQL).
- To test DB connectivity, ensure the `DATABASE_URL` environment variable is set.

### Client-Side State & API
- Local component state is handled via React's `useState` (e.g., in `client/src/pages/home.tsx`).
- For API interactions, use TanStack React Query along with the `apiRequest` helper located in `client/src/lib/queryClient.ts`.
- Domain types (e.g., `StoryBeat`, `MotionStyle`) currently live in `client/src/lib/story-types.ts`. If they need to be shared with the backend, move them to `shared/schema.ts`.

### Styling & UI
- Use **shadcn/ui** components located in `client/src/components/ui/` rather than building raw elements, whenever applicable.
- Tailwind CSS v4 is used (there is no `tailwind.config.js`).

## Common Pitfalls
- When modifying the backend, ensure all new API routes are registered in `server/routes.ts` under the `/api` prefix.
- The `dist/` directory contains build artifacts. Never edit files in this folder directly; trace them back to `client/` or `server/` and rebuild.
- If you run into "port already in use" errors, you may need to kill existing Node processes listening on port 5000 (`kill $(lsof -t -i :5000)`).
