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
import { NextRequest, NextResponse } from "next/server";

// PATCH handler for updating a student by ID
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  // Parse request body
  const body = await request.json();

  // Example response (merge id + body)
  return NextResponse.json({
    id,
    ...body,
  });
}
