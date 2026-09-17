export default function TeacherTable({
    teachers = [],
    onEdit,
    onDelete,
    deletingId,
})  {
   if (teachers.length === 0) {
        return (
            <div className="p-8 text-center">
                <p className="font-medium text-gray-900">
                    No teachers found.
                </p>

                <p className="mt-1 text-sm text-gray-500">
                    Try a different search or add a new teacher.
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
                            Teacher
                        </th>
                        
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Username
                        </th>
                        
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Subject
                        </th>
                        
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Department
                        </th>
                        
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Qualification
                        </th>
                        
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Action
                        </th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                    {teachers.map((teacher) => (
                        <tr
                            key={teacher.id}
                            className="hover:bg-gray-50"
                        >
                            <td className="whitespace-nowrap px-4 py-4">
                                <p className="font-medium text-gray-900">
                                    {teacher.firstName} {teacher.lastName}
                                </p>

                                <p className="text-sm text-gray-500">
                                    {teacher.email || "-"}
                                </p>

                            </td>
                            
                            <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                                {teacher.username || "-"}
                            </td>
                            
                            <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                                {teacher.subject || "-"}
                            </td>
                            
                            <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                                {teacher.department || "-"}
                            </td>
                            
                            <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                                {teacher.qualification || "-"}
                            </td>
                                                       
                            <td className="whitespace-nowrap px-4 py-4 text-right">
                                <button 
                                    type="button"
                                    onClick={() => onEdit(teacher)}
                                    className="mr-3 text-sm font-medium text-blue-600 hover:text-blue-800"
                                >
                                    Edit
                                </button>

                                <button 
                                    type="button"
                                    onClick={() => onDelete(teacher)}
                                    className="text-sm font-medium text-red-600 hover:text-red-800 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {deletingId === teacher.id 
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