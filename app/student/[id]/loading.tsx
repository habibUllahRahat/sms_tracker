import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { IconLoader2 } from "@tabler/icons-react";

export default function StudentHubLoading() {
	return (
		<div className='p-8 max-w-7xl mx-auto space-y-6 animate-pulse'>
			<div className='space-y-2'>
				<div className='h-8 w-72 bg-muted rounded-md' />
				<div className='h-4 w-48 bg-muted rounded-md' />
			</div>

			<div className='grid gap-4 md:grid-cols-3'>
				{[...Array(3)].map((_, idx) => (
					<Card key={idx}>
						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
							<div className='h-4 w-32 bg-muted rounded-md' />
							<IconLoader2 className='h-4 w-4 text-muted animate-spin' />
						</CardHeader>
						<CardContent>
							<div className='h-6 w-40 bg-muted rounded-md' />
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
