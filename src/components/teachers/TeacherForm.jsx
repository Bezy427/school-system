export default function TeacherForm({
    form,
    departments,
    editingTeacher,
    saving,
    onChange,
    onSubmit,
    onClose,
}) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white shadow-xl">

                <div className="flex items-center justify-between border-b px-6 py-4">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                            {editingTeacher 
                                ? "Edit Teacher"
                                : "Add Teacher"}
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            {editingTeacher 
                                ? "Update the teacher's information."
                                : "Enter the teacher's information."}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={saving}
                        className="text-2xl leading-none text-gray-400 hover:text-grya-600"
                    >
                        *
                    </button>
                </div>

                <form onSubmit={onSubmit} className="p-6">
                    <div className="grid gap-4 sm:grid-cols-2">

                        <div>
                            <label htmlFor="" className="text-sm font-medium text-gray-700">
                                Username
                            </label>

                            <input 
                                name="name"
                                value={form.username}
                                onChange={onChange}
                                required
                                className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" 
                            />
                        </div>

                        <div>
                            <label htmlFor="" className="text-sm font-medium text-gray-700">
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
                            <label htmlFor="" className="text-sm font-medium text-gray-700">
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
                            <label htmlFor="" className="text-sm font-medium text-gray-700">
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
                        
                        {!editingTeacher && (
                            <div>
                                <label htmlFor="" className="text-sm font-medium text-gray-700">
                                    Password
                                </label>

                                <input 
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={onChange}
                                    required
                                    className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" 
                                />
                            </div>
                        )}

                        <div>
                            <label htmlFor="" className="text-sm font-medium text-gray-700">
                                Subject
                            </label>

                            <input 
                                name="subject"
                                value={form.subject}
                                onChange={onChange}
                                required
                                placeholder="Mathematics"
                                className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-blue-100"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Qualification
                            </label>

                            <input 
                                name="qualification"
                                value={form.qualification}
                                onChange={onChange}
                                required
                                placeholder="MSc Mathematics"
                                className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" 
                            />
                        </div>
                        
                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Department
                            </label>

                            <select 
                                name="department"
                                value={form.department}
                                onChange={onChange}
                                required
                                className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" 
                            >
                                <option value="">
                                    Select department
                                </option>

                                {departments.map((department) => (
                                    <option 
                                        key={department.id}
                                        value={department.name}
                                    >
                                        {department.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Hire Date
                            </label>

                            <input 
                                type="date"
                                name="hireDate"
                                value={form.hireDate}
                                onChange={onChange}
                                required
                                className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" 
                            />
                        </div>
                        
                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Phone Number
                            </label>

                            <input 
                                type="tel"
                                name="phoneNumber"
                                value={form.phoneNumber}
                                onChange={onChange}
                                required
                                className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" 
                            />
                        </div>
                        
                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Role
                            </label>

                            <select
                                name="role"
                                value={form.role}
                                onChange={onChange}
                                required
                                className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" 
                            >
                                <option value="TEACHER">
                                    Teacher
                                </option>
                                
                                <option value="PRINCIPAL">
                                    Principal
                                </option>
                            </select>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="" className="text-sm font-medium text-gray-700">
                                Address
                            </label>

                            <textarea 
                                name="address" 
                                value={form.address}
                                onChange={onChange}
                                rows="3"
                                required 
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
                            className="rounded-lg bg-blue-600 px-4 py-2 5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {saving
                                ? "Saving..."
                                : editingTeacher
                                ? "Update Teacher"
                                : "Create Teacher"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}