import { useEffect, useMemo, useState } from "react";
import SectionCard from "../../components/dashboard/SectionCard";
import StatCard from "../../components/dashboard/StatCard";
import { useAuth } from "../../context/AuthContext";
import { getAttendances, getEvents, getExams, getSubjects } from "../../services/api";
import LoadingState from "../../components/dashboard/LoadingState";

export default function StudentDashboard() {
    const [data, setData] = useState({
        subjects: [],
        exams: [],
        attendance: [],
        events: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const { user } = useAuth();

    useEffect(() => {
        async function loadDashboard() {
            try {
                setLoading(true);
                setError("");

                const [subjects, attendance, results, events] = await Promise.all([
                    getSubjects(),
                    getEvents(),
                    getAttendances(),
                    getExams(),
                ]);

                setData({
                    subjects: Array.isArray(subjects) ? subjects : [],
                    events: Array.isArray(events) ? events : [],
                    attendance: Array.isArray(attendance) ? attendance : [],
                    exam: Array.isArray(exam) ? exam : [],
                });
            } catch (err) {
                setError(err.message || "Failed to load the dashboard.")
            } finally {
                setLoading(false);
            }
        }

        loadDashboard();
    }, []);

    const attendanceSummary = useMemo(() => {
        const total = data.attendance.length;

        if (total === 0) {
            return {
                total: 0,
                present: 0,
                absent: 0,
                percentage: 0,
            };
        }

        const present = data.attendance.filter(
            (record) => record.status?.toLowerCase() === "present"
        ).length;
        
        const absent = data.attendance.filter(
            (record) => record.status?.toLowerCase() === "absent"
        ).length;

        return {
            total,
            present,
            absent,
            precentage: Math.round((present / total) * 100),
        };
    }, [data.attendance])

    const upcomingEvents = useMemo(() => {
        const today = new Date();

        return [...data.events]
            .filter((event) => {
                if (!event.date)  return false;

                const eventDate = new Date(event.date);

                return eventDate >= today;
            })
            .sort((a,b) => {
                return new Date(b.date) - new Date(a.date);
            })
            .slice(0, 5);
        }, [data.events]);

    const recentExams = useMemo(() => {
        return [...data.exams]
            .sort((a,b) => {
                    return new Date(b.examDate) - new Date(a.examDate);
            })
            .slice(0,5);
    }, [data.exams]);

    if (loading) {
        return <LoadingState />;
    }

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">
                    Student Dashboard
                </h1>
                
                <p className="mt-1 text-sm text-gray-500">
                    Welcome back, {user?.username || "Student"}.
                </p>
            </div>

            {error && (
                <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                    {error}
                </div>
            )}
            


            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard   
                    title="Subjects"
                    value={data.subjects.length}
                    description="Your enrolled subjects"
                />

                <StatCard 
                    title="Attendance"
                    value={`${attendanceSummary.percentage}%`}
                    description={`${attendanceSummary.present} present`}
                />

                <StatCard 
                    title="Upcoming Exams"
                    value={upcomingEvents.length}
                    description="Scheduled exams"
                />
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
                <SectionCard title="Upcoming Events">
                    {upcomingEvents.length === 0 ? (
                        <p className="text-sm text-gray-500">
                            No upcoming events.
                        </p>
                    ) : (
                        <div className="space-y-4">
                            {upcomingEvents.map((event) => (
                                <div 
                                    key={event.id}
                                    className="rounded-lg border p-4"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <h3 className="font-semibold text-gray-900">
                                                {event.title}
                                            </h3>

                                            <p className="mt-1 text-sm text-gray-500">
                                                {event.date}
                                            </p>
                                        </div>

                                        {event.lectures && (
                                            <div className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
                                                {event.lectures}
                                            </div>
                                        )}
                                    </div>

                                    {(event.startTime || (event.endTime) && (
                                        <p className="mt-2 text-sm text-gray-600">
                                            {event.startTime || "-"} - {event.endTime || "--"}
                                        </p>
                                    ))}
                                </div>
                            ))}
                        </div>
                    )}
                </SectionCard>
                
                <SectionCard title="Recent Exams">
                    {recentExams.length === 0 ? (
                        <p className="text-sm text-gray-500">
                            No examination records found.
                        </p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b text-gray-500">
                                        <th className="pb-3 pr-4">Date</th>
                                        <th className="pb-3 pr-4">Decision</th>
                                        <th className="pb-3">Postponed</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {recentExams.map((exam) => (
                                        <tr className="border-b last:border-0">
                                            <td className="py-3 pr-4">
                                                {exam.examDate || "-"}
                                            </td>
                                            
                                            <td className="py-3 pr-4">
                                                {exam.decision || "-"}
                                            </td>
                                            
                                            <td className="py-3 pr-4">
                                                {exam.postPone || "-"}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </SectionCard>
            </div>

            <div className="mt-6">
                    <SectionCard title="Attendance Overview">
                        <div className="grid gap-4 sm:grid-cols-3">
                            <div className="rounded-lg bg-gray-50 p-4">
                                <p className="text-sm text-gray-500">
                                    Total Records
                                </p>
                                <p className="mt-1 text-2xl font-bold">
                                    {attendanceSummary.total}
                                </p>
                            </div>
                            
                            <div className="rounded-lg bg-gray-50 p-4">
                                <p className="text-sm text-gray-500">
                                    Present
                                </p>
                                <p className="mt-1 text-2xl font-bold">
                                    {attendanceSummary.present}
                                </p>
                            </div>
                            
                            <div className="rounded-lg bg-gray-50 p-4">
                                <p className="text-sm text-gray-500">
                                    Absent
                                </p>
                                <p className="mt-1 text-2xl font-bold">
                                    {attendanceSummary.absent}
                                </p>
                            </div>
                        </div>
                    </SectionCard>
            </div>        
                
        </div>
    )
}