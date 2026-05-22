import { PrismaClient, EnrollmentStatus, Classification } from "@/app/generated/prisma";

const prisma = new PrismaClient();

async function main() {
	console.log("🌱 Starting database seeding...");
	await prisma.grade.deleteMany({});
	await prisma.submission.deleteMany({});
	await prisma.assessment.deleteMany({});
	await prisma.payment.deleteMany({});
	await prisma.student.deleteMany({});
	await prisma.programme.deleteMany({});
	console.log("Cleaned up existing records.");
	const csProgramme = await prisma.programme.create({
		data: {
			name: "BSc Computer Science",
			feeAmount: 9000.0,
		},
	});

	const bbaProgramme = await prisma.programme.create({
		data: {
			name: "Bachelor of Business Administration",
			feeAmount: 7500.0,
		},
	});

	console.log("Created 2 Programmes.");

	const nextWeek = new Date();
	nextWeek.setDate(nextWeek.getDate() + 7);

	const yesterday = new Date();
	yesterday.setDate(yesterday.getDate() - 1);

	const webDevAssessment = await prisma.assessment.create({
		data: {
			title: "Next.js App Router Project",
			module: "CS-301 Advanced Web Development",
			deadline: nextWeek,
		},
	});

	const marketingAssessment = await prisma.assessment.create({
		data: {
			title: "Digital Marketing Strategy Case Study",
			module: "BBA-204 Principles of Marketing",
			deadline: yesterday,
		},
	});

	console.log("📝 Created Assessments.");

	const student1 = await prisma.student.create({
		data: {
			studentCode: "SMS-2026-0001",
			name: "John Doe",
			email: "john.doe@university.edu",
			dob: new Date("2003-05-15"),
			academicYear: "2025/2026",
			status: EnrollmentStatus.ENROLLED,
			programmeId: csProgramme.id,
			payments: {
				create: {
					amount: 9000.0,
					date: new Date("2025-09-01"),
					reference: "TXN-992183",
				},
			},
		},
	});

	const student2 = await prisma.student.create({
		data: {
			studentCode: "SMS-2026-0002",
			name: "Jane Smith",
			email: "jane.smith@university.edu",
			dob: new Date("2004-02-22"),
			academicYear: "2025/2026",
			status: EnrollmentStatus.ENROLLED,
			programmeId: csProgramme.id,
			payments: {
				create: {
					amount: 4000.0, // Leaves a 5000.00 overdue balance
					date: new Date("2025-09-03"),
					reference: "TXN-441029",
				},
			},
		},
	});

	const student3 = await prisma.student.create({
		data: {
			studentCode: "SMS-2026-0003",
			name: "Alex Mercer",
			email: "alex.mercer@university.edu",
			dob: new Date("2002-11-10"),
			academicYear: "2025/2026",
			status: EnrollmentStatus.ENROLLED,
			programmeId: bbaProgramme.id,
			payments: {
				create: {
					amount: 7500.0,
					date: new Date("2025-08-28"),
					reference: "TXN-110293",
				},
			},
		},
	});

	const student4 = await prisma.student.create({
		data: {
			studentCode: "SMS-2026-0004",
			name: "Sarah Connor",
			email: "sarah.connor@university.edu",
			dob: new Date("2003-08-05"),
			academicYear: "2025/2026",
			status: EnrollmentStatus.DEFERRED,
			programmeId: bbaProgramme.id,
		},
	});

	const student5 = await prisma.student.create({
		data: {
			studentCode: "SMS-2026-0005",
			name: "Michael Scott",
			email: "michael.scott@university.edu",
			dob: new Date("1995-03-15"),
			academicYear: "2025/2026",
			status: EnrollmentStatus.WITHDRAWN,
			programmeId: csProgramme.id,
			payments: {
				create: {
					amount: 2000.0,
					date: new Date("2025-09-01"),
					reference: "TXN-881920",
				},
			},
		},
	});

	console.log("🎓 Created 5 Students with varying payment histories.");

	await prisma.submission.create({
		data: {
			fileUrl: "https://storage.university.edu/submissions/john_nextjs.pdf",
			fileName: "john_nextjs.pdf",
			isLate: false,
			studentId: student1.id,
			assessmentId: webDevAssessment.id,
		},
	});
	await prisma.grade.create({
		data: {
			score: 68,
			classification: Classification.MERIT,
			published: true, // Visible to Student
			studentId: student1.id,
			assessmentId: webDevAssessment.id,
		},
	});

	await prisma.submission.create({
		data: {
			fileUrl: "https://storage.university.edu/submissions/jane_nextjs.pdf",
			fileName: "jane_nextjs.pdf",
			isLate: true, // Real-world edge case scenario
			submittedAt: new Date(),
			studentId: student2.id,
			assessmentId: webDevAssessment.id,
		},
	});
	await prisma.grade.create({
		data: {
			score: 85,
			classification: Classification.DISTINCTION,
			published: false, // Withheld from student view
			studentId: student2.id,
			assessmentId: webDevAssessment.id,
		},
	});

	await prisma.submission.create({
		data: {
			fileUrl: "https://storage.university.edu/submissions/alex_marketing.docx",
			fileName: "alex_marketing.docx",
			isLate: false,
			studentId: student3.id,
			assessmentId: marketingAssessment.id,
		},
	});
	await prisma.grade.create({
		data: {
			score: 45,
			classification: Classification.PASS,
			published: true,
			studentId: student3.id,
			assessmentId: marketingAssessment.id,
		},
	});

	console.log("🏆 Seeded Submissions and Academic Grades.");
	console.log("✅ Seeding completed successfully!");
}

main()
	.catch((e) => {
		console.error("❌ Error during seeding:", e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
