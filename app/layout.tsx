import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import SidebarMain from "../components/SideBar";
import { cn } from "../lib/utils";
import { RoleProvider } from "./context/RoleContext";
import RoleAndMode from "../components/RoleAndMode";
const inter = Geist({
	variable: "--font-sans",
	subsets: ["latin"],
});

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "SMS-Student Management System",
	description: "Student Management System Dashboard",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<html
				lang='en'
				className={cn(inter.variable, geistSans.variable, geistMono.variable)}
				suppressHydrationWarning
			>
				<head />
				<body>
					<ThemeProvider
						attribute='class'
						defaultTheme='system'
						enableSystem
						disableTransitionOnChange
					>
						<RoleProvider>
							<RoleAndMode />
							<SidebarMain>{children}</SidebarMain>
						</RoleProvider>
					</ThemeProvider>
				</body>
			</html>
		</>
	);
}
