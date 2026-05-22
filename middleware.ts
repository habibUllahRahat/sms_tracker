import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	if (pathname === "/") {
		return NextResponse.redirect(new URL("/staff", request.url));
	}

	if (pathname === "/student" || pathname === "/student/") {
		try {
			const res = await fetch(new URL("/api/students", request.url));
			const data = await res.json();

			if (Array.isArray(data) && data.length > 0) {
				const firstStudentId = data[0].id;
				return NextResponse.redirect(new URL(`/student/${firstStudentId}`, request.url));
			}
		} catch (error) {
			console.error("Middleware student fetch fallback mismatch:", error);
		}
		return NextResponse.redirect(new URL("/student/fallback-id", request.url));
	}
	return NextResponse.next();
}

export const config = {
	matcher: ["/", "/student", "/student/"],
};
