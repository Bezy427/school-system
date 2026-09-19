export default function EventTable({
    events = [],
    onDelete,
    deletingId
}) {
    if (events.length === 0) {
        return (
            <div className="p-6 text-center text-sm text-gray-500">
                <p className="text-gray-500">
                   No events found.
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
                            Title
                        </th>
                        
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Location
                        </th>
                        
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Date
                        </th>
                        
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Time
                        </th>
                        
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                    {events.map((event) => (
                        <tr key={event.id} className="hover:bg-gray-50">
                            <td className="whitespace-nowrap px-6 py-4">
                                <p className="font-medium text-gray-900">
                                    {event.title}
                                </p>

                                {event.comments && (
                                    <p className="mt-1 max-w-xs truncat text-sm text-gray-500">
                                        {event.comments}
                                    </p>
                                )}
                            </td>
                            
                            <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                                {event.lectures || "-"}
                            </td>
                            
                            <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                                {event.date || "-"}
                            </td>
                            
                            <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                                {event.startTime || "-"}{" "}
                                {event.endTime ? `- ${event.endTime}` : ""}
                            </td>
                            
                            <td className="whitespace-nowrap px-6 py-4 text-right">
                                <button
                                    type="button"
                                    onClick={() => onDelete(event.id)}
                                    disabled={deletingId === event.id}
                                    className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {deletingId === event.id ? "Deleting..." : "Delete"}
                                </button>  
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}