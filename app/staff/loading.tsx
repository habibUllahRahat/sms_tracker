import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { IconLoader2 } from "@tabler/icons-react";

export default function AdministrativeLoading() {
	return (
		<div className='p-8 max-w-7xl mx-auto space-y-6 animate-pulse'>
			<div className='space-y-2'>
				<div className='h-8 w-64 bg-muted rounded-md' />
				<div className='h-4 w-96 bg-muted rounded-md' />
			</div>

			<div className='grid gap-4 md:grid-cols-3'>
				{[...Array(3)].map((_, idx) => (
					<Card key={idx}>
						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
							<div className='h-4 w-28 bg-muted rounded-md' />
							<IconLoader2 className='h-4 w-4 text-muted animate-spin' />
						</CardHeader>
						<CardContent>
							<div className='h-8 w-16 bg-muted rounded-md' />
						</CardContent>
					</Card>
				))}
			</div>

			<div className='border rounded-xl p-6 space-y-4 bg-muted/10'>
				<div className='h-6 w-48 bg-muted rounded-md' />
				<div className='space-y-2'>
					{[...Array(5)].map((_, idx) => (
						<div key={idx} className='h-10 w-full bg-muted rounded-md' />
					))}
				</div>
			</div>
		</div>
	);
}
