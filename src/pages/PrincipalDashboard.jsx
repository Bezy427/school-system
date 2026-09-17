import { useState, useEffect } from "react";
import { getDepartments, getEvents, getStudent, getStudents, getSubjects, getTeachers } from "../services/api";
import StatCard from "../components/dashboard/StatCard";
import SectionCard from "../components/dashboard/SectionCard";

export default function PrincipalDashboard() {
    const [students, setStudents] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [events, setEvents] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadDashboard() {
            try {
                setLoading(true);
                setError("");

                const [
                    studentsData,
                    teachersData,
                    departmentsData,
                    subjectsData,
                    eventsData,
                ] = await Promise.all([
                    getStudents(),
                    getTeachers(),
                    getDepartments(),
                    getSubjects(),
                    getEvents(),
                ]);

                setStudents(studentsData || []);
                setTeachers(teachersData ||  []);
                setDepartments(departmentsData || []);
                setSubjects(subjectsData || []);
                setEvents(eventsData || []);
            } catch (err) {
                setError(
                    err.message || "Failed to load dashboard data."
                );
            } finally {
                setLoading(false);
            }
        }

        loadDashboard();
    }, []);

    if (error) {
        return (
            <div className="p-4 sm:p-6 lg:p-8">
                <div className="rounded-xl border border-red-200 bg-red-50 p-5">
                    <h1 className="font-semibold text-red-800">
                        Unable to load dashboard
                    </h1>

                    <p className="mt-1 text-sm text-red-700">
                        {error}
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">
                    Principal Dashboard
                </h1>

                <p className="mt-2 text-gray-500">
                    Overview of school activities and academic information.
                </p>
            </div>

            <div className="mt-2 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard 
                    title="Students"
                    value={students.length}
                    description="Registered students"
                />

                <StatCard 
                    title="Teachers"
                    value={teachers.length}
                    description="Teaching staff"
                />

                <StatCard 
                    title="Departments"
                    value={departments.length}
                    description="School departments"
                />

                <StatCard 
                    title="Subjects"
                    value={subjects.length}
                    description="Available subjects"
                />
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <SectionCard title="Recent Students">
                    {students.length === 0 ? (
                        <p className="text-sm text-gray-500">
                            No students found.
                        </p>
                    ) : (
                        <div className="divide-y">
                            {students.slice(0, 5).map((student) => (
                                <div 
                                    key={student.id}
                                    className="flex items-center justify-between py-3"
                                >
                                    <div>
                                        <p className="font-medium text-gray-900">
                                            {students.firstName} {student.lastName}
                                        </p>

                                        <p className="text-sm text-gray-500">
                                            {student.registrationNumber}
                                        </p>
                                    </div>

                                    <span className="text-sm text-gray-500">
                                        {student.grade}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </SectionCard>

                <SectionCard title="Upcoming Events">
                    {events.length === 0 ? (
                        <p className="text-sm text-gray-500">
                            No events found.
                        </p>
                    ) : (
                        <div className="divide-y">
                            {events.slice(0, 5).map((event) => (
                                <div
                                    key={event.id}
                                    className="py-3"
                                >
                                    <p className="font-medium text-gray-900">
                                        {event.title}
                                    </p>
                                    
                                    <p className="font-medium text-gray-500">
                                        {event.date}
                                    </p>    
                                </div>
                            ))}
                        </div>
                    )}
                </SectionCard>
            </div>
        </div>
    );
}