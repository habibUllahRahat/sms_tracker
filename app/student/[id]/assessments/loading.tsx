import React from "react";

export default function StudentAssessmentsLoading() {
	return (
		<div className='p-8 max-w-5xl mx-auto space-y-6 animate-pulse'>
			<div className='space-y-2'>
				<div className='h-8 w-56 bg-muted rounded-md' />
				<div className='h-4 w-80 bg-muted rounded-md' />
			</div>

			<div className='grid gap-6'>
				{[...Array(3)].map((_, idx) => (
					<div
						key={idx}
						className='border p-6 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-6'
					>
						<div className='space-y-3 flex-1'>
							<div className='flex gap-2'>
								<div className='h-4 w-16 bg-muted rounded-md' />
								<div className='h-4 w-28 bg-muted rounded-md' />
							</div>
							<div className='h-6 w-64 bg-muted rounded-md' />
							<div className='h-3 w-40 bg-muted rounded-md' />
						</div>
						<div className='h-10 w-full md:w-64 bg-muted rounded-lg' />
					</div>
				))}
			</div>
		</div>
	);
}
