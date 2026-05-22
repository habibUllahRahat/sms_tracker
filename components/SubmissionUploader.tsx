"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { uploadAssignmentAction } from "@/app/actions/submission";
import { IconUpload, IconFileCheck, IconLoader2, IconAlertCircle } from "@tabler/icons-react";

interface UploaderProps {
	studentId: string;
	assessmentId: string;
}

export default function SubmissionUploader({ studentId, assessmentId }: UploaderProps) {
	const [file, setFile] = useState<File | null>(null);
	const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
	const [errorMessage, setErrorMessage] = useState("");
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setFile(e.target.files[0]);
			setStatus("idle");
			setErrorMessage("");
		}
	};

	const handleUpload = async () => {
		if (!file) return;
		setStatus("loading");

		const formData = new FormData();
		formData.append("file", file);
		formData.append("studentId", studentId);
		formData.append("assessmentId", assessmentId);

		const result = await uploadAssignmentAction(formData);

		if (result.success) {
			setStatus("success");
			setFile(null);
			if (fileInputRef.current) fileInputRef.current.value = "";
		} else {
			setStatus("error");
			setErrorMessage(result.error || "Upload execution failed");
		}
	};

	return (
		<div className='w-full max-w-sm space-y-3 p-4 border rounded-xl bg-muted/30'>
			<div className='flex gap-2'>
				<Input
					type='file'
					ref={fileInputRef}
					onChange={handleFileChange}
					disabled={status === "loading"}
					className='bg-background cursor-pointer text-xs'
				/>
				<Button
					onClick={handleUpload}
					disabled={!file || status === "loading"}
					size='sm'
					className='shrink-0'
				>
					{status === "loading" ? (
						<IconLoader2 className='h-4 w-4 animate-spin' />
					) : (
						<>
							<IconUpload className='h-4 w-4 mr-1' /> Upload
						</>
					)}
				</Button>
			</div>

			{status === "success" && (
				<div className='flex items-center gap-2 text-xs text-emerald-600 font-medium bg-emerald-500/10 p-2.5 rounded-lg border border-emerald-500/20'>
					<IconFileCheck className='h-4 w-4 shrink-0' />
					<span>Assignment file saved successfully</span>
				</div>
			)}

			{status === "error" && (
				<div className='flex items-center gap-2 text-xs text-destructive font-medium bg-destructive/10 p-2.5 rounded-lg border border-destructive/20'>
					<IconAlertCircle className='h-4 w-4 shrink-0' />
					<span className='truncate'>{errorMessage}</span>
				</div>
			)}
		</div>
	);
}
