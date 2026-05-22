"use client";

import React, { useState, useRef } from "react";
import { createAssessmentAction } from "@/app/actions/assessment";
import { IconPlus, IconLoader2, IconAlertCircle } from "@tabler/icons-react";

export default function AssessmentCreationForm() {
	const [isOpen, setIsOpen] = useState(false);
	const [isPending, setIsPending] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const formRef = useRef<HTMLFormElement>(null);

	const handleFormAction = async (formData: FormData) => {
		setIsPending(true);
		setErrorMessage("");

		const result = await createAssessmentAction(formData);

		setIsPending(false);
		if (result.success) {
			setIsOpen(false);
			formRef.current?.reset();
		} else {
			setErrorMessage(result.error || "Execution error during configuration save");
		}
	};

	return (
		<div>
			<button
				onClick={() => setIsOpen(true)}
				className='inline-flex items-center gap-1.5 px-4 py-2 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 text-sm font-medium rounded-lg hover:opacity-90 transition-opacity'
			>
				<IconPlus className='h-4 w-4' /> New Assessment
			</button>

			{isOpen && (
				<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs'>
					<div className='bg-background border rounded-xl w-full max-w-md p-6 shadow-lg space-y-4'>
						<div>
							<h3 className='text-lg font-bold'>Configure Milestone</h3>
							<p className='text-xs text-muted-foreground'>
								Setup target module delivery parameters and timeline deadlines.
							</p>
						</div>

						<form ref={formRef} action={handleFormAction} className='space-y-4'>
							<div className='space-y-1.5'>
								<label className='text-xs font-medium text-neutral-500'>
									Module Code / Course
								</label>
								<input
									type='text'
									name='module'
									required
									placeholder='e.g., CSE-311'
									className='w-full text-sm px-3 py-2 border rounded-lg bg-background outline-none focus:border-zinc-500'
								/>
							</div>

							<div className='space-y-1.5'>
								<label className='text-xs font-medium text-neutral-500'>
									Assessment Title
								</label>
								<input
									type='text'
									name='title'
									required
									placeholder='e.g., Final Term Project Deliverable'
									className='w-full text-sm px-3 py-2 border rounded-lg bg-background outline-none focus:border-zinc-500'
								/>
							</div>

							<div className='space-y-1.5'>
								<label className='text-xs font-medium text-neutral-500'>
									Submission Cutoff Deadline
								</label>
								<input
									type='datetime-local'
									name='deadline'
									required
									className='w-full text-sm px-3 py-2 border rounded-lg bg-background outline-none focus:border-zinc-500'
								/>
							</div>

							{errorMessage && (
								<div className='flex items-center gap-2 text-xs text-destructive bg-destructive/10 p-2.5 rounded-lg border border-destructive/20'>
									<IconAlertCircle className='h-4 w-4 shrink-0' />
									<span>{errorMessage}</span>
								</div>
							)}

							<div className='flex justify-end gap-2 pt-2'>
								<button
									type='button'
									onClick={() => setIsOpen(false)}
									disabled={isPending}
									className='px-3 py-1.5 text-xs font-medium border rounded-lg hover:bg-muted'
								>
									Cancel
								</button>
								<button
									type='submit'
									disabled={isPending}
									className='px-3 py-1.5 text-xs font-medium bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 rounded-lg hover:opacity-90 flex items-center gap-1'
								>
									{isPending ? (
										<IconLoader2 className='h-3 w-3 animate-spin' />
									) : (
										"Save Configuration"
									)}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
}
