"use client";
import React, { useEffect } from "react";
import { User, ShieldAlert, ChevronDown } from "lucide-react";
import { useRole } from "../../app/context/RoleContext";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export function RoleToggle() {
	const { role, setRole } = useRole();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='outline' className='flex items-center gap-2'>
					{role === "STAFF" ? (
						<ShieldAlert className='h-4 w-4 text-indigo-600' />
					) : (
						<User className='h-4 w-4 text-emerald-600' />
					)}
					<span>
						Acting Role: <strong className='capitalize'>{role.toLowerCase()}</strong>
					</span>
					<ChevronDown className='h-3 w-3 opacity-50 ml-1' />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end' className='z-[200] w-40'>
				<Link href='/staff'>
					<DropdownMenuItem
						onClick={() => setRole("STAFF")}
						className='flex items-center gap-2 cursor-pointer'
					>
						<ShieldAlert className='h-4 w-4 text-indigo-600' />
						<span>Staff View</span>
					</DropdownMenuItem>
				</Link>
				<Link href='/student'>
					<DropdownMenuItem
						onClick={() => setRole("STUDENT")}
						className='flex items-center gap-2 cursor-pointer'
					>
						<User className='h-4 w-4 text-emerald-600' />
						<span>Student Portal</span>
					</DropdownMenuItem>
				</Link>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
/* 	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='outline' size='icon'>
					<Sun className='h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90' />
					<Moon className='absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0' />
					<span className='sr-only'>Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end' className='z-200'>
				<DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
 */
