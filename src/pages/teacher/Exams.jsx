import { useState, useEffect, useMemo } from "react";
import { getExams, createExam, getStudents, } from "../../services/api";
import LoadingState from "../../components/dashboard/LoadingState";
import SectionCard from "../../components/dashboard/SectionCard";
import TeacherExamTable from "../../components/teachers/TeacherExamTable";
import TeacherExamForm from "../../components/teachers/TeacherExamForm";

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

    const [search, setSearchTerm] = useState("");

    const [showForm, setShowForm] = useState(false);
    const [selectedExam, setSelectedExam] = useState(null);

    const [form, setForm] = useState(initialForm);

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

    function openForm() {
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

            if (createdExam) {
                setExams((current) => [...current, createdExam]);
            } else {
                const refreshedExams = await getExams();

                setExams((current) => [...current, createdExam]);
            }


            setForm(initialForm);
            setShowForm(false);
        } catch (err) {
            setError(err.message || "Failed to create exam.");
        } finally {
            setSaving(false);
        }
    }

    const filteredExams = useMemo(() => {
        const query = search.trim().toLowerCase();

        if (!query) return exams;

        return exams.filter((exam) => {
            const studentName = exam.student
                ? `${exam.student.firstName || ""} ${
                    exam.student.lastName || ""
                    }`
                : exam.studentName || "";

        return [
            studentName,
            exam.studentId,
            exam.examDate,
            exam.decision,
            exam.startTime,
            exam.endTime,
            exam.postPone,
        ]    
            .filter(Boolean)
            .some((value) => 
                String(value).toLowerCase().includes(query)
            );
    
        });

    }, [exams, search]);

    return (
        <div className="space-y-6 p-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Exams
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        View and schedule student exams.
                    </p>
                </div>

                {!showForm && (
                    <button
                        type="button"
                        onClick={openForm}
                        className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray800"
                    >
                        Schedule Exam
                    </button>
                )}
            </div>

            {error && (
                <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4">
                    <p className="text-sm text-red-700">{error}</p>
                </div>
            )}

            {showForm && (
                <TeacherExamForm 
                    form={form}
                    students={students}
                    saving={saving}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    onCancel={closeForm}
                />
            )}

            {!showForm && (
                <SectionCard title="Exam Records">
                    <div className="mb-5">
                        <input 
                            type="text"
                            value={search}
                            onChange={(event) => setSearchTerm(event.target.value)}
                            placeholder="Search exams..."
                            className="w-full rounded-lg border px-3 py-2 outline-none focus:border-gray-900"
                        />
                    </div>

                    {loading ? (
                        <LoadingState message="Loading exams..." />
                    ) : (
                        <TeacherExamTable 
                            exams={filteredExams}
                            onView={handleView}
                        />
                    )}
                </SectionCard>
            )}
        </div>
    );
}