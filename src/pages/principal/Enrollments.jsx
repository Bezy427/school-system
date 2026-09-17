import { useState, useEffect } from "react";
import { getEnrollments, createEnrollment, getStudents, getSubjects } from "../../services/api";
import EnrollmentForm from "../../components/enrollments/EnrollmentForm";
import EnrollmentTable from "../../components/enrollments/EnrollmentTable";
import LoadingState from "../../components/dashboard/LoadingState";

const initialForm = {
    studentId: "",
    subjectId: "",
    academicYear: "",
    form: "",
};

export default function Exams() {
    const [enrollments, setEnrollments] = useState([]);
    const [students, setStudents] = useState([]);
    const [subjects, setSubjects] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");

    const [showForm, setShowForm] = useState(false);
    const [selectedExam, setSelectedExam] = useState(null);

    const [form, setForm] = useState(true);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");

    useEffect(() => {
        async function loadData() {
            try {
                setLoading(true);
                setError("");

                const [enrollmentsData, studentsData, subjectsData] = await Promise.all([
                    getEnrollments(),
                    getStudents(),
                    getSubjects(),
                ]);

                setEnrollments(Array.isArray(enrollmentsData) ? enrollmentsData : []);
                setStudents(
                    Array.isArray(studentsData) ? studentsData : []
                );
                
                setSubjects(
                    Array.isArray(subjectsData) ? subjectsData : []
                );
            } catch (err) {
                setError(err.message || "Failed to load exams.");
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, []);

    function handleChange(event) {
        const { name, value } = event.target;

        setForm((current) => ({
            ...current,
            [name]: value,
        }));
    }

    function openCreateForm() {
        setForm(initialForm);
        setShowForm(true);
        setError("");
    }

    function closeForm() {
        setShowForm(false);
        setSelectedExam(null);
        setForm(initialForm);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            setSaving(true);
            setError("");

            const enrollmentData = {
                studentId: Number(form.studentId),
                subjectId: Number(form.subjectId),
                academicYear: form.academicYear,
                form: form.form,
            };

            const createdEnrollment = await createdEnrollment(enrollmentData);

            setEnrollments((current) => [...current, createdExam]);

            closeForm();
        } catch (err) {
            setError(err.message || "Failed to create exam.");
        } finally {
            setSaving(false);
        }
    }

    const filteredEnrollments = enrollments.filter((enrollment) => {
        const search = searchTerm.toLowerCase();

        const studentName = 
            enrollment.student?.firstName && 
            enrollment.student?.lastName
                ? `${enrollment.student.firstName} ${enrollment.student.lastName}`.toLowerCase()
                : enrollment.studentName?.toLowerCase() ||  
            "";

        const subjectName = 
            enrollment.subject?.subjectName?.toLowerCase() ||
            enrollment.subjectName?.toLowerCase() ||
            "";
            
        const academicYear = 
            enrollment.academicYear?.toLowerCase() ||
            "";
            
        const formName = 
            enrollment.form?.toLowerCase() ||
            "";
            
        return (
            studentName.includes(search) || 
            subjectName.includes(search) ||
            academicYear.includes(search) ||
            formName.includes(search) 
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
                        Enrollments
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Manage Student subject enrollments.
                    </p>
                </div>

                <button
                    onClick={openCreateForm}
                    className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                >
                    Create Enrollment
                </button>
            </div>

            {error && (
                <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4">
                    <p className="text-sm text-red-700">{error}</p>
                </div>
            )}

            <div className="mt-6">
                <input 
                    type="text"
                    value={searchTerm}
                    onChange={() => setSearchTerm(event.target.value)}
                    placeholder="Search enrollments..."
                    className="w-full rounded-lg border bg-white px-4 py-2.5 outline-none focus:ring-2 focus:ring-gray-200"
                />
            </div>

            {showForm && (
                <div className="mt-6">
                    <EnrollmentForm 
                        form={form}
                        student={students}
                        subjects={subjects}
                        saving={saving}
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                        onClose={closeForm}
                    />
                </div>
            )}

            <div className="mt-6 rounded-xl border bg-white shadow-sm">
                <EnrollmentTable 
                    enrollments={filteredEnrollments}
                />
            </div>
        </div>
    );
}