import React from "react";

export default function MarksheetLoading() {
	return (
		<div className='p-8 max-w-7xl mx-auto space-y-6 animate-pulse'>
			<div className='space-y-2'>
				<div className='h-8 w-72 bg-muted rounded-md' />
				<div className='h-4 w-80 bg-muted rounded-md' />
			</div>

			<div className='border rounded-xl overflow-hidden bg-card'>
				<div className='grid grid-cols-4 p-4 border-b bg-muted/30 gap-4'>
					{[...Array(4)].map((_, idx) => (
						<div key={idx} className='h-5 bg-muted rounded-md' />
					))}
				</div>
				<div className='p-4 space-y-3'>
					{[...Array(6)].map((_, idx) => (
						<div key={idx} className='grid grid-cols-4 gap-4 items-center'>
							<div className='h-8 bg-muted rounded-md col-span-2' />
							<div className='h-8 bg-muted rounded-md' />
							<div className='h-8 bg-muted rounded-md' />
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
