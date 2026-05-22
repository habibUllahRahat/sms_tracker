"use server";

import { prisma } from "../../lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { revalidatePath } from "next/cache";

export async function uploadAssignmentAction(formData: FormData) {
	try {
		const file = formData.get("file") as File;
		const studentId = formData.get("studentId") as string;
		const assessmentId = formData.get("assessmentId") as string;

		if (!file || !studentId || !assessmentId) {
			return { success: false, error: "Missing required upload parameters" };
		}

		const bytes = await file.arrayBuffer();
		const buffer = new Uint8Array(bytes);

		const relativeUploadDir = "/uploads";
		const uploadDir = join(process.cwd(), "public", relativeUploadDir);

		await mkdir(uploadDir, { recursive: true });

		const uniqueFileName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
		const filePath = join(uploadDir, uniqueFileName);

		await writeFile(filePath, buffer);
		const fileUrl = `${relativeUploadDir}/${uniqueFileName}`;

		const assessment = await prisma.assessment.findUnique({
			where: { id: String(assessmentId) },
			select: { deadline: true },
		});

		const isLate = assessment ? new Date() > new Date(assessment.deadline) : false;

		await prisma.submission.upsert({
			where: {
				studentId_assessmentId: {
					studentId: String(studentId),
					assessmentId: String(assessmentId),
				},
			},
			update: {
				fileUrl,
				fileName: file.name,
				isLate,
				submittedAt: new Date(),
			},
			create: {
				studentId: String(studentId),
				assessmentId: String(assessmentId),
				fileUrl,
				fileName: file.name,
				isLate,
			},
		});

		revalidatePath(`/student/${studentId}`);
		revalidatePath(`/student/${studentId}/assessments`);

		return { success: true };
	} catch (error: unknown) {
		const message = error instanceof Error ? error.message : String(error);
		return { success: false, error: message };
	}
}
