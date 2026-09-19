import { useState, useEffect } from "react";
import { getSubjects } from "../../services/api";
import LoadingState from "../../components/dashboard/LoadingState";
import SectionCard from "../../components/dashboard/SectionCard";

export default function StudentSubjects() {
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");

    useEffect(() => {
        async function loadSubjects() {
            try {
                setLoading(true);
                const data = await getSubjects();
                setSubjects(Array.isArray(data) ? data : []);
            } catch (err) {
                setError(err.message || "Failed to load subjects.");
            } finally {
                setLoading(false);
            }
        }

        loadSubjects();
    }, []);

    const filteredSubjects = subjects.filter((subject) => {
        const value = search.toLowerCase();

        return (
            subject.subjectName?.toLowerCase().includes(value) ||
            String(subject.departmentId || "").includes(value)
        );
    });

    if (loading) {
        return <LoadingState />;
    }

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Subjects</h1>
                <p className="mt-1 text-sm text-gray-500">
                    View Subjects available at the school.
                </p>
            </div>

            {error && (
                <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                    {error}
                </div>
            )}

            <SectionCard>
                <div className="mb-4">
                    <input 
                        type="text"
                        placeholder="Search subjects..."
                        value={search} 
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
                    />
                </div>

                {filteredSubjects.length === 0 ? (
                    <p className="py-8 text-center text-gray-500">
                        No subjects found.
                    </p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left text-sm">
                            <thead>
                                <tr className="border-b bg-gray-50">
                                    <th className="px-4 py-3 font-semibold">ID</th>
                                    <th className="px-4 py-3 font-semibold">Subject</th>
                                    <th className="px-4 py-3 font-semibold">Department</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredSubjects.map((subject) => (
                                    <tr 
                                        key={subject.id}
                                        className="border-b last:border-0 hover:bg-gray-50">
                                        <td className="px-4 py-3">{subject.id}</td>
                                        <td className="px-4 py-3 font-medium">{subject.subjectName}</td>
                                        <td className="px-4 py-3">{subject.departmentId ?? "-"}</td>
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