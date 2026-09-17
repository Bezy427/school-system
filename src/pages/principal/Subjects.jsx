import { useEffect, useState } from "react";
import { createSubject, getSubjects, deleteSubject, getDepartments } from "../../services/api";
import SubjectTable from "../../components/Subjects/SubjectTable";
import SubjectForm from "../../components/subjects/SubjectForm";
import LoadingState from "../../components/dashboard/LoadingState";

const initialForm = {
    subjectName: "",
    departmentId: "",
};

export default function Departments() {
    const [subjects, setSubjects] = useState([]);
    const [departments, setDepartments] = useState([])
    const [form, setForm] = useState(initialForm);

    const [searchTerm, setSearchTerm] = useState("");

    const [editingSubject, setEditingSubject] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    const [error, setError] = useState("");

    useEffect(() => {
        async function loadData() {
            try {
                setLoading(true);
                setError("");

                const [subjectsData, departmentsData] = await Promise.all([
                    getSubjects(),
                    getDepartments(),
                ]);

                setSubjects(Array.isArray(subjectsData) ? subjectsData : []);
                setDepartments(
                    Array.isArray(departmentsData) ? departmentsData : []
                );
            } catch(err) {
                setError(err.message || "Failed to load subjects.");
            } finally {
                setLoading(false);
            }
        }

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
        setEditingSubject(null);
        setForm(initialForm);
        setShowForm(true);
        setError("");
    }

    function openEditForm(subject) {
        setEditingSubject(subject);

        setForm({
            subjectName: subject.name || "",
            departmentId: subject.department?.id
                ? String(subject.department.id)
                : subject.departmentId
                    ? String(subject.departmentId)
                    : "",
        });

        setShowForm(true);
        setError("");
    }

    function closeForm() {
        setShowForm(false);
        setEditingSubject(null);
        setForm(initialForm);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            setSaving(true);
            setError("");

            const subjectData = {
                subjectName: form.subjectName,
                departmentId: Number(form.departmentId),
            };

            if (editingSubject) {
                setError(
                    "Subject editing is temporarily disabled until the backend update endpoint is confirmed."
                );

                return;

            } 
            const createdSubject = await createSubject(subjectData);
            setSubjects((current) => [...current, createdSubject]);

            closeForm();
        } catch (err) {
                setError(err.message || "Failed to save subect.");
        } finally {
                setSaving(false);
        }
    }


    async function handleDelete(subject) {
        const confirmed = window.confirm(
            `Are you sure want to delete this subject?`
        );

        if (!confirmed) return;

        try {
            setDeletingId(subject.id);
            setError("");

            await deleteSubject(id);
            
            setSubjects((current) => 
                current.filter((subject) => subject.id !== id)
            )
        } catch(err) {
            setError(err.message || "Failed to delete subject.");
        } finally {
            setDeletingId(null);
        }
    }

    const filteredSubjects = subjects.filter((subject) => {
        const search = searchTerm.toLowerCase().trim();

        const subjectName = subject.subjectName?.toLowerCase() || "";

        const departmentName = 
            subject.department?.name?.toLowerCase() ||
            subject.department?.toLowerCase() ||
            "";

        return (
            subjectName.includes(search) ||
            departmentName.includes(search)
        );    
    });

    if (loading) {
        return <LoadingState />
    }

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Subjects
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Manage academic subject in the school.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={openCreateForm}
                    className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
                >
                    + Add Subject
                </button>
            </div>

            {error && (
                <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4">
                    <p className="text-sm text-red-700">{error}</p>
                </div>
            )}

            
            <div className="mt-6 rounded-xl border bg-white p-4 shadow-sm">
                <label 
                    htmlFor="subject-search"
                    className="text-sm font-medium text-gray-700"
                >
                    Search Subjects
                </label>

                <input 
                    type="text"
                    value={searchTerm}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search subjects..."
                    className="w-full rounded-lg border bg-white px-4 py-2.5 outline-none focus:ring-2 focus:ring-gray-200"
                />
            </div>

            {showForm && (
                <div className="mt-6">
                    <SubjectForm
                        form={form}
                        editingSubject={editingSubject}
                        departments={departments}
                        saving={saving}
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                        onClose={closeForm}
                    />
                </div>
            )}

            <div className="mt-6 rounded-xl border bg-white shadow:sm">
                <SubjectTable
                    subjects={filteredSubjects}
                    onEdit={openEditForm}
                    onDelete={handleDelete}
                    deletingId={deletingId} 
                />
            </div>
        </div>
    );
}