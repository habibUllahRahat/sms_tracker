# SMS Tracker

Student Management & Assessment Delivery Engine built with the Next.js App Router, Prisma ORM, and
PostgreSQL.

---

## Overview

SMS Tracker is a performance-focused academic tracking platform designed to manage:

- Student enrollment tracking
- Course milestone monitoring
- Assessment and module grading
- File and asset submissions
- Live dashboard updates
- Server-side data workflows

The system uses modern Next.js architecture with Server Components, Server Actions, Prisma ORM, and
PostgreSQL.

---

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI
- **Icons:** Tabler Icons
- **Runtime:** Node.js

---

## Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd sms-tracker
```

### 2. Install Dependencies

```bash
npm install
```

Or use:

```bash
yarn install
# or
pnpm install
# or
bun install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
```

---

## Prisma Setup

### Generate Prisma Client

```bash
npx prisma generate
```

### Run Database Migrations

```bash
npx prisma migrate dev
```

### Open Prisma Studio

```bash
npx prisma studio
```

---

## Run the Development Server

```bash
npm run dev
```

Then open:

```txt
http://localhost:3000
```

---

## Project Structure

```txt
app/
├── student/
│   └── [id]/
│       └── assessments/
├── actions/
├── components/
├── generated/
│   └── prisma/
├── lib/
├── public/
│   └── uploads/
└── page.tsx
```

---

# System Architecture & Data Flow

```mermaid
flowchart TD
    A[Browser Client] --> B[Dynamic Route Input]
    B --> C["/student/[id]/assessments"]

    C --> D[Next.js Server Component]

    D --> E[Params Validation Layer]
    E --> F[Cleans Student IDs]

    D --> G[Prisma Query Engine]

    G --> H[Students]
    G --> I[Assessments]
    G --> J[Submissions]
    G --> K[Programme Relations]

    G --> L[(PostgreSQL Database)]

    L --> M[Server Actions & Mutations]

    M --> N["/public/uploads"]

    M --> O["revalidatePath"]

    O --> P[Cache Revalidation]
```

---

# File Upload Pipeline

```mermaid
flowchart LR
    A[Client Upload]
        --> B[Server Action]
        --> C[Validation]
        --> D[Filesystem Storage]
        --> E[Database Record Creation]
        --> F[revalidatePath]
        --> G[Fresh UI Update]
```

---

# Student Assessment Workflow

```mermaid
sequenceDiagram
    participant Student
    participant Client
    participant Server
    participant Prisma
    participant DB

    Student->>Client: Upload Assessment
    Client->>Server: Submit FormData
    Server->>Prisma: Create Submission Record
    Prisma->>DB: Insert Data
    DB-->>Prisma: Success
    Prisma-->>Server: Updated Result
    Server->>Server: revalidatePath()
    Server-->>Client: Updated Dashboard
```

---

# Common Next.js + Prisma Issues

## 1. Route Segment Path Mismatch

### Problem

After moving folders inside the `app/` directory, Next.js may still reference stale route bundles
and throw 404 or missing file errors.

### Solution

Clear the cache and restart the TypeScript server:

```bash
rm -rf .next
npm run dev
```

---

## 2. Stale Relational Counters

### Problem

Server Actions update the database correctly, but UI counters such as:

```ts
student.submissions.length;
```

do not update immediately.

### Solution

Use `revalidatePath()` after mutations:

```ts
import { revalidatePath } from "next/cache";

revalidatePath(`/student/${studentId}/assessments`);
```

Optional:

```ts
export const dynamic = "force-dynamic";
```

---

## 3. Wrong Foreign Key Bindings

### Problem

Mapped arrays may accidentally pass incorrect IDs during uploads or mutations.

### Bad Example

```tsx
openAssessments.map((assessment, index) => <UploadButton key={index} />);
```

### Correct Example

```tsx
openAssessments.map((assessment) => (
	<UploadButton key={assessment.id} assessmentId={assessment.id} studentId={student.id} />
));
```

Always bind real database UUIDs directly.

---

# Deployment

## Build Production App

```bash
npm run build
```

## Start Production Server

```bash
npm run start
```

---

# Environment Requirements

- Node.js 18+
- PostgreSQL database
- Prisma configured correctly
- Writable uploads directory

---

# Learn More

## Next.js

- https://nextjs.org/docs
- https://nextjs.org/learn

## Prisma

- https://www.prisma.io/docs

## PostgreSQL

- https://www.postgresql.org/docs/

---

# License

This project is intended for academic and internal educational management workflows.
