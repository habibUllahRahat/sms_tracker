import React from "react";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconUsers, IconCreditCard, IconFileText } from "@tabler/icons-react";

export const dynamic = "force-dynamic";

export default async function StaffDashboardPage() {
	const studentCount = await prisma.student.count();
	const paymentSum = await prisma.payment.aggregate({ _sum: { amount: true } });
	const assessmentCount = await prisma.assessment.count();

	return (
		<div className='p-8 w-full mx-auto space-y-6'>
			<div>
				<h1 className='text-3xl font-bold tracking-tight'>Staff Overview</h1>
				<p className='text-sm text-muted-foreground'>
					Operational heartbeat and metrics dashboard.
				</p>
			</div>

			<div className='grid gap-4 md:grid-cols-3'>
				<Card>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium'>Total Active Students</CardTitle>
						<IconUsers className='h-4 w-4 text-muted-foreground' />
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold'>{studentCount}</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium'>Collected Revenue</CardTitle>
						<IconCreditCard className='h-4 w-4 text-muted-foreground' />
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold'>
							${Number(paymentSum._sum.amount || 0)}
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium'>Active Assessments</CardTitle>
						<IconFileText className='h-4 w-4 text-muted-foreground' />
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold'>{assessmentCount}</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
