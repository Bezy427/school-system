export default function TeacherExamTable({ 
    exams = []
 }) {
    if (exams.length === 0) {
        return (
            <div className="p-6 text-center text-sm text-gray-500">
                No exams found.
            </div>
        );
    }

    function getStudentName(exam) {
        if (exam.student) {
            return `${exam.student.firstName || ""} ${
                exam.student.lastName || ""
            }`.trim();
        }

        return exam.studentName || `Student #${exam.studentId || "-"}`;
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
                <thead className="border-b bg-gray-50">
                    <tr>
                        <th className="px-4 py-3 font-semibold text-gray-700">
                            Student
                        </th>
                        
                        <th className="px-4 py-3 font-semibold text-gray-700">
                            Exam Date
                        </th>
                        
                        <th className="px-4 py-3 font-semibold text-gray-700">
                            Decision
                        </th>
                        
                        <th className="px-4 py-3 font-semibold text-gray-700">
                            Time
                        </th>
                        
                        <th className="px-4 py-3 font-semibold text-gray-700">
                            Postponed
                        </th>
                    </tr>
                </thead>

                <tbody className="divide-y">
                    {exams.map((exam) => (
                        <tr key={exam.id} className="hover:bg-gray-50">
                            <td className="whitespace-nowrap px-6 py-4">
                                <p className="font-medium text-gray-900">
                                   {getStudentName(exam)}
                                </p>

                                {exam.studentId && !exam.student && (
                                    <p className="text-sm text-gray-500">
                                        ID: {exam.studentId}
                                    </p>
                                )}
                            </td>
                            
                            <td className="px-4 py-3 font-medium text-gray-900">
                                <p className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                                    {exam.decision || "-"}
                                </p>
                            </td>
                            
                            <td className="px-4 py-3 font-medium text-gray-900">
                                {exam.examDate || "-"}
                            </td>
                            
                            <td className="px-4 py-3 font-medium text-gray-900">
                                {exam.startTime || "-"}
                                {exam.endTime && `${exam.endTime}`}
                            </td>

                            <td className="px-4 py-3 font-medium text-gray-900">
                                {exam.postPone || "-"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}