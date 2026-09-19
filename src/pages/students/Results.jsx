import { useState, useEffect } from "react";
import { getExams } from "../../services/api";
import LoadingState from "../../components/dashboard/LoadingState";
import SectionCard from "../../components/dashboard/SectionCard";

export default function StudentResults() {
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadExams() {
            try {
                setLoading(true);

                const data = await getExams();

                setExams(Array.isArray(data) ? data : []);
            } catch (err) {
                setError(err.message || "Failed to load results");
            } finally {
                setLoading(false);
            }
        }

        loadExams();
    }, []);

    if (loading) {
        return <LoadingState />;
    }

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">
                    Results
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    View your examination information.
                </p>
            </div>

            {error && (
                <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                    {error}
                </div>
            )}

            <SectionCard>
                {exams.length === 0 ? (
                    <p className="py-8 text-center text-gray-500">
                        No examinations record found.
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
                                        Exam Date
                                    </th>
                                    
                                    <th className="px-4 py-3 font-semibold">
                                        Decision
                                    </th>
                                    
                                    <th className="px-4 py-3 font-semibold">
                                        Start 
                                    </th>
                                    
                                    <th className="px-4 py-3 font-semibold">
                                        End 
                                    </th>
                                    
                                    <th className="px-4 py-3 font-semibold">
                                        Postponed 
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {exams.map((exam) => (
                                    <tr 
                                        key={exam.id}
                                        className="border-b last:border-0 hover:bg-gray-50">
                                        <td className="px-4 py-3">
                                            {exams.studentId ?? "-"}
                                        </td>
                                        
                                        <td className="px-4 py-3">
                                            {exams.examDate ?? "-"}
                                        </td>
                                        
                                        <td className="px-4 py-3">
                                            {exams.decision ?? "-"}
                                        </td>
                                        
                                        <td className="px-4 py-3">
                                            {exams.startTime ?? "-"}
                                        </td>
                                        
                                        <td className="px-4 py-3">
                                            {exams.endTime ?? "-"}
                                        </td>
                                        
                                        <td className="px-4 py-3">
                                            {exams.postPone ?? "-"}
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