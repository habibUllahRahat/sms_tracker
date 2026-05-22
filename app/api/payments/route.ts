import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const { amount, reference, studentId } = body;
		const payment = await prisma.payment.create({
			data: {
				amount: parseFloat(amount),
				reference,
				studentId,
				date: new Date(),
			},
		});
		return NextResponse.json(payment, { status: 201 });
	} catch (e: unknown) {
		const message = e instanceof Error ? e.message : String(e);
		return NextResponse.json({ error: message }, { status: 400 });
	}
}
