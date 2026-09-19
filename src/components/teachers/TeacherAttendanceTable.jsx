export default function TeacherAttendanceTable({
    attendance = [],
}) {
    if (attendance.length === 0) {
        return (
            <div className="p-6 text-center text-sm text-gray-500">
                No attendance records found.
            </div>
        );
    }

    function getStudentName(record) {
        if (record.student) {
            return `${record.student.firstName || ""} ${
                record.student.lastName || ""
            }`.trim();
        }

        return (
            record.studentName ||
            `Student #${record.studentId || "-"}`
        );
    }

    function getSubjectName(record) {
        if (record.subject) {
            return (
                record.subject.subjectName ||
                record.subject.name ||
                "Unknown subject"
            );
        }

        return record.subjectName || `Subject #${record.subjectId || "-"}`;
    }

    function getStatusClasses(status) {
        switch(String(status || "").toLowerCase()) {
            case "present":
                return "bg-greeen-100 text-green-700";

            case "absent":
                return "bg-red-100 text-red-700";
                
            case "late":
                return "bg-yellow-100 text-yellow-700";
                
            case "excused":
                return "bg-blue-100 tex-blue-700";

            default:
                return "bg-gray-100 text-gray-700";
        }
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
                        <tr key={record.id} className="hover:bg-gray-50">
                            <td className="whitespace-nowrap px-6 py-4">
                                <p className="font-medium text-gray-900">
                                    {getStudentName(record)}
                                </p>
                            </td>
                            
                            <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                                {getSubjectName(record)}
                            </td>
                            
                            <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                                {record.date || "-"}
                            </td>
                            
                            <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                                <span className={`rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 ${getStatusClasses(
                                    record.status
                                )}`}>
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