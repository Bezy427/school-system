export default function AttendanceForm({
    form,
    students = [],
    subjects = [],
    saving,
    onChange,
    onSubmit,
    onClose,
}) {
    return (
        <div className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                    Record Attendance
                </h2>

                <button
                    type="button"
                    onClick={onClose}
                    disabled={saving}
                    className="text-sm leading-none text-gray-400 hover:text-gray-600"
                >
                    Cancel
                </button>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Student
                        </label>

                        <select 
                            name="studentId"
                            value={form.studentId}
                            onChange={onChange}
                            required
                            className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" 
                        >
                            <option value="">Select student</option>

                            {students.map((student) => (
                                <option key={student.id} value={student.id}>
                                    {student.registrationNumber} - {" "}
                                    {student.firstName} {student.lastName}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Subject
                        </label>

                        <select 
                            name="subjectId"
                            value={form.subjectId}
                            onChange={onChange}
                            required
                            className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" 
                        >
                            <option value="">Select subject</option>

                            {subjects.map((subject) => (
                                <option key={subject.id} value={subject.id}>
                                    {subject.subjectName}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    <div>
                        <label htmlFor="" className="text-sm font-medium text-gray-700">
                            Date
                        </label>

                        <input 
                            type="date"
                            name="date"
                            value={form.date}
                            onChange={onChange}
                            required
                            className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" 
                        />
                    </div>
                    
                    <div>
                        <label className="text-sm font-medium text-gray-700">
                            Status
                        </label>

                        <select 
                            name="status"
                            value={form.status}
                            onChange={onChange}
                            required
                            className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" 
                        >
                            <option value="Present">Present</option>
                            <option value="Absent">Absent</option>
                            <option value="Late">Late</option>
                            <option value="Excused">Excused</option>
                        </select>
                    </div>
                    
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
                            : "Record Attendance"}
                    </button>
                </div>
            </form>
            </div>
    );
}