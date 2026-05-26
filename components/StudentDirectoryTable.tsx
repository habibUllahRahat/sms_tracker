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
import { Badge } from "@/components/ui/badge";
import { IconSearch } from "@tabler/icons-react";

type Programme = {
	id?: string | number;
	name?: string;
};

type Student = {
	id: string | number;
	studentCode?: string;
	name?: string;
	email?: string;
	programme?: Programme | null;
	status?: "ENROLLED" | "COMPLETED" | string;
};

export default function StudentDirectoryTable() {
	const [students, setStudents] = useState<Student[]>([]);
	const [search, setSearch] = useState("");

	useEffect(() => {
		const fetchStudents = async () => {
			const res = await fetch(`/api/students?search=${search}`);
			const data = await res.json();
			if (Array.isArray(data)) setStudents(data);
		};
		const debounce = setTimeout(fetchStudents, 300);
		return () => clearTimeout(debounce);
	}, [search]);

	return (
		<div className='space-y-4 w'>
			<div className='relative max-w-sm'>
				<IconSearch className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
				<Input
					placeholder='Search students...'
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className='pl-9'
				/>
			</div>
			<div className='border rounded-xl bg-card overflow-hidden'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Code</TableHead>
							<TableHead>Name</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Programme</TableHead>
							<TableHead>Status</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{students.map((student) => (
							<TableRow key={student.id}>
								<TableCell className='font-mono font-medium'>
									{student.studentCode}
								</TableCell>
								<TableCell>{student.name}</TableCell>
								<TableCell>{student.email}</TableCell>
								<TableCell>{student.programme?.name}</TableCell>
								<TableCell>
									<Badge
										variant={
											student.status === "ENROLLED"
												? "default"
												: student.status === "COMPLETED"
													? "secondary"
													: "destructive"
										}
									>
										{student.status}
									</Badge>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
