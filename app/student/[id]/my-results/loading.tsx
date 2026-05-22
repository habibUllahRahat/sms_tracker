import React from "react";

export default function StudentResultsLoading() {
	return (
		<div className='p-8 max-w-4xl mx-auto space-y-6 animate-pulse'>
			<div className='space-y-2'>
				<div className='h-8 w-80 bg-muted rounded-md' />
				<div className='h-4 w-60 bg-muted rounded-md' />
			</div>

			<div className='border rounded-xl p-6 bg-muted/10 space-y-4'>
				{[...Array(4)].map((_, idx) => (
					<div
						key={idx}
						className='flex justify-between items-center py-2 border-b last:border-0'
					>
						<div className='space-y-2'>
							<div className='h-5 w-48 bg-muted rounded-md' />
							<div className='h-3 w-24 bg-muted rounded-md' />
						</div>
						<div className='h-8 w-16 bg-muted rounded-md' />
					</div>
				))}
			</div>
		</div>
	);
}
