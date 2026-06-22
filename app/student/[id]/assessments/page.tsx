import React from "react";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import SubmissionUploader from "@/components/SubmissionUploader";

export const dynamic = "force-dynamic";

type Props = {
	params: Promise<{ id: string }>;
};

export default async function StudentAssessmentsPage({ params }: Props) {
	const resolvedParams = await params;
	const targetId = String(resolvedParams.id).trim();

	const currentStudent = await prisma.student.findFirst({
		where: {
			OR: [{ id: targetId }, { studentCode: targetId }],
		},
	});

	if (!currentStudent) {
		notFound();
	}

	const openAssessments = await prisma.assessment.findMany({
		orderBy: { deadline: "asc" },
	});

	if (openAssessments.length === 0) {
		return (
			<div className='p-8 text-center text-muted-foreground'>
				Operational artifacts missing. Run your data baseline context seed script.
			</div>
		);
	}

	const now = new Date();

	return (
		<div className='p-8 max-w-5xl mx-auto space-y-6'>
			<div>
				<h1 className='text-3xl font-bold tracking-tight'>Active Assessments</h1>
				<p className='text-sm text-muted-foreground'>
					Upload deliverable configurations before strict timeline markers.
				</p>
			</div>

			<div className='grid gap-6'>
				{openAssessments.map((assessment) => {
					const isOverdue = now > new Date(assessment.deadline);
					return (
						<div
							key={assessment.id}
							className='border p-6 rounded-xl bg-card flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs'
						>
							<div className='space-y-1.5'>
								<div className='flex items-center gap-2'>
									<span className='text-xs font-semibold text-indigo-600 uppercase tracking-wider'>
										{assessment.module}
									</span>
									{isOverdue ? (
										<span className='text-[10px] bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-full font-medium'>
											Late Grace Period Active
										</span>
									) : (
										<span className='text-[10px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full font-medium'>
											Active Submission Open
										</span>
									)}
								</div>
								<h2 className='text-lg font-bold'>{assessment.title}</h2>
								<p className='text-xs text-muted-foreground'>
									Target Due: {new Date(assessment.deadline).toLocaleString()}
								</p>
							</div>

							<div className='w-full md:w-auto'>
								<SubmissionUploader
									studentId={currentStudent.id}
									assessmentId={assessment.id}
								/>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
