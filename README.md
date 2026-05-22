This is a [Next.js](https://nextjs.org) project bootstrapped with
[`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the
file.

This project uses
[`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to
automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback
and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the
[Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)
from the creators of Next.js.

Check out our
[Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying)
for more details.

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>SMS Tracker Documentation - README</title>
    <style>
        @page {
            size: A4;
            margin: 20mm 15mm;
            background-color: #ffffff;
        }
        
        * {
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            color: #1f2937;
            line-height: 1.6;
            font-size: 11pt;
            margin: 0;
            padding: 0;
        }
        
        .header-container {
            border-bottom: 2px solid #e5e7eb;
            padding-bottom: 15px;
            margin-bottom: 30px;
        }
        
        h1 {
            font-size: 24pt;
            color: #111827;
            margin: 0 0 8px 0;
            font-weight: 800;
            letter-spacing: -0.025em;
        }
        
        p.subtitle {
            font-size: 12pt;
            color: #4b5563;
            margin: 0;
        }
        
        h2 {
            font-size: 15pt;
            color: #1f2937;
            margin-top: 35px;
            margin-bottom: 15px;
            font-weight: 700;
            border-left: 4px solid #4f46e5;
            padding-left: 10px;
            page-break-after: avoid;
        }
        
        h3 {
            font-size: 12pt;
            color: #4f46e5;
            margin-top: 20px;
            margin-bottom: 8px;
            font-weight: 600;
            page-break-after: avoid;
        }
        
        .graph-container {
            background-color: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 20px;
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
            font-size: 9.5pt;
            color: #23272e;
            white-space: pre;
            margin: 20px 0;
            line-height: 1.5;
        }
        
        .blueprint-card {
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 15px;
            margin-top: 10px;
            margin-bottom: 20px;
            page-break-inside: avoid;
        }
        
        .blueprint-title {
            font-size: 10pt;
            font-weight: 700;
            color: #334155;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 6px;
        }
        
        .blueprint-quote {
            font-style: italic;
            color: #475569;
            border-left: 3px solid #cbd5e1;
            padding-left: 12px;
            margin: 0;
        }
        
        ul {
            margin: 0 0 20px 0;
            padding-left: 20px;
        }
        
        li {
            margin-bottom: 6px;
        }
        
        strong {
            color: #111827;
        }
        
        .tech-list {
            display: block;
            margin-top: 15px;
        }
        
        .tech-item {
            padding: 4px 0;
            border-bottom: 1px solid #f3f4f6;
        }
    </style>
</head>
<body>

    <div class="header-container">
        <h1>SMS Tracker</h1>
        <p class="subtitle">Student Management & Assessment Delivery Engine Documentation</p>
    </div>

    <p>A performance-focused academic tracking system built with the Next.js App Router, Prisma ORM, and PostgreSQL. The application manages student enrollment tracking, course milestones, module grade management, and live asset submission pipelines.</p>

    <h2>System Architecture & Data Flow Graph</h2>

    <div class="graph-container">[Browser Client]
       │
       ▼ (Dynamic Route Input: /student/[id]/assessments)

[Next.js Server Component] │ ├─► [Params Validation Layer] ──► (Trims & Cleans ID/StudentCode) │ │
├─► [Prisma Client Query Engine] ◄────────┘ │ │ │ ▼ (Fetches: Student + Submissions + Programme
Relational Trees) └─► [Database Storage: PostgreSQL] │ ▼ (Mutations & File Storage via Server
Actions) [File System: /public/uploads] ◄─── [revalidatePath Engine] (Triggers Instant Cache
Eviction)</div>

    <h2>AI Debugging Protocols: Fixing Core Architectural Issues</h2>
    <p>When collaborating with an AI assistant to patch runtime or system boundary bugs, use these specific context blueprints to fix the three most common Next.js/Prisma state issues immediately.</p>

    <h3>1. The Route Segment Path Mismatch (404 / Missing Files)</h3>
    <p><strong>The Problem:</strong> Moving route paths inside the <code>app/</code> folder using a shell terminal leaves Next.js memory bundles looking for stale layout files, causing standard actions to drop with 404 compilation codes.</p>

    <div class="blueprint-card">
        <div class="blueprint-title">AI Prompt Context Blueprint</div>
        <p class="blueprint-quote">"I just restructured my dynamic folders from app/old-route to app/student/[id]/new-route using the terminal. The editor is throwing file-not-found errors on the old path matching **/*.tsx. Provide the exact terminal sequence to flush the bundler compilation cache and restart the internal TypeScript language server framework."</p>
    </div>

    <h3>2. Stale Relational Counters (UI Count Not Updating)</h3>
    <p><strong>The Problem:</strong> Mutating data with a Server Action saves records to the database perfectly, but parent server layouts do not increment arrays (e.g., <code>student.submissions.length</code>) due to Next.js aggressively caching the dynamic path wrapper.</p>

    <div class="blueprint-card">
        <div class="blueprint-title">AI Prompt Context Blueprint</div>
        <p class="blueprint-quote">"My Prisma action successfully upserts an asset record to the database table, but my server dashboard element keeps displaying the stale array length count until I force a browser window refresh. Write the cache revalidation strategy using revalidatePath and page-level dynamic export overrides to force fresh data reads on every request layout render."</p>
    </div>

    <h3>3. Loop Iteration Context Drifts (Writing to the Wrong Row ID)</h3>
    <p><strong>The Problem:</strong> In mapped arrays (<code>openAssessments.map</code>), passing ambient context pointers or indexing variables causes frontend upload scripts to send a completely different student's database identifier key to the server action layer.</p>

    <div class="blueprint-card">
        <div class="blueprint-title">AI Prompt Context Blueprint</div>
        <p class="blueprint-quote">"My multi-tenant assessment mapping loop is executing file uploads successfully, but the foreign key relation is saving against a completely different student record row. Refactor my dynamic page map component to bind strict database UUID values directly to the client prop interface wrapper to ensure isolation."</p>
    </div>

    <h2>Tech Stack & Configurations</h2>
    <div class="tech-list">
        <div class="tech-item"><strong>Framework:</strong> Next.js (App Router, Server Actions)</div>
        <div class="tech-item"><strong>Database Tooling:</strong> Prisma ORM with custom generated paths (<code>app/generated/prisma</code>)</div>
        <div class="tech-item"><strong>Database:</strong> PostgreSQL</div>
        <div class="tech-item"><strong>Styling:</strong> TailwindCSS with Radix UI primitives & Tabler Icons</div>
        <div class="tech-item"><strong>Runtime:</strong> Node.js environment</div>
    </div>

</body>
</html>
