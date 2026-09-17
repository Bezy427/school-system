import { useState, useEffect } from "react";
import { getExams, createExam, getStudents, } from "../../services/api";
import ExamForm from "../../components/exams/ExamForm";
import ExamTable from "../../components/exams/ExamTable";
import LoadingState from "../../components/dashboard/LoadingState";

const initialForm = {
    studentId: "",
    examDate: "",
    decision: "Pending",
    startTime: "",
    endTime: "",
    postPone: "No",
};

export default function Exams() {
    const [exams, setExams] = useState([]);
    const [students, setStudents] = useState([]);

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

                const [examsData, studentsData] = await Promise.all([
                    getExams(),
                    getStudents(),
                ]);

                setExams(Array.isArray(examsData) ? examsData : []);
                setStudents(
                    Array.isArray(studentsData) ? studentsData : []
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
        setSelectedExam(null);
        setForm(initialForm);
        setShowForm(true);
        setError("");
    }

    function closeForm() {
        setShowForm(false);
        setSelectedExam(null);
        setForm(initialForm);
    }

    function handleView(exam) {
        setSelectedExam(exam);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            setSaving(true);
            setError("");

            const examData = {
                studentId: Number(form.studentId),
                examDate: form.examDate,
                decision: form.decision,
                startTime: form.startTime,
                endTime: form.endTime,
                postPone: form.postPone,
            };

            const createdExam = await createdExam(examData);

            setExams((current) => [...current, createdExam]);

            closeForm();
        } catch (err) {
            setError(err.message || "Failed to create exam.");
        } finally {
            setSaving(false);
        }
    }

    const filteredExams = exams.filter((exam) => {
        const search = searchTerm.toLowerCase();

        const examName = 
            exam.name?.toLowerCase() ||
            exam.examName?.toLowerCase() || 
            "";
        const subjectName = 
            exam.subject?.subjectName?.toLowerCase() ||
            exam.subject?.name?.toLowerCase() ||
            exam.subjectName?.toLowerCase() ||
            "";
            
        return (
            examName.includes(search) || 
            subjectName.includes(search)
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
                        Exams
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Manage School examinations.
                    </p>
                </div>

                <button
                    onClick={openCreateForm}
                    className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                >
                    Create Form
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
                    placeholder="Search exams..."
                    className="w-full rounded-lg border bg-white px-4 py-2.5 outline-none focus:ring-2 focus:ring-gray-200"
                />
            </div>

            {showForm && (
                <div className="mt-6">
                    <ExamForm 
                        form={form}
                        students={students}
                        saving={saving}
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                        onClose={closeForm}
                    />
                </div>
            )}

            <div className="mt-6 rounded-xl border bg-white shadow-sm">
                <ExamTable 
                    exams={filteredExams}
                    onView={handleView}
                />
            </div>

            {selectedExam && (
                <div className="mt-6 rounded-xl border bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg items-center justify-between">
                            Exam Details
                        </h2>

                        <button
                            onClick={() => setSelectedExam(null)}
                            className="text-sm text-gray-500 hover:text-gray-900"
                        >
                            Close
                        </button>
                    </div>

                    <pre className="mt-4 overflow-x-auto rounded-lg bg-gray-50 p-4 text-xs">
                        {JSON.stringify(selectedExam, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
}