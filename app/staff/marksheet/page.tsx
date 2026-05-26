import React from "react";
import { prisma } from "@/lib/prisma";
import MarksheetGrid from "@/components/MarksheetGrid";

export default async function MarksheetPage() {
	const currentAssessment = await prisma.assessment.findFirst();

	if (!currentAssessment) {
		return (
			<div className='p-8 text-center text-muted-foreground'>
				No assessments found. Build an assessment setup row inside your database tables
				first.
			</div>
		);
	}

	return (
		<div className='p-8 w-full mx-auto space-y-6'>
			<div>
				<h1 className='text-3xl font-bold tracking-tight'>Academic Marksheet Matrix</h1>
				<p className='text-sm text-muted-foreground'>
					Grade evaluation grid for:{" "}
					<span className='font-semibold'>{currentAssessment.title}</span> (
					{currentAssessment.module})
				</p>
			</div>
			<MarksheetGrid assessmentId={currentAssessment.id} />
		</div>
	);
}
