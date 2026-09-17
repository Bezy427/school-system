export default function ExamTable({ exams = [], onView }) {
    if (exams.length === 0) {
        return (
            <div className="p-6 text-center text-sm text-gray-500">
                No exams found.
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
                <thead className="border-b bg-gray-50">
                    <tr>
                        <th className="px-4 py-3 font-semibold text-gray-700">
                            Exam
                        </th>
                        
                        <th className="px-4 py-3 font-semibold text-gray-700">
                            Subject
                        </th>
                        
                        <th className="px-4 py-3 font-semibold text-gray-700">
                            Date
                        </th>
                        
                        <th className="px-4 py-3 font-semibold text-gray-700">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody className="divide-y">
                    {exams.map((exam) => (
                        <tr key={exam.id}>
                            <td className="px-4 py-3 font-medium text-gray-900">
                                {exam.name || exam.examName || "-"}
                            </td>
                            
                            <td className="px-4 py-3 font-medium text-gray-900">
                                {exam.subject?.subjectName || 
                                exam.subject?.name || 
                                exam.subjectName ||
                                "-"}
                            </td>
                            
                            <td className="px-4 py-3 font-medium text-gray-900">
                                {exam.date || exam.examDate || "-"}
                            </td>

                            <td className="px-4 py-3">
                                <button 
                                    onClick={() => onView(exam)}
                                    className="rounded-lg border px-3 py-1.5 text-sm font-medium hover:bg-gray-50"
                                >
                                    View 
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}