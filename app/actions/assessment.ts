"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createAssessmentAction(formData: FormData) {
	try {
		const title = formData.get("title") as string;
		const moduleName = formData.get("module") as string;
		const deadlineInput = formData.get("deadline") as string;

		if (!title || !moduleName || !deadlineInput) {
			return { success: false, error: "All configuration fields are required" };
		}

		await prisma.assessment.create({
			data: {
				title,
				module: moduleName,
				deadline: new Date(deadlineInput),
			},
		});

		revalidatePath("/staff/assessments");
		return { success: true };
	} catch (error: unknown) {
		const message = error instanceof Error ? error.message : String(error);
		return { success: false, error: message };
	}
}
