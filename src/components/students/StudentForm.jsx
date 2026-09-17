export default function StudentForm({
    form,
    editingStudent,
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
                            {editingStudent
                                ? "Edit Student"
                                : "Add Student"}
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            {editingStudent
                                ? "Update student's information."
                                : "Enter the student's information."}
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
                            <label className="text-sm font-medium text-gray-700">
                                Registration Number.
                            </label>

                            <input 
                                name="registrationNumber"
                                value={form.registrationNumber}
                                onChange={onChange}
                                required
                                className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>
                        
                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Grade
                            </label>

                            <input 
                                name="grade"
                                value={form.grade}
                                onChange={onChange}
                                placeholder="Grade 10"
                                required
                                className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>
                        
                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                First Name
                            </label>

                            <input 
                                name="firstName"
                                value={form.firstName}
                                onChange={onChange}
                                required
                                className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>
                        
                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Last Name
                            </label>

                            <input 
                                name="lastName"
                                value={form.lastName}
                                onChange={onChange}
                                required
                                className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>
                        
                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Email
                            </label>

                            <input 
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={onChange}
                                required
                                className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>
                        
                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Date Of Birth
                            </label>

                            <input 
                                type="date"
                                name="dateOfBirth"
                                value={form.dateOfBirth}
                                onChange={onChange}
                                required
                                className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>
                        
                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Gender
                            </label>

                            <select
                                name="gender"
                                value={form.gender}
                                onChange={onChange}
                                required
                                className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            >
                                <option value="">Select gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        
                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Parent Contact
                            </label>

                            <input 
                                type="tel"
                                name="parentContact"
                                value={form.parentContact}
                                onChange={onChange}
                                required
                                className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
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
                                    : editingStudent
                                    ? "Update Student"
                                    : "Create Student"}
                            </button>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    )
}