export default function TeacherExamForm({
    form,
    students = [],
    saving,
    onChange,
    onSubmit,
    onCancel,
}) {
    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <div className="rounded-xl border bg-white p-5 shadow-sm">
                <div className="mb-5 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Schedule Exam
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Create an exam record for a student
                    </p>
                </div>
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Student
                    </label>

                    <select
                        name="studentId"
                        value={form.studentId}
                        onChange={onChange}
                        required
                        className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-gray-200"
                    >
                        <option value="">Select Student</option>

                        {students.map((student) => (
                            <option key={student.id} value={student}>
                                {student.registrationNumber} - {student.firstName}{" "}
                                {student.lastName}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Exam Date
                    </label>

                    <input 
                        type="date"
                        name="examDate"
                        value={form.examDate}
                        onChange={onChange}
                        required
                        className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-gray-200"
                    />
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Decision
                    </label>

                    <select 
                        name="decision"
                        value={form.decision}
                        onChange={onChange}
                        required
                        className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-gray-200"
                    >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Start Time
                    </label>

                    <input 
                        type="time"
                        name="startTime"
                        value={form.startTime}
                        onChange={onChange}
                        required
                        className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-gray-200"
                    />
                </div>
                
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        End Time
                    </label>

                    <input 
                        type="time"
                        name="endTime"
                        value={form.endTime}
                        onChange={onChange}
                        required
                        className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-gray-200"
                    />
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Postpone
                    </label>

                    <select 
                        name="postPone"
                        value={form.postPone}
                        onChange={onChange}
                        required
                        className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-gray-200"
                    >
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                    </select>
                </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
                

                <button
                    type="button"
                    onClick={onCancel}
                    disabled={saving}
                    className="text-sm text-gray-500 hover:text-gray-900"
                >
                        Cancel
                </button>
                <button
                    type="submit"
                    disabled={saving}
                    className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:ring-2 hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {saving ? "Saving..." : "Create Exam"}
                </button>
            </div>
        </form>
    );
}