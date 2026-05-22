import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const programmes = await prisma.programme.findMany({
			orderBy: { name: "asc" },
		});
		return NextResponse.json(programmes);
	} catch (e: unknown) {
		const message = e instanceof Error ? e.message : String(e);
		return NextResponse.json({ error: message }, { status: 400 });
	}
}

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const { name, feeAmount } = body;
		const programme = await prisma.programme.create({
			data: {
				name,
				feeAmount: parseFloat(feeAmount),
			},
		});
		return NextResponse.json(programme, { status: 201 });
	} catch (e: unknown) {
		const message = e instanceof Error ? e.message : String(e);
		return NextResponse.json({ error: message }, { status: 400 });
	}
}
