
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    ArrowLeft,
    UserRound,
    Mail,
    GraduationCap,
    CalendarDays,
    Users,
    Phone,
    Hash,
    LoaderCircle,
    AlertCircle,
} from "lucide-react";
import { getMyStudentProfile } from "../../services/studentService";

export default function StudentProfile() {
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadProfile() {
            try {
                const data = await getMyStudentProfile();
                setStudent(data);
            } catch (err) {
                setError(err.message || "Unable to load your profile.");
            } finally {
                setLoading(false);
            }
        }

        loadProfile();
    }, []);

    const fullName = student
        ? `${student.firstName || ""} ${student.lastName || ""}`.trim()
        : "";

    const initial = student?.firstName?.charAt(0)?.toUpperCase() || "S";

    const profileDetails = student
        ? [
            {
                label: "First Name",
                value: student.firstName,
                icon: UserRound,
            },
            {
                label: "Last Name",
                value: student.lastName,
                icon: UserRound,
            },
            {
                label: "Registration Number",
                value: student.registrationNumber,
                icon: Hash,
            },
            {
                label: "Grade",
                value: student.grade ? `Grade ${student.grade}` : null,
                icon: GraduationCap,
            },
            {
                label: "Email Address",
                value: student.email,
                icon: Mail,
            },
            {
                label: "Date of Birth",
                value: student.dateOfBirth,
                icon: CalendarDays,
            },
            {
                label: "Gender",
                value: student.gender,
                icon: Users,
            },
            {
                label: "Parent/Guardian Contact",
                value: student.parentContact,
                icon: Phone,
            },
        ]
        : [];

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-[#790d29] text-white shadow-md">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
                    <div>
                        <p className="text-sm font-medium text-yellow-300">
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

            <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Page heading */}
                <div className="mb-7">
                    <h2 className="text-2xl font-bold text-gray-900">
                        My Profile
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        View your personal and academic information.
                    </p>
                </div>

                {loading && (
                    <div className="flex min-h-64 flex-col items-center justify-center rounded-xl bg-white shadow-sm">
                        <LoaderCircle className="animate-spin text-[#790d29]" size={36} />
                        <p className="mt-3 text-sm text-gray-500">
                            Loading your profile...
                        </p>
                    </div>
                )}

                {!loading && error && (
                    <div className="rounded-xl border border-red-200 bg-white p-6 shadow-sm">
                        <div className="flex items-center gap-3 text-red-600">
                            <AlertCircle size={22} />
                            <h3 className="font-semibold">Unable to load profile</h3>
                        </div>
                        <p className="mt-3 text-sm text-gray-600">{error}</p>
                        <Link
                            to="/students"
                            className="mt-5 inline-flex rounded-lg bg-[#790d29] px-4 py-2 text-sm font-semibold text-white hover:bg-[#650d27]"
                        >
                            Return to dashboard
                        </Link>
                    </div>
                )}

                {!loading && !error && student && (
                    <>
                        {/* Profile summary */}
                        <section className="mb-6 overflow-hidden rounded-xl bg-white shadow-sm">
                            <div className="h-28 bg-gradient-to-r from-[#650d27] to-[#9b2445]" />

                            <div className="px-6 pb-6">
                                <div className="-mt-12 flex flex-col items-center gap-4 sm:flex-row sm:items-end">
                                    <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-yellow-400 text-3xl font-bold text-[#650d27] shadow-md">
                                        {initial}
                                    </div>

                                    <div className="pb-1 text-center sm:text-left">
                                        <h3 className="text-2xl font-bold text-gray-900">
                                            {fullName || "Student"}
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">
                                            {student.registrationNumber || "No registration number"}
                                        </p>
                                    </div>

                                    <div className="sm:ml-auto sm:pb-2">
                                        <span className="rounded-full bg-green-100 px-4 py-2 text-xs font-semibold text-green-700">
                                            Student Account
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Personal information */}
                        <section className="rounded-xl bg-white p-6 shadow-sm">
                            <div className="mb-6 border-b border-gray-100 pb-4">
                                <h3 className="text-lg font-bold text-gray-900">
                                    Personal Information
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    Your registered student details.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                {profileDetails.map((detail) => {
                                    const Icon = detail.icon;

                                    return (
                                        <div
                                            key={detail.label}
                                            className="flex items-start gap-3"
                                        >
                                            <div className="rounded-lg bg-[#790d29]/10 p-3 text-[#790d29]">
                                                <Icon size={19} />
                                            </div>

                                            <div className="min-w-0">
                                                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                                    {detail.label}
                                                </p>
                                                <p className="mt-1 break-words text-sm font-semibold text-gray-800">
                                                    {detail.value || "Not provided"}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>

                        <div className="mt-6 rounded-xl border border-yellow-200 bg-yellow-50 p-4">
                            <p className="text-sm text-yellow-900">
                                <strong>Need to update your details?</strong>{" "}
                                Please contact the school administration for assistance.
                            </p>
                        </div>
                    </>
                )}
            </main>

            <footer className="mt-10 border-t border-gray-200 bg-white py-5 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} Dombotombo Government Primary School.
                All rights reserved.
            </footer>
        </div>
    );
}
