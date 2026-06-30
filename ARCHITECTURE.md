# Portfolio Architecture

This project follows the approved incremental build plan: architecture first, then the Home page, then each remaining page one at a time.

## Stack

- Next.js 15 App Router
- React + TypeScript
- Tailwind CSS
- shadcn/ui-compatible component setup
- Framer Motion dependency installed for selective UX animation
- Sanity CMS schemas and query layer prepared
- Supabase API routes prepared but intentionally not connected yet

## Route Map

- `/` Home
- `/about` About
- `/projects` Project index
- `/projects/[slug]` shared route for category slugs and project detail slugs
- `/services` Services and future wizard
- `/contact` Contact

## Content Strategy

The Home page currently renders from typed local content in `src/content`. Those files mirror the future Sanity model, so the components can later switch to Sanity queries without changing their public props or visual structure.

Projects are modeled as CMS content, not hardcoded UI. The required fields are represented in `src/types/project.ts` and `src/sanity/schemas/project.ts`.

## Component Boundaries

- `components/layout`: site-wide shell, navigation, footer, placeholders, decorative image helper.
- `components/sections`: reusable page sections, currently Home sections only.
- `components/projects`: reusable project cards and future project templates.
- `components/services`: reserved for the service wizard and service-specific UI.
- `components/ui`: shadcn/ui-style primitives.

## Design Source

The connected Figma file is the source of truth. Colors, typography names, spacing, and section hierarchy were extracted from the `Diseño` page, especially `Section - Home`.

The custom display font `The Foriene Serif` is referenced by name. For exact production parity, add the licensed font files to `public/fonts` and wire them through `@font-face` in `src/app/globals.css`.
