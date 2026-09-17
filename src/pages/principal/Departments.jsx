import { useEffect, useState } from "react";
import { createDepartment, getDepartments, updateDepartment, deleteDepartment } from "../../services/api";
import DepartmentTable from "../../components/departments/DepartmentTable";
import DepartmentForm from "../../components/departments/DepartmentForm";

const emptyForm = {
    name: "",
};

export default function Departments() {
    const [departments, setDepartments] = useState([]);
    const [form, setForm] = useState(emptyForm);

    const [search, setSearch] = useState("");

    const [editingDepartment, setEditingDepartment] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    async function loadDepartments() {
        try {
            setLoading(true);
            setError("");

            const data = await getDepartments();

            setDepartments(data || []);
        } catch (err) {
            setError(err.message || "Failed to load departments.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadDepartments();
    }, []);

    function handleChange(event) {
        const { name, value } = event.target;

        setForm((currentForm) => ({
            ...currentForm,
            [name]: value,
        }));
    }

    function openCreateForm() {
        setEditingDepartment(null);
        setForm(emptyForm);
        setError("");
        setSuccess("");
        setShowForm(true);
    }

    function openEditForm(department) {
        setEditingTeacher(department);

        setForm({
            name: department.name || "",
        });

        setError("");
        setSuccess("");
        setShowForm(true);
    }

    function closeForm() {
        if (saving) return;

        setShowForm(false);
        setEditingDepartment(null);
        setForm(emptyForm);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            setSaving(true);
            setError("");
            setSuccess("");

            if (editingDepartment) {
                await updateDepartment(
                    editingDepartment.id,
                    form
                );

                setSuccess("Teacher updated successfully.");
            } else {
                await createDepartment(form);
                setSuccess("Teacher has successfully been created!")
            }

            await loadDepartments();

            setShowForm(false);
            setEditingDepartment(null);
            setForm(emptyForm);
        } catch (err) {
            setError(err.message || "Failed to save department.");
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete(department) {
        const confirmed = window.confirm(
            `Are you sure want to delete ${department.name}?`
        );

        if (!confirmed) return;

        try {
            setDeletingId(department.id);
            setError("");
            setSuccess("");

            await deleteDepartment(department.id);

            setSuccess("Department deleted successfully.");

            await loadDepartments();
        } catch(err) {
            setError(err.message || "Failed to delete department.");
        } finally {
            setDeletingId(null);
        }
    }

    const filteredDepartments = departments.filter((department) => {
        const searchTerm = search.toLowerCase().trim();

        if (!searchTerm) return true;

        return searchableText.includes(searchTerm);    
    });

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Departments
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Manage academic departments in the school.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={openCreateForm}
                    className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
                >
                    + Add Department
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
                    Search Departments
                </label>

                <input 
                    id="department-search"
                    type="text"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search departments..."
                    className="w-full rounded-lg border bg-white px-4 py-2.5 outline-none focus:ring-2 focus:ring-gray-200"
                />
            </div>

            <div className="mt-6 overflow-hiddden rounded-xl border bg-white shadow-sm">
                {loading ? (
                    <div className="p-8 text-center">
                        <p className="text-sm text-gray-500">
                            Loading departments...
                        </p>
                    </div>
                ) : (
                    <DepartmentTable
                        departments={filteredDepartments}
                        onEdit={openEditForm}
                        onDelete={handleDelete}
                        deletingId={deletingId}
                    />
                )}
            </div>

            {showForm && (
                <DepartmentForm
                    form={form}
                    departments={departments}
                    editingDepartment={editingDepartment}
                    saving={saving}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    onClose={closeForm}
                />
            )}
        </div>
    );
}