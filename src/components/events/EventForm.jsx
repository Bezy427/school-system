export default function EventForm({
    form,
    onChange,
    onSubmit,
    onCancel,
    saving,
    editing,
}) {
    return (
        <form onSubmit={onSubmit} className="rounded-xl border bg-white p-6 shadow-sm">
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                    {editing ? "Edit Event" : "Create Event"}
                </h2>

                <p className="mt-1 texts-m text-gray-500">
                    Add a school event to the calendar.
                </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
                <div className="md:col-span-2">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Title
                    </label>

                    <input 
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={onChange}
                        required
                        placeholder="Science Fair"
                        className="w-full rounded-lg border px-3 py-2 outline-none focus:border-gray-900"
                    />   
                </div>
                
                <div className="md:col-span-2">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Location
                    </label>

                    <input 
                        type="text"
                        name="lectures"
                        value={form.lectures}
                        onChange={onChange}
                        required
                        placeholder="Lecture Hall 1"
                        className="w-full rounded-lg border px-3 py-2 outline-none focus:border-gray-900"
                    />   
                </div>
                
                <div className="md:col-span-2">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Date
                    </label>

                    <input 
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={onChange}
                        required
                        placeholder="Science Fair"
                        className="w-full rounded-lg border px-3 py-2 outline-none focus:border-gray-900"
                    />   
                </div>
                
                <div className="md:col-span-2">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Start Time
                    </label>

                    <input 
                        type="time"
                        name="startTime"
                        value={form.startTime}
                        onChange={onChange}
                        required
                        className="w-full rounded-lg border px-3 py-2 outline-none focus:border-gray-900"
                    />   
                </div>
                
                <div className="md:col-span-2">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        End Time
                    </label>

                    <input 
                        type="time"
                        name="endTime"
                        value={form.endTime}
                        onChange={onChange}
                        required
                        className="w-full rounded-lg border px-3 py-2 outline-none focus:border-gray-900"
                    />   
                </div>
                
                <div className="md:col-span-2">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Comments
                    </label>

                    <textarea 
                        name="comments"
                        value={form.comments}
                        onChange={onChange}
                        rows="4"
                        placeholcder="Annual school science competiton."
                        className="w-full rounded-lg border px-3 py-2 outline-none focus:border-gray-900"
                    />   
                </div>
            </div>
            <div className="md:col-span-2">
                <button 
                    type="button"
                    onClick={onCancel}
                    disabled={saving}
                    className="w-full rounded-lg border px-3 py-2 outline-none focus:border-gray-900"
                >
                    Cancel    
                </button>
                
                <button 
                    type="button"
                    disabled={saving}
                    className="w-full rounded-lg border px-3 py-2 outline-none focus:border-gray-900"
                >
                    {saving ? "Saving..." : editing ? "Update Event" : "Create Event"}   
                </button>  
            </div>
        </form>
    );
}