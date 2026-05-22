import React from "react";
import { prisma } from "@/lib/prisma";
import FeeManagementWidget from "@/components/FeeManagementWidget";

export default async function RegistryFeesPage() {
	const referenceStudent = await prisma.student.findFirst({
		include: {
			programme: true,
			payments: true,
		},
	});

	if (!referenceStudent) {
		return (
			<div className='p-8 text-center text-muted-foreground'>
				No active student found. Register a student first to manage ledgers.
			</div>
		);
	}

	const normalizedStudent = {
		id: referenceStudent.id,
		name: referenceStudent.name,
		programme: {
			name: referenceStudent.programme.name,
			feeAmount: Number(referenceStudent.programme.feeAmount),
		},
		payments: referenceStudent.payments.map((p) => ({
			id: p.id,
			amount: Number(p.amount),
			reference: p.reference,
			date: p.date.toISOString(),
		})),
	};

	return (
		<div className='p-8 max-w-7xl mx-auto space-y-6'>
			<div>
				<h1 className='text-3xl font-bold tracking-tight'>Institutional Fee Ledger</h1>
				<p className='text-sm text-muted-foreground'>
					Track balances and process cash allocations for {normalizedStudent.name}.
				</p>
			</div>
			<FeeManagementWidget student={normalizedStudent} />
		</div>
	);
}
