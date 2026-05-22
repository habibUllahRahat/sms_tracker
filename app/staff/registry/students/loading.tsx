import React from "react";

export default function RegistryStudentsLoading() {
	return (
		<div className='p-8 max-w-7xl mx-auto space-y-6 animate-pulse'>
			<div className='flex items-center justify-between gap-4'>
				<div className='space-y-2'>
					<div className='h-8 w-52 bg-muted rounded-md' />
					<div className='h-4 w-80 bg-muted rounded-md' />
				</div>
				<div className='h-10 w-36 bg-muted rounded-lg' />
			</div>

			<div className='border rounded-xl bg-card overflow-hidden'>
				<div className='p-4 border-b bg-muted/20 h-12 w-full' />
				<div className='p-6 space-y-4'>
					{[...Array(5)].map((_, idx) => (
						<div key={idx} className='h-12 w-full bg-muted rounded-md' />
					))}
				</div>
			</div>
		</div>
	);
}
