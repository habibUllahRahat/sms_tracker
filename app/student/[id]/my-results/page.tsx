import React from "react";
import { prisma } from "@/lib/prisma";
import AcademicReportList from "@/components/AcademicReportList";

interface PageProps {
	params: {
		id: string;
	};
}

export default async function MyResultsPage({ params }: PageProps) {
	const targetStudent = await prisma.student.findUnique({
		where: {
			id: params.id,
		},
		include: {
			submissions: true,
			grades: true,
		},
	});

	const assessments = await prisma.assessment.findMany({
		orderBy: { deadline: "asc" },
	});

	if (!targetStudent) {
		return (
			<div className='p-8 text-center text-muted-foreground'>
				Unable to verify authenticated student identity context.
			</div>
		);
	}

	const studentData = {
		submissions: targetStudent.submissions.map((s) => ({
			id: s.id,
			assessmentId: s.assessmentId,
			isLate: s.isLate,
			submittedAt: s.submittedAt.toISOString(),
		})),
		grades: targetStudent.grades.map((g) => ({
			id: g.id,
			assessmentId: g.assessmentId,
			score: g.score,
			classification: g.classification,
			published: g.published,
		})),
	};

	const formattedAssessments = assessments.map((a) => ({
		id: a.id,
		title: a.title,
		module: a.module,
		deadline: a.deadline.toISOString(),
	}));

	return (
		<div className='p-8 mx-auto space-y-6'>
			<div>
				<h1 className='text-3xl font-bold tracking-tight'>Academic Performance Reports</h1>
				<p className='text-sm text-muted-foreground'>
					Official grading outputs for published modules.
				</p>
			</div>
			<AcademicReportList studentData={studentData} assessments={formattedAssessments} />
		</div>
	);
}
