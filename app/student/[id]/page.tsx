import React from "react";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconSchool, IconClock, IconAward } from "@tabler/icons-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Props = {
	params: Promise<{ id: string }>;
};

export default async function StudentIdDashboardPage({ params }: Props) {
	const resolvedParams = await params;
	const rawId = resolvedParams.id;

	const student = await prisma.student.findUnique({
		where: { id: resolvedParams.id },
		include: {
			programme: true,
			submissions: true,
			grades: true,
		},
	});

	if (!student) {
		notFound();
	}

	return (
		<div className='p-8 max-w-7xl mx-auto space-y-6'>
			<div>
				<h1 className='text-3xl font-bold tracking-tight'>Welcome back, {student.name}</h1>
				<p className='text-sm text-muted-foreground'>
					ID Tracking Code: {student.studentCode}
				</p>
			</div>

			<div className='w-full grid gap-4 md:grid-cols-3'>
				<Card>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium'>My Programme</CardTitle>
						<IconSchool className='h-4 w-4 text-muted-foreground' />
					</CardHeader>
					<CardContent>
						<div className='text-lg font-bold'>
							{student.programme?.name || "Unassigned"}
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium'>Completed Submissions</CardTitle>
						<IconClock className='h-4 w-4 text-muted-foreground' />
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold'>
							{student.submissions ? student.submissions.length : 0}
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium'>Graded Modules</CardTitle>
						<IconAward className='h-4 w-4 text-muted-foreground' />
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold'>
							{student.grades ? student.grades.filter((g) => g.published).length : 0}
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
