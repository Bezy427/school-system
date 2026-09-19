import { useState, useMemo, useEffect } from "react";
import { getSubjects } from "../../services/api";
import SectionCard from "../../components/dashboard/SectionCard";
import LoadingState from "../../components/dashboard/LoadingState";

export default function Students() {
    const [subjects, setSubjects] = useState([]);
    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadSubjects();
    }, []);

    async function loadSubjects() {
        setLoading(true);
        setError("");

        try {
            const data = await getSubjects();

            setSubjects(Array.isArray(data) ? data : [])
        } catch (err) {
            setError(err.message || "Failed to load subjects.");
        } finally {
            setLoading(false);
        }
    }

    const filteredSubjects = useMemo(() => {
        const query = search.trim().toLowerCase();

        if (!query) return subjects;

        return subjects.filter((subject) => {
            const department = 
                typeof subject.department === "string"
                    ? subject.department
                    : subject.department?.name;

            return [subject.subjectName, department]        
                .filter(Boolean)
                .some((value) => 
                    String(value).toLowerCase().includes(query)
                );
        })
    }, [subjects, search]);

    return (
        <div className="space-y-6 p-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">
                    Subjects
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    View available school subjects.
                </p>
            </div>

            {error && (
                <div className="rounded-lg border border-red-50 p-4 text-sm text-red-700">
                    {error}
                </div>
            )}

            <SectionCard title="Subjects">
                <div className="mb-5">
                    <input 
                        type="search"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search subjects..."
                        className="w-full rounded-lg border px-3 py-2 outline-none focus:border-gray-900" 
                    />
                </div>

                {loading ? (
                    <LoadingState message="Loading students..." />
                ) : filteredSubjects.length === 0 ? (
                    <div className="py-8 text-center text-sm text-gray-500">
                        No subjects found.
                    </div>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {filteredSubjects.map((subject) => {
                        const department = 
                        typeof subject.department === "string"
                            ? subject.department
                            : subject.department?.name;
                        
                        return (
                            <div 
                                key={subject.id}
                                className="rounded-xl border bg-white p-5 shadow:sm"
                            >
                            <h2 className="font-semibold text-gray-900">
                                {subject.subjectName}
                            </h2>

                            <p className="mt-2 text-sm text-gray-500">
                                Department: {department || "-"}
                            </p>
                            </div>
                        );
                      })}
                  </div>            
                )}
            </SectionCard>
        </div>
    )
}