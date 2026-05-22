import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const search = searchParams.get("search") ?? "";
	const status = searchParams.get("status");

	const students = await prisma.student.findMany({
		where: {
			name: { contains: search, mode: "insensitive" },
			status: status ? (status as any) : undefined,
		},
		include: { programme: true },
		orderBy: { createdAt: "desc" },
	});
	return NextResponse.json(students);
}

export async function POST(req: Request) {
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
