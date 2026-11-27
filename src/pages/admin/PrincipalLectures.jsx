
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    ArrowLeft,
    BookOpen,
    Plus,
    Clock,
    MapPin,
    UserRound,
    LoaderCircle,
    AlertCircle,
    X,
    RefreshCw,
} from "lucide-react";

import {
    getPrincipalLectures,
    createLecture,
} from "../../services/lectureService";

export default function PrincipalLectures() {
    const [lectures, setLectures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showForm, setShowForm] = useState(false);

    const [formData, setFormData] = useState({
        subjectName: "",
        teacherId: "",
        startTime: "",
        endTime: "",
        location: "",
    });

    async function loadLectures() {
        try {
            setLoading(true);
            setError("");

            const data = await getPrincipalLectures();
            setLectures(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(err.message || "Unable to load lectures.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadLectures();
    }, []);

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setSubmitting(true);
            setError("");
            setSuccess("");

            await createLecture({
                subjectName: formData.subjectName.trim(),
                teacherId: Number(formData.teacherId),
                startTime: formData.startTime,
                endTime: formData.endTime,
                location: formData.location.trim(),
            });

            setSuccess("Lecture scheduled successfully!");

            setFormData({
                subjectName: "",
                teacherId: "",
                startTime: "",
                endTime: "",
                location: "",
            });

            setShowForm(false);
            await loadLectures();
        } catch (err) {
            setError(err.message || "Failed to schedule lecture.");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 p-5 md:p-8">

            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                    <div>
                        <Link
                            to="/admin"
                            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#790d29]"
                        >
                            <ArrowLeft size={17} />
                            Back to Dashboard
                        </Link>

                        <h1 className="text-2xl font-extrabold text-[#650d27] md:text-3xl">
                            Lecture Management
                        </h1>

                        <p className="mt-2 text-sm text-gray-500">
                            Schedule and manage school lessons.
                        </p>
                    </div>

                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="flex items-center justify-center gap-2 rounded-xl bg-[#790d29] px-5 py-3 text-sm font-bold text-white hover:bg-[#57091d]"
                    >
                        {showForm ? <X size={18} /> : <Plus size={18} />}
                        {showForm ? "Close Form" : "Schedule Lecture"}
                    </button>
                </div>

                {/* Feedback */}
                {success && (
                    <div className="mb-5 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
                        {success}
                    </div>
                )}

                {error && (
                    <div className="mb-5 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                        <AlertCircle size={19} />
                        {error}
                    </div>
                )}

                {/* Create lecture form */}
                {showForm && (
                    <div className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

                        <h2 className="mb-6 text-lg font-extrabold text-gray-800">
                            Schedule a New Lecture
                        </h2>

                        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 md:grid-cols-2">

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Subject Name
                                </label>

                                <input
                                    type="text"
                                    name="subjectName"
                                    value={formData.subjectName}
                                    onChange={handleChange}
                                    placeholder="e.g. Mathematics"
                                    required
                                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#790d29]"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Teacher ID
                                </label>

                                <input
                                    type="number"
                                    name="teacherId"
                                    value={formData.teacherId}
                                    onChange={handleChange}
                                    placeholder="Enter existing teacher ID"
                                    min="1"
                                    required
                                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#790d29]"
                                />

                                <p className="mt-1 text-xs text-gray-400">
                                    Use the ID of an existing teacher.
                                </p>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Start Time
                                </label>

                                <input
                                    type="time"
                                    name="startTime"
                                    value={formData.startTime}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#790d29]"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    End Time
                                </label>

                                <input
                                    type="time"
                                    name="endTime"
                                    value={formData.endTime}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#790d29]"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Classroom / Location
                                </label>

                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="e.g. Room 3"
                                    required
                                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#790d29]"
                                />
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row md:col-span-2">
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="flex items-center justify-center gap-2 rounded-xl bg-[#790d29] px-6 py-3 text-sm font-bold text-white hover:bg-[#57091d] disabled:opacity-60"
                                >
                                    {submitting && (
                                        <LoaderCircle size={18} className="animate-spin" />
                                    )}
                                    {submitting ? "Scheduling..." : "Schedule Lecture"}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="rounded-xl border border-gray-200 px-6 py-3 text-sm font-bold text-gray-600 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Lecture list */}
                <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm md:p-6">

                    <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                        <div>
                            <h2 className="text-lg font-extrabold text-gray-800">
                                Scheduled Lectures
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                {lectures.length} lecture(s) scheduled
                            </p>
                        </div>

                        <button
                            onClick={loadLectures}
                            disabled={loading}
                            className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50"
                        >
                            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
                            Refresh
                        </button>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-16">
                            <LoaderCircle size={32} className="animate-spin text-[#790d29]" />
                        </div>
                    ) : lectures.length === 0 ? (
                        <div className="py-16 text-center">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#790d29]/10 text-[#790d29]">
                                <BookOpen size={30} />
                            </div>

                            <h3 className="font-bold text-gray-800">
                                No lectures scheduled
                            </h3>

                            <p className="mt-2 text-sm text-gray-500">
                                Schedule the first lecture for your school.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                            {lectures.map((lecture) => (
                                <div
                                    key={lecture.id}
                                    className="rounded-xl border border-gray-100 p-5 transition hover:border-[#790d29]/30 hover:shadow-sm"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex items-center gap-3">
                                            <div className="rounded-xl bg-[#790d29]/10 p-3 text-[#790d29]">
                                                <BookOpen size={22} />
                                            </div>

                                            <div>
                                                <h3 className="font-bold text-gray-800">
                                                    {lecture.subjectName}
                                                </h3>

                                                <p className="mt-1 text-xs text-gray-400">
                                                    Lecture #{lecture.id}
                                                </p>
                                            </div>
                                        </div>

                                        <span className="rounded-lg bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                                            Scheduled
                                        </span>
                                    </div>

                                    <div className="mt-5 space-y-3 text-sm text-gray-600">
                                        <p className="flex items-center gap-3">
                                            <UserRound size={17} className="text-[#790d29]" />
                                            {lecture.teacherName || "Teacher not specified"}
                                        </p>

                                        <p className="flex items-center gap-3">
                                            <Clock size={17} className="text-[#790d29]" />
                                            {lecture.startTime} – {lecture.endTime}
                                        </p>

                                        <p className="flex items-center gap-3">
                                            <MapPin size={17} className="text-[#790d29]" />
                                            {lecture.location}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <footer className="mt-8 border-t border-gray-200 pt-5 text-center text-xs text-gray-400">
                    © {new Date().getFullYear()} Dombotombo Government Primary School.
                    All rights reserved.
                </footer>
            </div>
        </div>
    );
}
