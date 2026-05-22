import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const { title, module, deadline } = body;
		const assessment = await prisma.assessment.create({
			data: {
				title,
				module,
				deadline: new Date(deadline),
			},
		});
		return NextResponse.json(assessment, { status: 201 });
	} catch (e: unknown) {
		const message = e instanceof Error ? e.message : String(e);
		return NextResponse.json({ error: message }, { status: 400 });
	}
}

export async function GET() {
	try {
		const assessments = await prisma.assessment.findMany({
			orderBy: { deadline: "asc" },
		});
		return NextResponse.json(assessments);
	} catch (e: unknown) {
		const message = e instanceof Error ? e.message : String(e);
		return NextResponse.json({ error: message }, { status: 400 });
	}
}
