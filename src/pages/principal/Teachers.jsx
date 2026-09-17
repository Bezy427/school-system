import { useEffect, useState } from "react";
import { createTeacher, getTeachers, updateTeacher, deleteTeacher, getDepartments } from "../../services/api";
import TeacherTable from "../../components/teachers/TeacherTable";
import TeacherForm from "../../components/teachers/TeacherForm";

const emptyForm = {
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    subject: "",
    qualification: "",
    department: "",
    hireDate: "",
    phoneNumber: "",
    role: "",
    address: "",
};

export default function Teachers() {
    const [teachers, setTeachers] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [form, setForm] = useState(emptyForm);

    const [search, setSearch] = useState("");

    const [editingTeacher, setEditingTeacher] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    async function loadData() {
        try {
            setLoading(true);
            setError("");

            const [teachersData, departmentsData] = 
                await Promise.all([
                    getTeachers(),
                    getDepartments(),
                ]);

            setTeachers(teachersData || []);
            setDepartments(departmentsData || []);
        } catch (err) {
            setError(err.message || "Failed to load teachers.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    function handleChange(event) {
        const { name, value } = event.target;

        setForm((currentForm) => ({
            ...currentForm,
            [name]: value,
        }));
    }

    function openCreateForm() {
        setEditingTeacher(null);
        setForm(emptyForm);
        setError("");
        setSuccess("");
        setShowForm(true);
    }

    function openEditForm(teacher) {
        setEditingTeacher(teacher);

        setForm({
            username: teacher.username || "",
            firstName: teacher.firstName || "",
            lastName: teacher.lastName || "",
            email: teacher.email || "",
            password: "",
            subject: teacher.subject || "",
            qualification: teacher.qualification || "",
            department: teacher.department || "",
            hireDate: teacher.hireDate || "",
            phoneNumber: teacher.phoneNumber || "",
            role: teacher.role || "",
            address: teacher.address || "",
        });

        setError("");
        setSuccess("");
        setShowForm(true);
    }

    function closeForm() {
        if (saving) return;

        setShowForm(false);
        setEditingTeacher(null);
        setForm(emptyForm);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            setSaving(true);
            setError("");
            setSuccess("");

            if (editingTeacher) {
                const { password, ...teacherData } = form;

                await updateTeacher(editingTeacher.id, teacherData);
                setSuccess("Teacher updated successfully.");
            } else {
                await createTeacher(form);
                setSuccess("Teacher has successfully been created!")
            }

            await loadData();

            setShowForm(false);
            setEditingTeacher(null);
            setForm(emptyForm);
        } catch (err) {
            setError(err.message || "Failed to save teacher.");
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete(teacher) {
        const confirmed = window.confirm(
            `Are you sure want to delete ${teacher.firstName} ${teacher.lastName}?`
        );

        if (!confirmed) return;

        try {
            setDeletingId(teacher.id);
            setError("");
            setSuccess("");

            await deleteTeacher(student.id);

            setSuccess("Teacher deleted successfully.");

            await loadData();
        } catch(err) {
            setError(err.message || "Failed to delete teacher.");
        } finally {
            setDeletingId(null);
        }
    }

    const filteredTeachers = teachers.filter((teacher) => {
        const searchTerm = search.toLowerCase().trim();

        if (!searchTerm) return true;

        const searchableText = [
            teacher.username,
            teacher.firstName,
            teacher.lastName,
            teacher.email,
            teacher.subject,
            teacher.department,
            teacher.qualification,
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
                        Teachers
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Manage teachers registered at the school.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={openCreateForm}
                    className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
                >
                    + Add Teacher
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
                    htmlFor="teacher-search"
                    className="text-sm font-medium text-gray-700"
                >
                    Search teachers
                </label>

                <input 
                    id="teacher-search"
                    type="text"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search by name.."
                    className="w-full rounded-lg border bg-white px-4 py-2.5 outline-none focus:ring-2 focus:ring-gray-200"
                />
            </div>

            <div className="mt-6 overflow-hiddden rounded-xl border bg-white shadow-sm">
                {loading ? (
                    <div className="p-8 text-center">
                        <p className="text-sm text-gray-500">
                            Loading teachers...
                        </p>
                    </div>
                ) : (
                    <TeacherTable
                        teacher={filteredTeachers}
                        onEdit={openEditForm}
                        onDelete={handleDelete}
                        deletingId={deletingId}
                    />
                )}
            </div>

            {showForm && (
                <TeacherForm
                    form={form}
                    departments={departments}
                    editingTeacher={editingTeacher}
                    saving={saving}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    onClose={closeForm}
                />
            )}
        </div>
    );
}