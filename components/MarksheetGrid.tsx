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

interface Assessment {
	id: string;
	title: string;
	module: string;
}

export default function MarksheetGrid({
	assessmentId: initialAssessmentId,
}: {
	assessmentId?: string;
}) {
	const [assessments, setAssessments] = useState<Assessment[]>([]);
	const [selectedAssessmentId, setSelectedAssessmentId] = useState(initialAssessmentId || "");
	const [students, setStudents] = useState<Student[]>([]);
	const [grades, setGrades] = useState<{
		[key: string]: { score: string; classification: string };
	}>({});
	const [loadingRow, setLoadingRow] = useState<string | null>(null);

	useEffect(() => {
		const fetchAssessments = async () => {
			try {
				const res = await fetch("/api/assessments");
				const data = await res.json();
				if (Array.isArray(data)) {
					setAssessments(data);
					if (!selectedAssessmentId && data.length > 0) {
						setSelectedAssessmentId(data[0].id);
					}
				}
			} catch (err) {
				console.error("Failed to fetch assessments", err);
			}
		};
		fetchAssessments();
	}, []);

	useEffect(() => {
		if (!selectedAssessmentId) return;
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
							g.assessmentId === selectedAssessmentId,
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
	}, [selectedAssessmentId]);

	useEffect(() => {
		if (initialAssessmentId) {
			setSelectedAssessmentId(initialAssessmentId);
		}
	}, [initialAssessmentId]);

	const handleSave = async (studentId: string) => {
		if (!selectedAssessmentId) return;
		setLoadingRow(studentId);
		const current = grades[studentId];
		await fetch("/api/grades", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				studentId,
				assessmentId: selectedAssessmentId,
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
		setGrades((prev) => {
			const updated = {
				...prev,
				[studentId]: {
					...prev[studentId],
					[field]: value,
				},
			};

			if (field === "score") {
				const numScore = parseInt(value, 10);
				if (!isNaN(numScore)) {
					if (numScore >= 70) updated[studentId].classification = "DISTINCTION";
					else if (numScore >= 60) updated[studentId].classification = "MERIT";
					else if (numScore >= 40) updated[studentId].classification = "PASS";
					else updated[studentId].classification = "FAIL";
				}
			}

			return updated;
		});
	};

	return (
		<div className='p-8 w-full mx-auto space-y-6'>
			<div className='flex items-center gap-3 bg-muted/40 p-4 rounded-xl border '>
				<label className='text-sm font-medium whitespace-nowrap text-muted-foreground'>
					Target Assessment:
				</label>
				<Select value={selectedAssessmentId} onValueChange={setSelectedAssessmentId}>
					<SelectTrigger className='bg-background'>
						<SelectValue placeholder='Select an assessment' />
					</SelectTrigger>
					<SelectContent>
						{assessments.map((assessment) => (
							<SelectItem key={assessment.id} value={assessment.id}>
								[{assessment.module}] {assessment.title}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

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
						{selectedAssessmentId &&
							students.map((student) => {
								const rowGrade = grades[student.id] || {
									score: "",
									classification: "PASS",
								};
								return (
									<TableRow key={student.id}>
										<TableCell className='font-mono'>
											{student.studentCode}
										</TableCell>
										<TableCell>{student.name}</TableCell>
										<TableCell>
											<Input
												type='number'
												min='0'
												max='100'
												value={rowGrade.score}
												onChange={(e) =>
													updateGradeField(
														student.id,
														"score",
														e.target.value,
													)
												}
												className='h-8'
											/>
										</TableCell>
										<TableCell>
											<Select
												value={rowGrade.classification}
												onValueChange={(val) =>
													updateGradeField(
														student.id,
														"classification",
														val,
													)
												}
											>
												<SelectTrigger className='h-8'>
													<SelectValue />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value='FAIL'>FAIL</SelectItem>
													<SelectItem value='PASS'>PASS</SelectItem>
													<SelectItem value='MERIT'>MERIT</SelectItem>
													<SelectItem value='DISTINCTION'>
														DISTINCTION
													</SelectItem>
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
						{!selectedAssessmentId && (
							<TableRow>
								<TableCell
									colSpan={5}
									className='text-center p-8 text-sm text-muted-foreground'
								>
									Please configure or select an assessment milestone to input
									grades.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
