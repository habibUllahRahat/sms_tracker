import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const { score, classification, studentId, assessmentId } = body;
		const grade = await prisma.grade.upsert({
			where: {
				studentId_assessmentId: { studentId, assessmentId },
			},
			update: {
				score: parseInt(score, 10),
				classification,
				published: true,
			},
			create: {
				score: parseInt(score, 10),
				classification,
				studentId,
				assessmentId,
				published: true,
			},
		});
		return NextResponse.json(grade);
	} catch (e: unknown) {
		const message = e instanceof Error ? e.message : String(e);
		return NextResponse.json({ error: message }, { status: 400 });
	}
}
