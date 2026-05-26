# SMS Tracker

**Student Management System** — built for Planet Education Network as an assessment submission.

An academic tracking platform that manages student enrollment, course milestones, assessment
grading, and file submissions using the Next.js App Router, Prisma ORM, and PostgreSQL.

---

## Tech Stack

| Layer         | Technology                                   |
| ------------- | -------------------------------------------- |
| Framework     | Next.js 15 (App Router, Turbopack)           |
| Language      | TypeScript                                   |
| Database      | PostgreSQL                                   |
| ORM           | Prisma 6                                     |
| Styling       | Tailwind CSS v4                              |
| UI Components | shadcn/ui (radix-nova style) + Aceternity UI |
| Icons         | Tabler Icons + Lucide React                  |
| Animation     | Motion (Framer Motion v12)                   |
| Runtime       | Node.js 18+                                  |

---

## Features

- Student enrollment and profile tracking
- Course milestone and module monitoring
- Assessment and submission management
- File upload pipeline with server-side validation
- Live dashboard with automatic cache revalidation
- Route-based navigation via middleware (staff and student views)

---

## Project Structure

```
sms_tracker/
├── app/
│   ├── student/
│   │   └── [id]/
│   │       └── assessments/
│   ├── staff/
│   ├── actions/          # Server Actions (mutations + revalidation)
│   ├── api/              # API routes (e.g. /api/students)
│   └── page.tsx
├── components/
│   └── ui/               # shadcn/ui component library
├── lib/
│   └── utils.ts
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── public/
│   └── uploads/          # Local file storage
└── middleware.ts          # Route redirect logic
```

---

## System Architecture

```mermaid
flowchart TD
    A[Browser] --> B[middleware.ts]
    B -->|root to staff| C[Staff Dashboard]
    B -->|student to student-id| D[Student View]

    C --> E[Next.js Server Component]
    D --> E

    E --> F[Prisma Query Engine]

    F --> G[(PostgreSQL)]

    G --> H[Server Actions]
    H --> I[public uploads folder]
    H --> J[revalidatePath]
    J --> K[Cache Cleared - Fresh UI]
```

---

## File Upload Pipeline

```mermaid
flowchart LR
    A[Client selects file] --> B[Server Action triggered]
    B --> C[File validation]
    C --> D[Save to public uploads]
    D --> E[Create DB record via Prisma]
    E --> F[revalidatePath called]
    F --> G[Dashboard updates instantly]
```

---

## Assessment Submission Flow

```mermaid
sequenceDiagram
    participant Student
    participant Client
    participant ServerAction
    participant Prisma
    participant DB

    Student->>Client: Upload file for assessment
    Client->>ServerAction: Submit FormData with assessmentId and studentId
    ServerAction->>Prisma: createSubmission(assessmentId, studentId, filePath)
    Prisma->>DB: INSERT submission record
    DB-->>Prisma: OK
    Prisma-->>ServerAction: Submission created
    ServerAction->>ServerAction: revalidatePath for student assessments page
    ServerAction-->>Client: Updated dashboard - no manual refresh needed
```

---

## Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/habibUllahRahat/sms_tracker.git
cd sms_tracker
npm install
```

### 2. Environment Variables

Create a `.env` file in the root:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
```

### 3. Prisma Setup

```bash
npx prisma generate
npx prisma migrate dev
npx prisma db seed      # optional: seed initial data
```

### 4. Run Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to `/staff`
automatically.

---

## Middleware Behaviour

`middleware.ts` handles two redirect rules:

- `/` → `/staff`
- `/student` → `/student/<first-student-id>` (fetched from `/api/students`)

There is no authentication layer in the current version.

---

## AI Usage

This project was built with the assistance of AI tools in the following ways:

### 1. Architecture Decisions & Debugging

Claude (Anthropic) was used to reason through Next.js App Router patterns — specifically around when
to use Server Components vs Client Components, how `revalidatePath` interacts with cached layouts
after Server Action mutations, and how to correctly bind database UUIDs in mapped component lists to
avoid wrong foreign key writes.

### 2. Prisma Schema & Query Design

Claude was used to design the relational schema (Students → Programmes → Assessments → Submissions)
and generate type-safe Prisma queries with the correct `include` and `select` shapes for each page's
data requirements.

### 3. Debugging Stale State & Cache Issues

Claude helped diagnose and fix three recurring issues during development: route 404s after directory
restructuring (stale `.next` cache), submission counters not updating after mutations (missing
`revalidatePath`), and file uploads writing to the wrong student record (index-based vs UUID-based
prop passing in mapped components).

> AI was used as a reasoning and debugging tool. All code was reviewed, understood, and integrated
> manually.

---

## Known Limitations

- **File storage** — uploads saved to `/public/uploads` (local only, not production-ready; S3/R2
  recommended)
- **No authentication** — routes are not protected; middleware only handles redirects
- **No tests** — no unit or integration test coverage currently
- **No pagination** — all assessments and submissions are fetched in a single query

---

## Production Build

```bash
npm run build
npm run start
```

Requires Node.js 18+, a running PostgreSQL instance, and a writable `public/uploads/` directory.

---

## License

MIT — intended for academic and internal educational management workflows.
