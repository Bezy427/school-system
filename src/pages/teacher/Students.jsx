import { useState, useMemo, useEffect } from "react";
import { getStudents } from "../../services/api";
import SectionCard from "../../components/dashboard/SectionCard";
import LoadingState from "../../components/dashboard/LoadingState";

export default function Students() {
    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadStudents();
    }, []);

    async function loadStudents() {
        setLoading(true);
        setError("");

        try {
            const data = await getStudents();

            setStudents(Array.isArray(data) ? data : [])
        } catch (err) {
            setError(err.message || "Failed to load students.");
        } finally {
            setLoading(false);
        }
    }

    const filteredStudents = useMemo(() => {
        const query = search.trim().toLowerCase();

        if (!query) return students;

        return students.filter((student) => {
            return [
                student.registrationNumber,
                student.firstName,
                student.lastName,
                student.email,
                student.grade,
                student.gender,
            ]
                .filter(Boolean)
                .some((value) => 
                    String(value).toLowerCase().includes(query)
                );
        })
    }, [students, search]);

    return (
        <div className="space-y-6 p-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">
                    Students
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    View students and their academic information.
                </p>
            </div>

            {error && (
                <div className="rounded-lg border border-red-50 p-4 text-sm text-red-700">
                    {error}
                </div>
            )}

            <SectionCard title="Student Directory">
                <div className="mb-5">
                    <input 
                        type="search"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search students..."
                        className="w-full rounded-lg border px-3 py-2 outline-none focus:border-gray-900" 
                    />
                </div>

                {loading ? (
                    <LoadingState message="Loading students..." />
                ) : filteredStudents.length === 0 ? (
                    <div className="py-8 text-center text-sm text-gray-500">
                        No students found.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-2">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                                        Registration 
                                    </th>
                                    
                                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                                        Name 
                                    </th>
                                    
                                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                                        Email 
                                    </th>
                                    
                                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                                        Grade 
                                    </th>
                                    
                                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                                        Gender 
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200">
                                {filteredStudents.map((student) => (
                                    <tr
                                        key={student.id}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-600">
                                            {student.registrationNumber || "-"}
                                        </td>
                                        
                                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-600">
                                            <p className="font-medium text-gray-900">
                                                {student.firstName} {student.lastName}
                                            </p>
                                        </td>
                                        
                                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-600">
                                            {student.email || "-"}
                                        </td>
                                        
                                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-600">
                                            {student.grade || "-"}
                                        </td>
                                        
                                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-600">
                                            {student.gender || "-"}
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