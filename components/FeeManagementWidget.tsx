"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHeader,
	TableHead,
	TableRow,
} from "@/components/ui/table";
import { IconCreditCard, IconPlus } from "@tabler/icons-react";

interface FeeWidgetProps {
	student: {
		id: string;
		name: string;
		programme: { name: string; feeAmount: number };
		payments: { id: string; amount: number; reference: string; date: string }[];
	};
	onPaymentSuccess?: () => void;
}

export default function FeeManagementWidget({ student, onPaymentSuccess }: FeeWidgetProps) {
	const [studentId, setStudentId] = useState(student?.id || "");
	const [amount, setAmount] = useState("");
	const [reference, setReference] = useState("");
	const [loading, setLoading] = useState(false);

	const totalPaid = student.payments.reduce((sum, p) => sum + Number(p.amount), 0);
	const balanceOwed = Number(student.programme.feeAmount) - totalPaid;

	React.useEffect(() => {
		if (student?.id) {
			setStudentId(student.id);
		}
	}, [student?.id]);

	const handlePayment = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!studentId || !amount || !reference) return;
		setLoading(true);
		const res = await fetch("/api/payments", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ amount, reference, studentId }),
		});
		setLoading(false);
		if (res.ok) {
			setAmount("");
			setReference("");
			if (onPaymentSuccess) onPaymentSuccess();
		}
	};

	return (
		<div className='grid gap-6 md:grid-cols-3'>
			<Card className='md:col-span-1'>
				<CardHeader>
					<CardTitle className='text-sm font-medium flex items-center gap-2'>
						<IconCreditCard className='h-4 w-4' /> Financial Summary
					</CardTitle>
				</CardHeader>
				<CardContent className='space-y-4'>
					<div>
						<div className='text-xs text-muted-foreground'>Total Program Fee</div>
						<div className='text-xl font-bold'>
							${Number(student.programme.feeAmount)}
						</div>
					</div>
					<div>
						<div className='text-xs text-muted-foreground'>Total Paid</div>
						<div className='text-xl font-bold text-emerald-600'>${totalPaid}</div>
					</div>
					<div>
						<div className='text-xs text-muted-foreground'>Outstanding Balance</div>
						<div className='text-xl font-bold text-destructive'>${balanceOwed}</div>
					</div>
				</CardContent>
			</Card>

			<Card className='md:col-span-2'>
				<CardHeader>
					<CardTitle className='text-sm font-medium'>Record New Payment</CardTitle>
				</CardHeader>
				<CardContent>
					<form
						onSubmit={handlePayment}
						className='flex flex-col sm:flex-row gap-4 items-end mb-6'
					>
						<div className='w-full sm:flex-1 space-y-1'>
							<Input
								placeholder='Student ID'
								value={studentId}
								onChange={(e) => setStudentId(e.target.value)}
								required
							/>
						</div>
						<div className='w-full sm:flex-1 space-y-1'>
							<Input
								type='number'
								placeholder='Amount'
								value={amount}
								onChange={(e) => setAmount(e.target.value)}
								required
							/>
						</div>
						<div className='w-full sm:flex-1 space-y-1'>
							<Input
								placeholder='Reference (e.g. Bank TxID)'
								value={reference}
								onChange={(e) => setReference(e.target.value)}
								required
							/>
						</div>
						<Button type='submit' disabled={loading} className='w-full sm:w-auto'>
							<IconPlus className='h-4 w-4 mr-1' /> Add
						</Button>
					</form>

					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Date</TableHead>
								<TableHead>Reference</TableHead>
								<TableHead className='text-right'>Amount</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{student.payments.map((payment) => (
								<TableRow key={payment.id}>
									<TableCell>
										{new Date(payment.date).toLocaleDateString()}
									</TableCell>
									<TableCell className='font-mono text-xs'>
										{payment.reference}
									</TableCell>
									<TableCell className='text-right font-medium text-emerald-600'>
										${Number(payment.amount)}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
}
