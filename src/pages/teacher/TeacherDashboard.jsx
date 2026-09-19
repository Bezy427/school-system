import { useState, useEffect, useMemo, use } from "react";
import { useAuth } from "../../context/AuthContext";
import { getStudents, getSubjects, getExams, getAttendances } from "../../services/api";

import StatCard from "../../components/dashboard/StatCard";
import SectionCard from "../../components/dashboard/SectionCard";
import LoadingState from "../../components/dashboard/LoadingState";

export default function TeacherDashboard() {
    const { user } = useAuth();

    const [students, setStudents] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [exams, setExams] = useState([]);
    const [attendances, setAttendances] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadDashboard();
    }, []);

    async function loadDashboard() {
        setLoading(true);
        setError("");

        try {
            const [
                studentsData,
                subjectsData,
                examsData,
                attendancesData,
            ] = await Promise.all([
                getStudents(),
                getSubjects(),
                getExams(),
                getAttendances(),
            ]);

            setStudents(Array.isArray(studentsData) ? studentsData : [])
            setSubjects(Array.isArray(subjectsData) ? subjectsData : [])
            setExams(Array.isArray(examsData) ? examsData : [])
            setAttendances(Array.isArray(attendancesData) ? attendancesData : [])
        } catch (err) {
            setError(err.message || "Failed to load dashboard.")
        } finally {
            setLoading(false);
        }
    }

    const attendanceSummary = useMemo(() => {
        return attendances.reduce(
            (summary, record) => {
                const status = String(record.status || "").toLowerCase();

                if (status === "present") {
                    summary.present += 1;
                } else if (status === "absent") {
                    summary.absent += 1;
                } else if (status === "late") {
                    summary.late += 1;
                }

                return summary;
            },
            {
                present: 0,
                absent: 0,
                late: 0,
            }
        );
    }, [attendances]);

    if (loading) {
        return (
            <div className="p-6">
                <LoadingState message="Loading teacher dashboard..."/>
            </div>
        );
    }

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">
                    Teacher Dashboard
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Welcome back, {user?.username || "Teacher"}.
                </p>
            </div>

            {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                    {error}
                </div>
            )}

            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard 
                    title="Students"
                    value={students.length}
                    description="Students in the system"
                />
                
                <StatCard 
                    title="Subjects"
                    value={subjects.length}
                    description="Available subjects"
                />
                
                <StatCard 
                    title="Exams"
                    value={exams.length}
                    description="Recorded exams"
                /><StatCard 
                    title="Attendances"
                    value={attendances.length}
                    description="Recorded attendances"
                />
            </div>

            {/* Attendance Summary */}
            <SectionCard title="Attendances Overview">
                <div className="grid gap-4 sm:grid-cols-3">
                    <div className="rounded-lg bg-gray-50 p-4">
                        <p className="text-sm text-gray-500">Present</p>
                        <p className="mt-1 text-2xl font-bold text-gray-90">
                            {attendanceSummary.present}
                        </p>    
                    </div>   

                    <div className="rounded-lg bg-gray-50 p-4">
                        <p className="text-sm text-gray-500">
                            Absent
                        </p>
                        <p className="mt-1 text-2xl font-bold text-gray-900">
                            {attendanceSummary.absent}
                        </p>
                    </div>
                    
                    <div className="rounded-lg bg-gray-50 p-4">
                        <p className="text-sm text-gray-500">
                            Late
                        </p>
                        <p className="mt-1 text-2xl font-bold text-gray-900">
                            {attendanceSummary.late}
                        </p>
                    </div>
                </div>
            </SectionCard>

            {/* Recent Students */}
            <SectionCard title="Recent Students">
                {students.length === 0 ? (
                    <p className="text-sm text-gray-500">
                        No students available.
                    </p>
                ) : (
                    <div className="divide-y">
                        {students.slice(0, 5).map((student) => (
                            <div 
                                key={student.id}
                                className="flex items-center justify-between py-4"
                            >
                                <div>
                                    <p className="font-medium text-gray-900">
                                        {student.firstName} {student.lastName}
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        {student.registrationNumber || "No registration number"}
                                    </p>
                                </div>

                                <span className="text-sm text-gray-500">
                                    {student.grade || "-"}
                                </span>
                            </div>
                        ))}
                    </div>    
                )}
            </SectionCard>
        </div>
    )
}