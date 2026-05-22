"use client";

import React, { useState, useEffect } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { IconUserPlus } from "@tabler/icons-react";

interface RegistrationProps {
	onSuccess?: () => void;
}

interface Programme {
	id: string;
	name: string;
}

export default function StudentRegistrationDialog({ onSuccess }: RegistrationProps) {
	const [open, setOpen] = useState(false);
	const [programmes, setProgrammes] = useState<Programme[]>([]);
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		dob: "",
		academicYear: "",
		programmeId: "",
	});

	useEffect(() => {
		if (open) {
			fetch("/api/programmes")
				.then((res) => res.json())
				.then((data) => {
					if (Array.isArray(data)) setProgrammes(data as Programme[]);
				});
		}
	}, [open]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		const res = await fetch("/api/students", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				...formData,
				dob: new Date(formData.dob).toISOString(),
			}),
		});
		setLoading(false);
		if (res.ok) {
			setOpen(false);
			setFormData({ name: "", email: "", dob: "", academicYear: "", programmeId: "" });
			if (onSuccess) onSuccess();
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>
					<IconUserPlus className='h-4 w-4 mr-2' /> Register Student
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-md'>
				<DialogHeader>
					<DialogTitle>New Student Registration</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit} className='space-y-4 pt-2'>
					<div className='space-y-1'>
						<Input
							placeholder='Full Name'
							value={formData.name}
							onChange={(e) => setFormData({ ...formData, name: e.target.value })}
							required
						/>
					</div>
					<div className='space-y-1'>
						<Input
							type='email'
							placeholder='Email Address'
							value={formData.email}
							onChange={(e) => setFormData({ ...formData, email: e.target.value })}
							required
						/>
					</div>
					<div className='space-y-1'>
						<Input
							type='date'
							value={formData.dob}
							onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
							required
						/>
					</div>
					<div className='space-y-1'>
						<Input
							placeholder='Academic Year (e.g. 2026)'
							value={formData.academicYear}
							onChange={(e) =>
								setFormData({ ...formData, academicYear: e.target.value })
							}
							required
						/>
					</div>
					<div className='space-y-1'>
						<Select
							value={formData.programmeId}
							onValueChange={(val) => setFormData({ ...formData, programmeId: val })}
						>
							<SelectTrigger>
								<SelectValue placeholder='Select Programme' />
							</SelectTrigger>
							<SelectContent>
								{programmes.map((p) => (
									<SelectItem key={p.id} value={p.id}>
										{p.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<Button type='submit' className='w-full' disabled={loading}>
						{loading ? "Registering..." : "Complete Registration"}
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
}
