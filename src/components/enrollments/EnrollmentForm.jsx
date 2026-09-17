export default function EnrollmentForm({
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
                    Create Enrollment
                </h2>

                <button
                    type="button"
                    onClick={onClose}
                    className="text-sm text-gray-500 hover:text-gray-900"
                >
                    Cancel
                </button>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Student
                    </label>

                    <select 
                        name="studentId" 
                        value={form.studentId}
                        onChange={onChange}
                        required
                        className="w-full rounded-lg border px-3 py-2"
                    >
                        <option value="">Select student</option>

                        {students.map((student) => (
                            <option key={student.id} value={student.id}>
                                {student.registrationNumber} - {student.firstName}{" "}
                                {student.lastName}
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
                        className="w-full rounded-lg border px-3 py-2"
                    >
                        <option value="">Select Subject</option>

                        {subjects.map((subject) => (
                            <option key={subject.id} value={subject.id}>
                                {subject.subjectName}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Academic Year
                    </label>

                    <input 
                        type="text"
                        name="academicYear"
                        value={form.academicYear}
                        onChange={onChange}
                        required
                        placeholder="2026"
                        className="w-full rounded-lg border px-3 py-2"
                    />
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Form
                    </label>

                    <select 
                        name="form" 
                        value={form.form}
                        onChange={onChange}
                        required
                        className="w-full rounded-lg border px-3 py-2"
                    >
                        <option value="">Select student</option>
                        <option value="Form 1">Form 1</option>
                        <option value="Form 2">Form 2</option>
                        <option value="Form 3">Form 3</option>
                        <option value="Form 4">Form 4</option>
                        <option value="Form 5">Form 5</option>
                        <option value="Form 6">Form 6</option>
                    </select>
                </div>

                <button
                    type="button"
                    disabled={saving}
                    className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
                >
                    {saving ? "Creating..." : "Create Enrollment"}
                </button>
                
            </form>
        </div>
    )
}