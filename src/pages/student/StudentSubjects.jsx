
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    ArrowLeft,
    BookOpen,
    Clock,
    MapPin,
    UserRound,
    GraduationCap,
    LoaderCircle,
    AlertCircle,
    BookMarked,
} from "lucide-react";

import { getStudentLectures } from "../../services/lectureService";

export default function StudentSubjects() {
    const [lectures, setLectures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadLectures() {
            try {
                const data = await getStudentLectures();
                setLectures(Array.isArray(data) ? data : []);
            } catch (err) {
                setError(err.message || "Unable to load subjects.");
            } finally {
                setLoading(false);
            }
        }

        loadLectures();
    }, []);

    const formatTime = (time) => {
        if (!time) return "Not scheduled";

        const [hours, minutes] = time.split(":");
        const date = new Date();
        date.setHours(Number(hours), Number(minutes), 0);

        return date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const formatLessonTime = (lecture) => {
        return `${formatTime(lecture.startTime)} - ${formatTime(lecture.endTime)}`;
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-[#790d29] text-white shadow-md">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
                    <div>
                        <p className="text-xs font-semibold tracking-wider text-yellow-300">
                            DOMBOTOMBO GOVERNMENT PRIMARY SCHOOL
                        </p>
                        <h1 className="mt-1 text-xl font-bold sm:text-2xl">
                            Student Portal
                        </h1>
                    </div>

                    <Link
                        to="/students"
                        className="flex items-center gap-2 rounded-lg border border-white/30 px-3 py-2 text-sm font-medium transition hover:bg-white/10"
                    >
                        <ArrowLeft size={17} />
                        <span className="hidden sm:inline">Dashboard</span>
                    </Link>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Page heading */}
                <div className="mb-8">
                    <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-[#790d29]/10 p-3 text-[#790d29]">
                            <BookOpen size={27} />
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                My Subjects
                            </h2>
                            <p className="text-sm text-gray-500">
                                View your subjects and scheduled lessons.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Summary */}
                {!loading && !error && (
                    <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="rounded-xl bg-white p-5 shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg bg-[#790d29]/10 p-3 text-[#790d29]">
                                    <BookMarked size={22} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Scheduled Lessons
                                    </p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {lectures.length}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl bg-white p-5 shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg bg-yellow-100 p-3 text-yellow-700">
                                    <GraduationCap size={22} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">
                                        School
                                    </p>
                                    <p className="text-lg font-bold text-gray-900">
                                        Dombotombo Primary
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Loading */}
                {loading && (
                    <div className="flex min-h-64 flex-col items-center justify-center rounded-xl bg-white shadow-sm">
                        <LoaderCircle
                            size={36}
                            className="animate-spin text-[#790d29]"
                        />
                        <p className="mt-3 text-sm text-gray-500">
                            Loading your subjects...
                        </p>
                    </div>
                )}

                {/* Error */}
                {!loading && error && (
                    <div className="rounded-xl border border-red-200 bg-white p-6 shadow-sm">
                        <div className="flex items-center gap-3 text-red-600">
                            <AlertCircle size={22} />
                            <h3 className="font-semibold">
                                Unable to load subjects
                            </h3>
                        </div>

                        <p className="mt-3 text-sm text-gray-600">
                            {error}
                        </p>

                        <button
                            onClick={() => window.location.reload()}
                            className="mt-5 rounded-lg bg-[#790d29] px-4 py-2 text-sm font-semibold text-white hover:bg-[#650d27]"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {/* Empty state */}
                {!loading && !error && lectures.length === 0 && (
                    <div className="rounded-xl bg-white px-6 py-16 text-center shadow-sm">
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#790d29]/10 text-[#790d29]">
                            <BookOpen size={36} />
                        </div>

                        <h3 className="mt-5 text-xl font-bold text-gray-900">
                            No Subjects Available Yet
                        </h3>

                        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                            Your scheduled lessons will appear here once the
                            school administration has added them to the system.
                        </p>

                        <Link
                            to="/students"
                            className="mt-6 inline-flex rounded-lg bg-[#790d29] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#650d27]"
                        >
                            Return to Dashboard
                        </Link>
                    </div>
                )}

                {/* Lecture cards */}
                {!loading && !error && lectures.length > 0 && (
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {lectures.map((lecture) => (
                            <div
                                key={lecture.id}
                                className="overflow-hidden rounded-xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                            >
                                <div className="h-2 bg-[#790d29]" />

                                <div className="p-6">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="rounded-xl bg-[#790d29]/10 p-3 text-[#790d29]">
                                            <BookOpen size={24} />
                                        </div>

                                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                                            Scheduled
                                        </span>
                                    </div>

                                    <h3 className="mt-5 text-xl font-bold text-gray-900">
                                        {lecture.subjectName || "Unnamed Subject"}
                                    </h3>

                                    <div className="mt-5 space-y-4">
                                        <div className="flex items-center gap-3 text-sm text-gray-600">
                                            <UserRound
                                                size={18}
                                                className="text-[#790d29]"
                                            />
                                            <span>
                                                {lecture.teacherName || "Teacher not assigned"}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-3 text-sm text-gray-600">
                                            <Clock
                                                size={18}
                                                className="text-[#790d29]"
                                            />
                                            <span>
                                                {formatLessonTime(lecture)}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-3 text-sm text-gray-600">
                                            <MapPin
                                                size={18}
                                                className="text-[#790d29]"
                                            />
                                            <span>
                                                {lecture.location || "Location not assigned"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            <footer className="mt-10 border-t border-gray-200 bg-white py-5 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} Dombotombo Government Primary School.
                All rights reserved.
            </footer>
        </div>
    );
}
