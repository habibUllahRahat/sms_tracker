import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function StudentFeesLoading() {
	return (
		<div className='p-8 max-w-4xl mx-auto space-y-6 animate-pulse'>
			<div className='space-y-2'>
				<div className='h-8 w-72 bg-muted rounded-md' />
				<div className='h-4 w-64 bg-muted rounded-md' />
			</div>

			<Card>
				<CardHeader className='space-y-2'>
					<div className='h-5 w-40 bg-muted rounded-md' />
					<div className='h-4 w-24 bg-muted rounded-md' />
				</CardHeader>
				<CardContent className='space-y-6'>
					<div className='space-y-2'>
						<div className='h-4 w-full bg-muted rounded-md' />
						<div className='h-3 w-full bg-muted rounded-md' />
					</div>

					<div className='grid gap-4 sm:grid-cols-2'>
						<div className='h-16 bg-muted rounded-xl' />
						<div className='h-16 bg-muted rounded-xl' />
					</div>

					<div className='space-y-2 pt-2'>
						<div className='h-4 w-36 bg-muted rounded-md' />
						<div className='h-24 bg-muted rounded-lg' />
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
