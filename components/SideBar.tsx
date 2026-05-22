"use client";
import React, { useState, useEffect } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
	IconLayoutDashboard,
	IconUsers,
	IconFileText,
	IconReportAnalytics,
	IconReceipt2,
	IconCreditCard,
	IconLoader2,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import RoleAndMode from "./RoleAndMode";
import { useRole } from "@/app/context/RoleContext";
import Link from "next/link";
import Image from "next/image";

export default function SidebarMain({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { role } = useRole();
	const [activeStudentId, setActiveStudentId] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		async function fetchDefaultStudent() {
			try {
				const res = await fetch("/api/students");
				const data = await res.json();
				if (Array.isArray(data) && data.length > 0) {
					setActiveStudentId(data[0].id);
				}
			} catch (err) {
				console.error(err);
			} finally {
				setLoading(false);
			}
		}
		fetchDefaultStudent();
	}, []);

	const staffLinks = [
		{
			label: "Dashboard",
			href: "/staff",
			icon: (
				<IconLayoutDashboard className='h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200' />
			),
		},
		{
			label: "Students",
			href: "/staff/registry/students",
			icon: <IconUsers className='h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200' />,
		},
		{
			label: "Fees",
			href: "/staff/registry/fees",
			icon: (
				<IconReceipt2 className='h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200' />
			),
		},
		{
			label: "Assessments",
			href: "/staff/assessments",
			icon: (
				<IconFileText className='h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200' />
			),
		},
		{
			label: "Marksheet",
			href: "/staff/marksheet",
			icon: (
				<IconReportAnalytics className='h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200' />
			),
		},
	];

	const targetId = activeStudentId || "fallback-id";

	const studentLinks = [
		{
			label: "Dashboard",
			href: `/student/${targetId}`,
			icon: (
				<IconLayoutDashboard className='h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200' />
			),
		},
		{
			label: "Assessments",
			href: `/student/${targetId}/assessments`,
			icon: (
				<IconFileText className='h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200' />
			),
		},
		{
			label: "My Results",
			href: `/student/${targetId}/my-results`,
			icon: (
				<IconReportAnalytics className='h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200' />
			),
		},
		{
			label: "My Fees",
			href: `/student/${targetId}/my-fees`,
			icon: (
				<IconCreditCard className='h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200' />
			),
		},
	];

	const links = role === "STAFF" ? staffLinks : studentLinks;

	return (
		<div
			className={cn(
				"min-h-screen min-w-screen mx-auto flex w-full max-w-7xl flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
				"h-screen",
			)}
		>
			<Sidebar open={open} setOpen={setOpen} animate={true}>
				<SidebarBody className='justify-between gap-10'>
					<div className='flex flex-1 flex-col overflow-x-hidden overflow-y-auto'>
						<Logo />
						<div className='mt-8 flex flex-col gap-2'>
							{loading && role !== "STAFF" ? (
								<div className='flex items-center gap-2 px-2 py-1.5 text-sm text-neutral-500'>
									<IconLoader2 className='h-5 w-5 animate-spin text-neutral-700 dark:text-neutral-200' />
									<span>Loading context...</span>
								</div>
							) : (
								links.map((link, idx) => <SidebarLink key={idx} link={link} />)
							)}
							<div className='md:hidden'>
								<RoleAndMode />
							</div>
						</div>
					</div>
					<div></div>
				</SidebarBody>
			</Sidebar>
			{children}
		</div>
	);
}

export const Logo = () => {
	return (
		<Link
			href='/'
			className='relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black'
		>
			<Image width={32} height={32} src='/logo.png' alt='SMS Logo' />
			<motion.span
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				className='font-medium whitespace-pre text-black dark:text-white text-xl group-hover:translate-x-1 transition duration-150 inline-block !p-0 !m-0'
			>
				SMS
			</motion.span>
		</Link>
	);
};

export const LogoIcon = () => {
	return (
		<a
			href='#'
			className='relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black'
		>
			<div className='h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white' />
		</a>
	);
};
