"use client";

import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconAward, IconClock } from "@tabler/icons-react";

interface AcademicReportProps {
	studentData: {
		submissions: { id: string; assessmentId: string; isLate: boolean; submittedAt: string }[];
		grades: {
			id: string;
			assessmentId: string;
			score: number;
			classification: string;
			published: boolean;
		}[];
	};
	assessments: { id: string; title: string; module: string; deadline: string }[];
}

export default function AcademicReportList({ studentData, assessments }: AcademicReportProps) {
	return (
		<div className='space-y-4'>
			{assessments.map((assessment) => {
				const submission = studentData.submissions.find(
					(s) => s.assessmentId === assessment.id,
				);
				const grade = studentData.grades.find((g) => g.assessmentId === assessment.id);

				return (
					<Card key={assessment.id} className='overflow-hidden'>
						<CardHeader className='flex flex-row items-center justify-between space-y-0 py-4 bg-muted/30'>
							<div>
								<span className='text-xs font-semibold text-primary uppercase tracking-wider'>
									{assessment.module}
								</span>
								<CardTitle className='text-base font-bold'>
									{assessment.title}
								</CardTitle>
							</div>
							<div className='flex gap-2'>
								{submission ? (
									<Badge
										variant={submission.isLate ? "destructive" : "secondary"}
										className='flex gap-1 items-center'
									>
										<IconClock className='h-3 w-3' />
										{submission.isLate ? "Late" : "Submitted"}
									</Badge>
								) : (
									<Badge variant='outline'>Missing</Badge>
								)}
							</div>
						</CardHeader>
						<CardContent className='py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
							<div className='text-xs text-muted-foreground'>
								Deadline: {new Date(assessment.deadline).toLocaleDateString()}
							</div>
							<div className='flex items-center gap-4'>
								{grade && grade.published ? (
									<div className='flex items-center gap-3'>
										<div className='text-right'>
											<span className='text-xs text-muted-foreground block'>
												Score
											</span>
											<span className='font-bold text-lg'>
												{grade.score}/100
											</span>
										</div>
										<Badge
											className={
												grade.classification === "DISTINCTION"
													? "bg-purple-500 hover:bg-purple-600 text-white"
													: grade.classification === "MERIT"
														? "bg-blue-500 hover:bg-blue-600 text-white"
														: grade.classification === "PASS"
															? "bg-emerald-500 hover:bg-emerald-600 text-white"
															: "bg-destructive text-destructive-foreground"
											}
										>
											<IconAward className='h-3 w-3 mr-1' />
											{grade.classification}
										</Badge>
									</div>
								) : (
									<span className='text-sm text-muted-foreground italic'>
										Awaiting Grading Release
									</span>
								)}
							</div>
						</CardContent>
					</Card>
				);
			})}
		</div>
	);
}
