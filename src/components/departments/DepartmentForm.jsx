export default function TeacherForm({
    form,
    editingDepartment,
    saving,
    onChange,
    onSubmit,
    onClose,
}) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="max-w-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-xl">

                <div className="flex items-center justify-between border-b px-6 py-4">
                    <div>
                        <h2 className="font-lg font-semibold text-gray-900">
                            {editingDepartment
                                ? "Edit Department"
                                : "Add Department"}
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            {editingDepartment
                                ? "Update the department."
                                : "Create a new school department."}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={saving}
                        className="text-2xl leading-none text-gray-400 hover:text-gray-600"
                    >
                            *
                        </button>
                </div>

                <form onSubmit={onSubmit} className="p-6">
                    <div className="grid gap-4 sm:grid-cols-2">

                        <div>
                            <label 
                                htmlFor="department-name"
                                className="text-sm font-medium text-gray-700">
                                Department Name
                            </label>

                            <input 
                                id="department-name"
                                name="name"
                                value={form.name}
                                onChange={onChange}
                                required
                                placeholder="Science"
                                className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>
                    </div>
                    
                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={saving}
                            className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        
                        <button
                            type="submit"
                            disabled={saving}
                            className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                        >
                            {saving 
                                ? "Saving..."
                                : editingDepartment
                                ? "Update Department"
                                : "Create Department"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}