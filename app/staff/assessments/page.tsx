import React from "react";
import { prisma } from "@/lib/prisma";
import AssessmentCreationForm from "@/components/AssessmentCreationForm";

export default async function StaffAssessmentsManagementPage() {
	const assessments = await prisma.assessment.findMany({
		orderBy: { deadline: "desc" },
	});

	return (
		<div className='p-8 max-w-5xl mx-auto space-y-6'>
			<div className='flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-5'>
				<div>
					<h1 className='text-3xl font-bold tracking-tight'>Assessment Settings</h1>
					<p className='text-sm text-muted-foreground'>
						Configure global course milestones, evaluation rules, and target submission
						dates.
					</p>
				</div>
				<AssessmentCreationForm />
			</div>

			<div className='border rounded-xl bg-card overflow-hidden'>
				<div className='p-4 bg-muted/20 font-medium text-sm border-b'>
					Active Evaluated Milestones
				</div>
				<div className='divide-y'>
					{assessments.length === 0 ? (
						<div className='p-8 text-center text-sm text-muted-foreground'>
							No institutional assessments initialized yet.
						</div>
					) : (
						assessments.map((item) => (
							<div
								key={item.id}
								className='p-4 flex items-center justify-between gap-4 text-sm'
							>
								<div>
									<span className='text-xs font-mono bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded mr-2 font-semibold'>
										{item.module}
									</span>
									<span className='font-semibold'>{item.title}</span>
								</div>
								<div className='text-xs text-muted-foreground'>
									Deadline: {new Date(item.deadline).toLocaleString()}
								</div>
							</div>
						))
					)}
				</div>
			</div>
		</div>
	);
}
