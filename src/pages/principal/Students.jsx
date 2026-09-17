import { useEffect, useState } from "react";
import { createStudent, getStudents, updateStudent, deleteStudent } from "../../services/api";
import StudentTable from "../../components/students/StudentTable";
import StudentForm from "../../components/students/StudentForm";

const emptyForm = {
    registrationNumber: "",
    firstName: "",
    lastName: "",
    email: "",
    grade: "",
    dateOfBirth: "",
    gender: "",
    parentContact: "",
};

export default function Students() {
    const [student, setStudent] = useState([]);
    const [form, setForm] = useState(emptyForm);

    const [search, setSearch] = useState("");

    const [editingStudent, setEditingStudent] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    async function loadStudents() {
        try {
            setLoading(true);
            setError("");

            const data = await getStudents();

            setStudent(data || []);
        } catch (err) {
            setError(err.message || "Failed to load students.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadStudents();
    }, []);

    function handleChange(event) {
        const { name, value } = event.target;

        setForm((currentForm) => ({
            ...currentForm,
            [name]: value,
        }));
    }

    function openCreateForm() {
        setEditingStudent(null);
        setForm(emptyForm);
        setError("");
        setSuccess("");
        setShowForm(true);
    }

    function openEditForm(student) {
        setEditingStudent(student);

        setForm({
            registrationNumber: student.registrationNumber || "",
            firstName: student.firstName || "",
            lastName: student.lastName || "",
            email: student.email || "",
            grade: student.grade || "",
            dateOfBirth: student.dateOfBirth || "",
            gender: student.gender || "",
            parentContact: student.parentContact || "",
        });

        setError("");
        setSuccess("");
        setShowForm(true);
    }

    function closeForm() {
        if (saving) return;

        setShowForm(false);
        setEditingStudent(null);
        setForm(emptyForm);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            setSaving(true);
            setError("");
            setSuccess("");

            if (editingStudent) {
                await updateStudent(editingStudent.id, form);
                setSuccess("Student updated successfully.");
            } else {
                await createStudent(form);
                setSuccess("Student has successfully been created!")
            }

            await loadStudents();

            setShowForm(false);
            setEditingStudent(null);
            setForm(emptyForm);
        } catch (err) {
            setError(err.message || "Failed to save student.");
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete(student) {
        const confirmed = window.confirm(
            `Are you sure want to delete ${student.firstName} ${student.lastName}?`
        );

        if (!confirmed) return;

        try {
            setDeletingId(student.id);
            setError("");
            setSuccess("");

            await deleteStudent(student.id);

            setSuccess("Student deleted successfully.");

            await loadStudents();
        } catch(err) {
            setError(err.message || "Failed to delete student.");
        } finally {
            setDeletingId(null);
        }
    }

    const filteredStudents = student.filter((student) => {
        const searchTerm = search.toLowerCase().trim();

        if (!searchTerm) return true;

        const searchableText = [
            student.registrationNumber,
            student.firstName,
            student.lastName,
            student.email,
            student.grade,
        ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();

        return searchableText.includes(searchTerm);    
    });

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Students
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Manage students registered at the school.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={openCreateForm}
                    className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
                >
                    + Add Student
                </button>
            </div>

            {error && (
                <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4">
                    <p className="text-sm text-red-700">{error}</p>
                </div>
            )}

            {success && (
                <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-4">
                    <p className="text-sm text-green-700">{success}</p>
                </div>
            )}

            <div className="mt-6 rounded-xl border bg-white p-4 shadow-sm">
                <label 
                    htmlFor="student-search"
                    className="text-sm font-medium text-gray-700"
                >
                    Search Students
                </label>

                <input 
                    type="text"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search for students..."
                    className="w-full rounded-lg border bg-white px-4 py-2.5 outline-none focus:ring-2 focus:ring-gray-200"
                />
            </div>

            <div className="mt-6 overflow-hiddden rounded-xl border bg-white shadow-sm">
                {loading ? (
                    <div className="p-8 text-center">
                        <p className="text-sm text-gray-500">
                            Loading students...
                        </p>
                    </div>
                ) : (
                    <StudentTable
                        students={filteredStudents}
                        onEdit={openEditForm}
                        onDelete={handleDelete}
                        deletingId={deletingId}
                    />
                )}
            </div>

            {showForm && (
                <StudentForm
                    form={form}
                    editingStudent={editingStudent}
                    saving={saving}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    onClose={closeForm}
                />
            )}
        </div>
    );
}