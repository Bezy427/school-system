import SectionCard from "../../components/dashboard/SectionCard";
import StatCard from "../../components/dashboard/StatCard";
import { useAuth } from "../../context/AuthContext";

export default function StudentDashboard() {
    const { user } = useAuth();

    return (
        <div className="space-y-6 p-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">
                    Student Dashboard
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Welcome back, {user?.username || "Student"}.
                </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard   
                    title="Subjects"
                    value="-"
                    description="Your enrolled subjects"
                />

                <StatCard 
                    title="Attendance"
                    value="-"
                    description="Attendance percentage"
                />

                <StatCard 
                    title="Results"
                    value="-"
                    description="Available results"
                />

                <StatCard 
                    title="Upcoming Exams"
                    value="-"
                    description="Scheduled exams"
                />
            </div>

            <SectionCard title="My Account">
                <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                        <p className="text-sm text-gray-500">
                            Username
                        </p>

                        <p className="mt-1 font-medium text-gray-900">
                            {user?.username || ""}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                            Role
                        </p>

                        <p className="mt-1 font-medium text-gray-900">
                            {user?.role || "STUDENT"}
                        </p>
                    </div>
                </div>
            </SectionCard>

            <SectionCard title="Academic Overview">
                <div className="rounded-lg bg-gray-50 p-6">
                    <p className="text-sm text-gray-600">
                        Your subjects, attendance, results, and 
                        examinations information will appear here once
                        the authenticated student-to-student record
                        mapping is connected to the backend.
                    </p>
                </div>
            </SectionCard>

        </div>
    )
}