export default function EnrollmentTable({ enrollments = [] }) {
    if (enrollments.length === 0) {
        return (
            <div className="p-6 text-center text-sm text-gray-500">
                No enrollments found.
            </div>
        );
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
                            Subject
                        </th>
                        
                        <th className="px-4 py-3 font-semibold text-gray-700">
                            Academic Year
                        </th>
                        
                        <th className="px-4 py-3 font-semibold text-gray-700">
                            Form
                        </th>
                    </tr>
                </thead>

                <tbody className="divide-y">
                    {enrollments.map((enrollment) => (
                        <tr key={enrollment.id}>
                            <td className="px-4 py-3 font-medium text-gray-900">
                                {enrollment.student?.firstName
                                    ? `${enrollment.student.firstName} ${enrollment.student.lastName}`
                                    : enrollment.studentName || enrollment.studentId}
                            </td>

                            <td className="px-4 py-3 text-gray-600">
                                {enrollment.subject?.subjectName ||
                                 enrollment.subjectName || 
                                 enrollment.subjectId}
                            </td>

                            <td className="px-4 py-3 text-gray-600">
                                {enrollment.academicYear || "-"}
                            </td>

                            <td className="px-4 py-3 text-gray-600">
                                {enrollment.form || "-"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}