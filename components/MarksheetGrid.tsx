"use client";

import React, { useState, useEffect } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHeader,
	TableHead,
	TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { IconCheck } from "@tabler/icons-react";

interface Student {
	id: string;
	studentCode: string;
	name: string;
	grades?: Array<{
		assessmentId: string;
		score: number;
		classification: string;
	}>;
}

interface MarksheetGridProps {
	assessmentId: string;
}

export default function MarksheetGrid({ assessmentId }: MarksheetGridProps) {
	const [students, setStudents] = useState<Student[]>([]);
	const [grades, setGrades] = useState<{
		[key: string]: { score: string; classification: string };
	}>({});
	const [loadingRow, setLoadingRow] = useState<string | null>(null);

	useEffect(() => {
		if (!assessmentId) return;
		const fetchData = async () => {
			const res = await fetch("/api/students");
			const data = await res.json();
			if (Array.isArray(data)) {
				setStudents(data);
				const initialGrades: { [key: string]: { score: string; classification: string } } =
					{};
				data.forEach((student: Student) => {
					const existingGrade = student.grades?.find(
						(g: { assessmentId: string; score: number; classification: string }) =>
							g.assessmentId === assessmentId,
					);
					initialGrades[student.id] = {
						score: existingGrade?.score?.toString() || "",
						classification: existingGrade?.classification || "PASS",
					};
				});
				setGrades(initialGrades);
			}
		};
		fetchData();
	}, [assessmentId]);

	const handleSave = async (studentId: string) => {
		setLoadingRow(studentId);
		const current = grades[studentId];
		await fetch("/api/grades", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				studentId,
				assessmentId,
				score: current.score,
				classification: current.classification,
			}),
		});
		setLoadingRow(null);
	};

	const updateGradeField = (
		studentId: string,
		field: "score" | "classification",
		value: string,
	) => {
		setGrades((prev) => ({
			...prev,
			[studentId]: {
				...prev[studentId],
				[field]: value,
			},
		}));
	};

	return (
		<div className='border rounded-xl bg-card overflow-hidden'>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Code</TableHead>
						<TableHead>Name</TableHead>
						<TableHead className='w-24'>Score</TableHead>
						<TableHead className='w-40'>Classification</TableHead>
						<TableHead className='text-right w-24'>Action</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{students.map((student) => {
						const rowGrade = grades[student.id] || {
							score: "",
							classification: "PASS",
						};
						return (
							<TableRow key={student.id}>
								<TableCell className='font-mono'>{student.studentCode}</TableCell>
								<TableCell>{student.name}</TableCell>
								<TableCell>
									<Input
										type='number'
										value={rowGrade.score}
										onChange={(e) =>
											updateGradeField(student.id, "score", e.target.value)
										}
										className='h-8'
									/>
								</TableCell>
								<TableCell>
									<Select
										value={rowGrade.classification}
										onValueChange={(val) =>
											updateGradeField(student.id, "classification", val)
										}
									>
										<SelectTrigger className='h-8'>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value='FAIL'>FAIL</SelectItem>
											<SelectItem value='PASS'>PASS</SelectItem>
											<SelectItem value='MERIT'>MERIT</SelectItem>
											<SelectItem value='DISTINCTION'>DISTINCTION</SelectItem>
										</SelectContent>
									</Select>
								</TableCell>
								<TableCell className='text-right'>
									<Button
										size='sm'
										variant='outline'
										onClick={() => handleSave(student.id)}
										disabled={loadingRow === student.id}
										className='h-8 w-16'
									>
										{loadingRow === student.id ? (
											"..."
										) : (
											<IconCheck className='h-4 w-4 mx-auto' />
										)}
									</Button>
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</div>
	);
}
