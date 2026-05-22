import React from "react";
import StudentDirectoryTable from "@/components/StudentDirectoryTable";
import StudentRegistrationDialog from "@/components/StudentRegistrationDialog";

export default function RegistryStudentsPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Student Admissions</h1>
          <p className="text-sm text-muted-foreground">Register profiles and view current program enrollments.</p>
        </div>
        <StudentRegistrationDialog />
      </div>
      <StudentDirectoryTable />
    </div>
  );
}