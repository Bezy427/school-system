export default function SubjectTable({
    subject = [],
    onEdit,
    onDelete,
    deletingId,
})  {
   if (subject.length === 0) {
        return (
            <div className="p-6 text-center text-sm text-gray-500">
                No subjects found.
            </div>
        );
   }

   return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Subject
                        </th>
                        
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Department
                        </th>
                        
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                    {subject.map((subject) => (
                        <tr
                            key={subject.id}
                            className="hover:bg-gray-50"
                        >
                            <td className="px-4 py-3 text-gray-600">
                                {subject.subjectName}
                            </td>
                            
                            <td className="px-4 py-4 text-sm text-gray-600">
                                {subject.department?.name || subject.department || "-"} 
                            </td>
                                                       
                            <td className="px-4 py-3">
                                <div className="flex gap-2">
                                    <button 
                                        type="button"
                                        onClick={() => onEdit(department)}
                                        className="mr-3 text-sm font-medium text-blue-600 hover:text-blue-800"
                                    >
                                        Edit
                                    </button>
                                    
                                    <button 
                                        onClick={() => onDelete(subject.id)}
                                        disabled={deletingId === subject.id}
                                        className="rounded-lg bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        {deletingId === department.id 
                                            ? "Deleting..."
                                            : "Delete"}
                                    </button>
                                </div>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
   )
}