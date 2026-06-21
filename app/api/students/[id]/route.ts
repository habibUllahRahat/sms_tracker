// import { prisma } from "@/lib/prisma";
// import { NextResponse } from "next/server";
// export async function PATCH(req: Request, { params }: { params: { id: string } }) {
// 	const body = await req.json();
// 	const student = await prisma.student.update({
// 		where: { studentCode: params.id },
// 		data: body,
// 	});
// 	return NextResponse.json(student);
// }
 1 | import { NextRequest, NextResponse } from "next/server";
 2 |
 3 | // PATCH handler for updating a student by ID
 4 | export async function PATCH(
 5 |   request: NextRequest,
 6 |   { params }: { params: { id: string } }
 7 | ) {
 8 |   const { id } = params;
 9 |
10 |   // Parse request body
11 |   const body = await request.json();
12 |
13 |   // Example response (merge id + body)
14 |   return NextResponse.json({
15 |     id,
16 |     ...body,
17 |   });
18 | }
