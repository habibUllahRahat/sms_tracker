import React from "react";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export const dynamic = "force-dynamic";
import {
	Table,
	TableBody,
	TableCell,
	TableHeader,
	TableHead,
	TableRow,
} from "@/components/ui/table";

export default async function MyFeesPage() {
	const currentStudent = await prisma.student.findFirst({
		include: {
			programme: true,
			payments: true,
		},
	});

	if (!currentStudent) {
		return (
			<div className='p-8 text-center text-muted-foreground'>
				Financial profile records unreachable.
			</div>
		);
	}

	const feeAmount = Number(currentStudent.programme.feeAmount);
	const totalPaid = currentStudent.payments.reduce((sum, p) => sum + Number(p.amount), 0);
	const remaining = feeAmount - totalPaid;
	const progressPercent = Math.min((totalPaid / feeAmount) * 100, 100);

	return (
		<div className='p-8 max-w-4xl mx-auto space-y-6'>
			<div>
				<h1 className='text-3xl font-bold tracking-tight'>Personal Financial Statement</h1>
				<p className='text-sm text-muted-foreground'>
					Track dynamic installments and overall balance updates.
				</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Tuition Progress Tracker</CardTitle>
					<CardDescription>{currentStudent.programme.name} Program Path</CardDescription>
				</CardHeader>
				<CardContent className='space-y-6'>
					<div className='space-y-2'>
						<div className='flex justify-between text-sm font-medium'>
							<span>Paid: ${totalPaid}</span>
							<span className='text-muted-foreground'>Total: ${feeAmount}</span>
						</div>
						<Progress value={progressPercent} className='h-2' />
					</div>

					<div className='grid gap-4 sm:grid-cols-2 pt-2'>
						<div className='border p-4 rounded-xl'>
							<span className='text-xs text-muted-foreground block'>
								Account Condition Status
							</span>
							<span className='text-lg font-bold text-emerald-600'>
								Active Good Standing
							</span>
						</div>
						<div className='border p-4 rounded-xl'>
							<span className='text-xs text-muted-foreground block'>
								Outstanding Account Balance
							</span>
							<span className='text-lg font-bold text-destructive'>${remaining}</span>
						</div>
					</div>

					<div className='pt-4'>
						<h3 className='font-semibold text-sm mb-3'>Historical Ledger Receipts</h3>
						<div className='border rounded-lg overflow-hidden'>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Execution Date</TableHead>
										<TableHead>Transaction Code Code</TableHead>
										<TableHead className='text-right'>Amount</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{currentStudent.payments.map((p) => (
										<TableRow key={p.id}>
											<TableCell>{p.date.toLocaleDateString()}</TableCell>
											<TableCell className='font-mono text-xs'>
												{p.reference}
											</TableCell>
											<TableCell className='text-right font-medium text-emerald-600'>
												${Number(p.amount)}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
