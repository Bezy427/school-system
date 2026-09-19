import { useState, useEffect } from "react";
import { getAttendances, createAttendance, getStudents, getSubjects } from "../../services/api";
import TeacherAttendanceForm from "../../components/teachers/TeacherAttendanceForm";
import TeacherAttendanceTable from "../../components/teachers/TeacherAttendanceTable";
import LoadingState from "../../components/dashboard/LoadingState";
import SectionCard from "../../components/dashboard/SectionCard";

const initialForm = {
    studentId: "",
    subjectId: "",
    date: "",
    status: "Present",
};

export default function Attendances() {
    const [attendance, setAttendance] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [students, setStudents] = useState([]);

    const [search, setSearch] = useState("");

    const [showForm, setShowForm] = useState(false);

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

    function openForm() {
        setForm(initialForm);
        setShowForm(true);
        setError("");
    }

    function closeForm() {
        if (saving) return 

        setShowForm(false);
        setForm(initialForm);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setSaving(true);
        setError("");
        try {

            const attendancesData = {
                studentId: Number(form.studentId),
                subjectId: Number(form.subjectId),
                date: form.date,
                status: form.status,
            };

            const createdAttendance = await createdAttendance(attendancesData);

            if (createdAttendance) {
                setAttendance((current) => [
                    ...current,
                    createdAttendance,
                ]);
            } else {
                const refreshedAttendance = await getAttendances();
                setAttendance((current) => [...current, createdAttendance]
                );
            }
            
            setForm(initialForm)
            setShowForm(false);
        } catch (err) {
            setError(err.message || "Failed to mark attendance.");
        } finally {
            setSaving(false);
        }
    }

    function getStudentName(record) {
        if (record.student) {
            return `${record.student.firstName || ""} ${
                record.student.lastName || ""
            }`.trim();
        }

        return record.studentName || "";
    }
    
    function getSubjectName(record) {
        if (record.student) {
            return (
                record.subject.subjectName || record.subject.name ||
                ""
            );
        }

        return record.subjectName || "";
    }

    const filteredAttendance = attendance.filter((record) => {
        const query = search.trim().toLowerCase();

        if(!query) return attendance;

        return attendance.filter((record) => {
            const studentName = 
                getStudentName(record);

            const subjectName =
                getSubjectName(record);    
            
            return [
                studentName, 
                subjectName,
                record.studentId,
                record.subjectId,
                record.date,
                record.status
            ]    
                .filter(Boolean)
                .some((value) => 
                    String(value)
                        .toLowerCase()
                        .includes(query)
                );
        }, [attendance, search]);
            
    });

    return (
        <div className="space-y-6 p-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Attendance
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Record and review student attendance.
                    </p>
                </div>

                {!showForm && (
                    <button
                        type="button"
                        onClick={openForm}
                        className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                    >
                        Mark Attendance
                    </button>
                )}
            </div>

            {error && (
                <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4">
                    <p className="text-sm text-red-700">{error}</p>
                </div>
            )}

            {showForm && (
                <TeacherAttendanceForm 
                    form={form}
                    students={students}
                    subjects={subjects}
                    saving={saving}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    onClose={closeForm}
                />
            )}

            {!showForm && (
                <SectionCard title="Attendance Records">
                    <div className="mb-5">
                        <input 
                            type="text"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)
                            }
                            placeholder="Search attendance..."
                            className="w-full rounded-lg border px-3 py-2 outline-none focus:border-gray-900"
                        />
                    </div>

                    {loading ? (
                        <LoadingState message="Loading attendance..." />
                    ) : (
                        <TeacherAttendanceTable 
                            attendance={filteredAttendance}
                        />
                    )}
                </SectionCard>
            )}
        </div>
    );
}