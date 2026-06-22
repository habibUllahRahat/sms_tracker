import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import type { EnrollmentStatus } from "@/app/generated/prisma";

const enrollmentStatusValues = [
	"ENROLLED",
	"DEFERRED",
	"WITHDRAWN",
	"COMPLETED",
] as const;

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const search = searchParams.get("search") ?? "";
	const statusParam = searchParams.get("status");
	const status = statusParam && enrollmentStatusValues.includes(statusParam as EnrollmentStatus)
		? (statusParam as EnrollmentStatus)
		: undefined;

	const students = await prisma.student.findMany({
		where: {
			name: { contains: search, mode: "insensitive" },
			status,
		},
		include: {
			programme: true,
			grades: true,
		},
		orderBy: { createdAt: "desc" },
	});
	return NextResponse.json(students);
}

// POST handler for creating a student
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const year = new Date().getFullYear();

    const lastStudent = await prisma.student.findFirst({
      where: { studentCode: { startsWith: `SMS-${year}-` } },
      orderBy: { studentCode: "desc" },
      select: { studentCode: true },
    });

    let nextSequence = 1;
    if (lastStudent?.studentCode) {
      const parts = lastStudent.studentCode.split("-");
      const lastSequenceNumber = parseInt(parts[2], 10);
      if (!isNaN(lastSequenceNumber)) {
        nextSequence = lastSequenceNumber + 1;
      }
    }

    const studentCode = `SMS-${year}-${String(nextSequence).padStart(4, "0")}`;

    const student = await prisma.student.create({
      data: { ...body, studentCode },
    });

    return NextResponse.json(student, { status: 201 });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
