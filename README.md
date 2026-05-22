# SMS Tracker — Student Management & Assessment Delivery Engine

A performance-focused academic tracking system built with the Next.js App Router, Prisma ORM, and
PostgreSQL. The application manages student enrollment tracking, course milestones, module grade
management, and live asset submission pipelines.

This project was bootstrapped using create-next-app
(https://nextjs.org/docs/app/api-reference/cli/create-next-app).

---

## Getting Started

### 1. Run the Development Server

Execute one of the following commands in your terminal to start up the local development runtime:

npm run dev

# or

yarn dev

# or

pnpm dev

# or

bun dev

Open http://localhost:3000 with your browser to see the result.

You can start editing the page by modifying app/page.tsx. The page auto-updates as you edit the
file.

This project uses next/font (https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
to automatically optimize and load Geist, a modern font family optimized for web and UI tracking
layouts.

---

## System Architecture & Data Flow

Below is the execution flow detailing how a dynamic parameter maps to a clean Prisma query,
alongside server mutation validation safeguards:

[Browser Client Viewport] │ ▼ (Dynamic Route Input: /student/[id]/assessments) [Next.js Server
Component Layer] │ ├─► [Params Validation Layer] ──► Trims, cleans, and casts incoming ID strings │
│ ├─► [Prisma Client Query Engine] ◄──────────┘ │ │ │ ▼ Fetches Student + Submissions + Programme
Relational Trees └─► [PostgreSQL Database Storage] │ ▼ Mutations & File Storage executed via Server
Actions [File System: /public/uploads] ◄─── [revalidatePath Engine] forces instant cache eviction

---

## AI Debugging Protocols: Fixing Core Architectural Issues

When collaborating with an AI assistant to patch runtime errors or synchronization anomalies, use
these precise context blueprints to fix the three most common Next.js/Prisma state issues
immediately.

### 1. The Route Segment Path Mismatch (404 / Missing Files)

- The Problem: Moving or restructuring directory routes inside the app/ folder using a shell
  terminal leaves Next.js background compilation layers looking for stale layout paths, causing
  active requests to drop with 404 tracking codes.
- AI Prompt Context Blueprint:
    > "I just restructured my dynamic folders from app/old-route to app/student/[id]/new-route using
    > the terminal. The editor is throwing file-not-found errors on the old path matching \*_/_.tsx.
    > Provide the exact terminal sequence to flush the bundler compilation cache and restart the
    > internal TypeScript language server framework."

### 2. Stale Relational Counters (UI Count Not Updating)

- The Problem: Mutating data with a Server Action saves records to the database perfectly, but
  parent server layouts do not increment arrays (e.g., student.submissions.length) due to Next.js
  aggressively caching the dynamic path wrapper.
- AI Prompt Context Blueprint:
    > "My Prisma action successfully upserts an asset record to the database table, but my server
    > dashboard element keeps displaying the stale array length count until I force a browser window
    > refresh. Write the cache revalidation strategy using revalidatePath and page-level dynamic
    > export overrides to force fresh data reads on every request layout render."

### 3. Loop Iteration Context Drifts (Writing to the Wrong Row ID)

- The Problem: In mapped arrays (openAssessments.map), passing ambient context pointers or indexing
  variables causes frontend upload scripts to send a completely different student's database
  identifier key to the server action layer.
- AI Prompt Context Blueprint:
    > "My multi-tenant assessment mapping loop is executing file uploads successfully, but the
    > foreign key relation is saving against a completely different student record row. Refactor my
    > dynamic page map component to bind strict database UUID values directly to the client prop
    > interface wrapper to ensure isolation."

---

## Learn More

To learn more about Next.js, take a look at the following resources:

- Next.js Documentation (https://nextjs.org/docs) - learn about Next.js features and API.
- Learn Next.js (https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out the Next.js GitHub repository (https://github.com/vercel/next.js) - your feedback
and contributions are welcome!

---

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the Vercel Platform
(https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)
from the creators of Next.js.

Check out our Next.js deployment documentation (https://docs.nestjs.com/) for more details.

---

## Tech Stack & Configurations

- Framework: Next.js (App Router, Server Actions)
- Database Tooling: Prisma ORM with custom generated paths (app/generated/prisma)
- Database: PostgreSQL
- Styling: TailwindCSS with Radix UI primitives & Tabler Icons
- Runtime: Node.js environment
