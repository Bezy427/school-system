export default function StudentTable({
    students = [],
    onEdit,
    onDelete,
    deletingId,
}) {
    if (students.length === 0) {
        return (
            <div className="p-8 text-center">
                <p className="font-medium text-gray-900">
                    No students found.
                </p>

                <p className="mt-1 text-sm text-gray-500">
                    Try a different search or add a new student.
                </p>
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
                            Registration No.
                        </th>
                        
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Grade
                        </th>
                        
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Email
                        </th>
                        
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                    {students.map((student) => (
                        <tr
                            key={student.id}
                            className="hover:bg-gray-50"
                        >
                            <td className="whitespace-nowrap px-4 py-4">
                                <p className="font-medium text-gray-900">
                                    {student.firstName} {student.lastName}
                                </p>

                                <p className="text-sm text-gray-500">
                                    {student.gender || "-"}
                                </p>

                            </td>
                            
                            <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                                {student.registrationNumber || "-"}
                            </td>
                            
                            <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                                {student.grade || "-"}
                            </td>
                            
                            <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                                {student.email || "-"}
                            </td>
                            
                            <td className="whitespace-nowrap px-4 py-4 text-right">
                                <button 
                                    type="button"
                                    onClick={() => onEdit(student)}
                                    className="mr-3 text-sm font-medium text-blue-600 hover:text-blue-800"
                                >
                                    Edit
                                </button>

                                <button 
                                    type="button"
                                    onClick={() => onDelete(student)}
                                    className="text-sm font-medium text-red-600 hover:text-red-800 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {deletingId === student.id 
                                        ? "Deleting..."
                                        : "Delete"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}