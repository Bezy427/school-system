export default function AttendanceTable({
    attendance = [],
}) {
    if (attendance.length === 0) {
        return (
            <div className="p-6 text-center text-sm text-gray-500">
                No attendance records found.
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Student
                        </th>
                        
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Subject
                        </th>
                        
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Date
                        </th>
                        
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Status
                        </th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                    {attendance.map((record) => (
                        <tr key={record.id}>
                            <td className="px-4 py-3 font-medium text-gray-900">
                                {record.student?.firstName
                                    ? `${record.student.firstName} ${record.student.lastName}`
                                    : record.studentName || record.studentId}
                            </td>
                            
                            <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                                {record.registrationNumber || 
                                    record.subjectName ||
                                    record.subjectId}
                            </td>
                            
                            <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                                {record.date || "-"}
                            </td>
                            
                            <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                                    {record.status || "-"}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}