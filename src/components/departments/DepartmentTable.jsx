export default function DepartmentTable({
    departments,
    onEdit,
    onDelete,
    deletingId,
})  {
   if (departments.length === 0) {
        return (
            <div className="p-8 text-center">
                <p className="font-medium text-gray-900">
                    No departments found.
                </p>

                <p className="mt-1 text-sm text-gray-500">
                    Try a different search or create a department.
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
                            Department
                        </th>
                        
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                            ID
                        </th>
                        
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                    {departments.map((department) => (
                        <tr
                            key={department.id}
                            className="hover:bg-gray-50"
                        >
                            <td className="px-4 py-4">
                                <p className="font-medium text-gray-900">
                                    {department.name} 
                                </p>

                            </td>
                            
                            <td className="px-4 py-4 text-sm text-gray-500">
                                {department.id}
                            </td>
                                                       
                            <td className="whitespace-nowrap px-4 py-4 text-right">
                                <button 
                                    type="button"
                                    onClick={() => onEdit(department)}
                                    className="mr-3 text-sm font-medium text-blue-600 hover:text-blue-800"
                                >
                                    Edit
                                </button>

                                <button 
                                    type="button"
                                    onClick={() => onDelete(department)}
                                    className="text-sm font-medium text-red-600 hover:text-red-800 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {deletingId === department.id 
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