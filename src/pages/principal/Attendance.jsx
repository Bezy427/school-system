import { useState, useEffect } from "react";
import { getAttendances, createAttendance, getStudents, getSubjects } from "../../services/api";
import AttendanceForm from "../../components/attendances/AttendanceForm";
import AttendanceTable from "../../components/attendances/AttendanceTable";
import LoadingState from "../../components/dashboard/LoadingState";

const initialForm = {
    studentId: "",
    subjectId: "",
    date: "",
    status: "",
};

export default function Exams() {
    const [attendance, setAttendance] = useState([]);
    const [subjects, setSubjects] = useState([]);
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

                const [attendancesData, studentsData, subjectsData] = await Promise.all([
                    getAttendances(),
                    getSubjects(),
                    getStudents(),
                ]);

                setAttendance(Array.isArray(attendancesData) ? attendancesData : []);
                setStudents(
                    Array.isArray(studentsData) ? studentsData : []
                );
                setStudents(
                    Array.isArray(subjectsData) ? subjectsData : []
                );
            } catch (err) {
                setError(err.message || "Failed to load attendance.");
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
        setForm(initialForm);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            setSaving(true);
            setError("");

            const examData = {
                studentId: Number(form.studentId),
                subjectId: Number(form.subjectId),
                date: form.date,
                status: form.status,
            };

            const createdAttendance = await createdAttendance(attendancesData);

            setAttendance((current) => [...current, createdAttendance]);

            closeForm();
        } catch (err) {
            setError(err.message || "Failed to record attendance.");
        } finally {
            setSaving(false);
        }
    }

    const filteredAttendance = attendance.filter((record) => {
        const search = searchTerm.toLowerCase();

        const studentName = 
            record.subject?.subjectName?.toLowerCase() ||
            record.subjectName?.toLowerCase() || 
            "";

        const date = 
            record.date?.toLowerCase() || "";
        
        const status = 
            record.status?.toLowerCase() || "";
            
        return (
            studentName.includes(search) || 
            subjectName.includes(search) ||
            date.includes(search) ||
            status.includes(search)
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
                        Attendance
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Record and monitor student attendance.
                    </p>
                </div>

                <button
                    onClick={openCreateForm}
                    className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                >
                    Record Attendance
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
                    placeholder="Search attendance..."
                    className="w-full rounded-lg border bg-white px-4 py-2.5 outline-none focus:ring-2 focus:ring-gray-200"
                />
            </div>

            {showForm && (
                <div className="mt-6">
                    <AttendanceForm 
                        form={form}
                        students={students}
                        subjects={subjects}
                        saving={saving}
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                        onClose={closeForm}
                    />
                </div>
            )}

            <div className="mt-6 rounded-xl border bg-white shadow-sm">
                <AttendanceTable 
                    attendance={filteredAttendance}
                />
            </div>
        </div>
    );
}