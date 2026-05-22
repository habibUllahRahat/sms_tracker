import React from "react";

export default function RegistryFeesLoading() {
	return (
		<div className='p-8 max-w-7xl mx-auto space-y-6 animate-pulse'>
			<div className='space-y-2'>
				<div className='h-8 w-64 bg-muted rounded-md' />
				<div className='h-4 w-96 bg-muted rounded-md' />
			</div>

			<div className='grid gap-6 md:grid-cols-3'>
				<div className='md:col-span-1 border rounded-xl p-6 space-y-4 h-80 bg-muted/10' />
				<div className='md:col-span-2 border rounded-xl p-6 space-y-4 h-80 bg-muted/10' />
			</div>
		</div>
	);
}
