import { useState, useEffect } from "react";
import LoadingState from "../../components/dashboard/LoadingState";
import SectionCard from "../../components/dashboard/SectionCard";
import { getAttendances } from "../../services/api";

export default function StudentAttendance() {
    const [attendance, setAttendance] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadAttendance() {
            try {
                setLoading(true);

                const data = await getAttendances();

                setAttendance(Array.isArray(data) ? data : []);
            } catch (err) {
                setError(err.message || "Failed to load attendances.")
            } finally {
                setLoading(false);
            }
        }

        loadAttendance();
    }, []);

    if (loading) {
        return <LoadingState />;
    }

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">
                    Attendance
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    View your attendance records.
                </p>
            </div>

            {error && (
                <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red 700">
                    {error}
                </div>
            )}

            <SectionCard>
                {attendance.length === 0 ? (
                    <p className="py-8 text-center text-gray-500">
                        No attendance records found.
                    </p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left text-sm">
                            <thead>
                                <tr className="border-b bg-gray-50">
                                    <th className="px-4 py-3 font-semibold">
                                        Student ID
                                    </th>
                                    
                                    <th className="px-4 py-3 font-semibold">
                                        Subject ID
                                    </th><th className="px-4 py-3 font-semibold">
                                        Student ID
                                    </th>
                                    
                                    <th className="px-4 py-3 font-semibold">
                                        Date
                                    </th><th className="px-4 py-3 font-semibold">
                                        Status
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {attendance.map((record) => (
                                    <tr     
                                        key={record.id}
                                        className="border-b last:border-0 hover:bg-gray-50"
                                    >
                                        <td className="px-4 py-3">
                                            {record.studentId ?? "-"}
                                        </td>
                                        
                                        <td className="px-4 py-3">
                                            {record.subjectId ?? "-"}
                                        </td>
                                        
                                        <td className="px-4 py-3">
                                            {record.date ?? "-"}
                                        </td>
                                        
                                        <td className="px-4 py-3">
                                            {record.status ?? "-"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </SectionCard>
        </div>
    )
}