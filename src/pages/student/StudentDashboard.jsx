
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    GraduationCap,
    LayoutDashboard,
    UserRound,
    BookOpen,
    ClipboardList,
    Award,
    CalendarDays,
    Wallet,
    Bell,
    Menu,
    X,
    LogOut,
    ChevronRight,
    Clock,
    ArrowUpRight,
    Settings,
} from "lucide-react";

import { getMyStudentProfile } from "../../services/studentService";

const navigation = [
    { name: "Overview", icon: LayoutDashboard, path: "/students" },
    { name: "My Profile", icon: UserRound, path: "/students/profile" },
    { name: "My Subjects", icon: BookOpen, path: "/students/subjects" },
    { name: "Assignments", icon: ClipboardList, path: "/students/assignments" },
    { name: "Examination Results", icon: Award, path: "/students/results" },
    { name: "Timetable", icon: CalendarDays, path: "/students/timetable" },
    { name: "School Fees", icon: Wallet, path: "/students/fees" },
    { name: "School Events", icon: Bell, path: "/students/events" },
];

const statistics = [
    {
        title: "My Subjects",
        value: "0",
        description: "Registered subjects",
        icon: BookOpen,
        color: "bg-blue-50 text-blue-700",
    },
    {
        title: "Assignments",
        value: "0",
        description: "Pending assignments",
        icon: ClipboardList,
        color: "bg-purple-50 text-purple-700",
    },
    {
        title: "Upcoming Exams",
        value: "0",
        description: "Scheduled examinations",
        icon: Award,
        color: "bg-amber-50 text-amber-700",
    },
    {
        title: "School Events",
        value: "0",
        description: "Upcoming activities",
        icon: CalendarDays,
        color: "bg-green-50 text-green-700",
    },
];

export default function StudentDashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user") || "{}");

    // Fetch the authenticated student's profile
    useEffect(() => {
        let active = true;

        async function loadStudentProfile() {
            try {
                const profile = await getMyStudentProfile();

                if (active) {
                    setStudent(profile);
                }
            } catch (err) {
                if (active) {
                    setError(err.message);
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        }

        loadStudentProfile();

        return () => {
            active = false;
        };
    }, []);

    // Student display information
    const studentName = student
        ? `${student.firstName} ${student.lastName || ""}`.trim()
        : user.username || "Student";

    const studentInitial = student
        ? student.firstName?.charAt(0).toUpperCase() || "S"
        : (user.username || "S").charAt(0).toUpperCase();

    // Logout
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login", { replace: true });
    };

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-[#650d27] text-white transition-transform duration-300 lg:translate-x-0 ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >

                {/* School branding */}
                <div className="flex items-center gap-3 border-b border-white/10 px-6 py-6">
                    <div className="rounded-xl bg-yellow-400 p-3 text-[#650d27]">
                        <GraduationCap size={27} />
                    </div>

                    <div>
                        <h1 className="font-extrabold tracking-wide">
                            DOMBOTOMBO
                        </h1>

                        <p className="text-[10px] tracking-widest text-gray-300">
                            GOVERNMENT PRIMARY SCHOOL
                        </p>
                    </div>

                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="ml-auto lg:hidden"
                        aria-label="Close sidebar"
                    >
                        <X size={22} />
                    </button>
                </div>

                {/* Navigation */}
                <div className="flex-1 overflow-y-auto px-4 py-6">

                    <p className="mb-4 px-3 text-xs font-bold uppercase tracking-widest text-gray-400">
                        Student Menu
                    </p>

                    <nav className="space-y-2">
                        {navigation.map((item, index) => {
                            const Icon = item.icon;
                            const active = index === 0;

                            return (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                                        active
                                            ? "bg-yellow-400 text-[#650d27] shadow"
                                            : "text-gray-200 hover:bg-white/10 hover:text-white"
                                    }`}
                                >
                                    <Icon size={19} />

                                    {item.name}

                                    {active && (
                                        <ChevronRight
                                            size={17}
                                            className="ml-auto"
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="mt-10 border-t border-white/10 pt-6">
                        <p className="mb-4 px-3 text-xs font-bold uppercase tracking-widest text-gray-400">
                            Account
                        </p>

                        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-200 transition hover:bg-white/10">
                            <Settings size={19} />
                            Settings
                        </button>
                    </div>
                </div>

                {/* Sidebar footer */}
                <div className="border-t border-white/10 p-4">
                    <div className="flex items-center gap-3 rounded-xl bg-white/10 p-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400 font-bold text-[#650d27]">
                            {studentInitial}
                        </div>

                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-bold">
                                {studentName}
                            </p>

                            <p className="text-xs text-gray-300">
                                Student Account
                            </p>
                        </div>

                        <button
                            onClick={logout}
                            title="Logout"
                            className="text-gray-300 transition hover:text-yellow-400"
                        >
                            <LogOut size={19} />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <div className="min-h-screen lg:pl-72">

                {/* Topbar */}
                <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-gray-200 bg-white px-5 shadow-sm sm:px-8">

                    <div className="flex items-center gap-4">

                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
                            aria-label="Open sidebar"
                        >
                            <Menu size={24} />
                        </button>

                        <div>
                            <h2 className="font-bold text-gray-800">
                                Student Portal
                            </h2>

                            <p className="hidden text-xs text-gray-500 sm:block">
                                Dombotombo Government Primary School
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">

                        <button
                            className="relative rounded-full p-2 text-gray-500 transition hover:bg-gray-100"
                            aria-label="Notifications"
                        >
                            <Bell size={22} />

                            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
                        </button>

                        <div className="hidden items-center gap-3 border-l border-gray-200 pl-4 sm:flex">

                            <div className="text-right">
                                <p className="text-sm font-bold text-gray-800">
                                    {studentName}
                                </p>

                                <p className="text-xs text-gray-500">
                                    Student
                                </p>
                            </div>

                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#790d29] font-bold text-white">
                                {studentInitial}
                            </div>
                        </div>
                    </div>
                </header>

                <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8">

                    {/* Profile loading and error messages */}
                    {loading && (
                        <div className="mb-6 rounded-xl bg-blue-50 p-4 text-sm text-blue-700">
                            Loading your student profile...
                        </div>
                    )}

                    {error && (
                        <div className="mb-6 rounded-xl bg-red-50 p-4 text-sm text-red-700">
                            {error}
                        </div>
                    )}

                    {/* Welcome banner */}
                    <section className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-[#650d27] to-[#920e38] p-7 text-white shadow-lg sm:p-10">

                        <div className="relative z-10 max-w-2xl">

                            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-yellow-400">
                                Student Dashboard
                            </p>

                            <h1 className="text-3xl font-extrabold sm:text-4xl">
                                Welcome back, {loading ? "..." : student?.firstName || "Student"}!
                            </h1>

                            <p className="mt-4 max-w-xl text-sm leading-7 text-gray-200 sm:text-base">
                                Stay connected with your academic journey.
                                Access your subjects, assignments, examination
                                results and school announcements.
                            </p>

                            <div className="mt-6 flex flex-wrap gap-3">

                                <button
                                    onClick={() => navigate("/students/subjects")}
                                    className="flex items-center gap-2 rounded-lg bg-yellow-400 px-5 py-3 text-sm font-bold text-[#650d27] transition hover:bg-yellow-300"
                                >
                                    View My Subjects
                                    <ArrowUpRight size={17} />
                                </button>

                                <button
                                    onClick={() => navigate("/students/profile")}
                                    className="rounded-lg border border-white/40 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                                >
                                    My Profile
                                </button>
                            </div>
                        </div>

                        <div className="absolute -right-10 -top-20 hidden h-72 w-72 rounded-full border-[35px] border-white/10 lg:block" />

                        <div className="absolute -bottom-32 right-40 hidden h-72 w-72 rounded-full border-[35px] border-yellow-400/10 lg:block" />

                        <GraduationCap
                            size={150}
                            className="absolute bottom-5 right-10 hidden text-white/10 lg:block"
                        />
                    </section>

                    {/* Student information */}
                    {student && (
                        <section className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

                            <div className="mb-5 flex items-center justify-between">
                                <div>
                                    <h2 className="font-bold text-gray-800">
                                        My Student Information
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Your registered school details
                                    </p>
                                </div>

                                <UserRound
                                    size={25}
                                    className="text-[#790d29]"
                                />
                            </div>

                            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

                                <div>
                                    <p className="text-xs text-gray-500">
                                        Full Name
                                    </p>

                                    <p className="mt-1 font-semibold text-gray-800">
                                        {studentName}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-500">
                                        Registration Number
                                    </p>

                                    <p className="mt-1 font-semibold text-gray-800">
                                        {student.registrationNumber || "Not available"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-500">
                                        Grade
                                    </p>

                                    <p className="mt-1 font-semibold text-gray-800">
                                        {student.grade || "Not assigned"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-500">
                                        Email Address
                                    </p>

                                    <p className="mt-1 break-all font-semibold text-gray-800">
                                        {student.email || "Not available"}
                                    </p>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Page heading */}
                    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">

                        <div>
                            <h2 className="text-xl font-extrabold text-gray-800">
                                Academic Overview
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Here's what's happening with your school activities.
                            </p>
                        </div>

                        <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-600">
                            <CalendarDays size={17} className="text-[#790d29]" />
                            School Overview
                        </div>
                    </div>

                    {/* Statistics */}
                    <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

                        {statistics.map((stat) => {
                            const Icon = stat.icon;

                            return (
                                <div
                                    key={stat.title}
                                    className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                                >
                                    <div className="flex items-center justify-between">

                                        <div>
                                            <p className="text-sm font-medium text-gray-500">
                                                {stat.title}
                                            </p>

                                            <h3 className="mt-3 text-3xl font-extrabold text-gray-800">
                                                {stat.value}
                                            </h3>
                                        </div>

                                        <div className={`rounded-xl p-4 ${stat.color}`}>
                                            <Icon size={24} />
                                        </div>
                                    </div>

                                    <p className="mt-4 text-xs text-gray-400">
                                        {stat.description}
                                    </p>
                                </div>
                            );
                        })}
                    </section>

                    {/* Lower dashboard sections */}
                    <div className="mt-8 grid gap-6 xl:grid-cols-3">

                        {/* Academic information */}
                        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm xl:col-span-2">

                            <div className="flex items-center justify-between">

                                <div>
                                    <h3 className="font-bold text-gray-800">
                                        Academic Information
                                    </h3>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Your learning activities
                                    </p>
                                </div>

                                <BookOpen className="text-[#790d29]" size={25} />
                            </div>

                            <div className="mt-6 grid gap-4 sm:grid-cols-2">

                                <Link
                                    to="/students/assignments"
                                    className="group rounded-xl border border-gray-100 p-5 transition hover:border-[#790d29]/30 hover:bg-[#790d29]/5"
                                >
                                    <ClipboardList className="text-[#790d29]" size={25} />

                                    <h4 className="mt-4 font-bold text-gray-800">
                                        My Assignments
                                    </h4>

                                    <p className="mt-2 text-sm text-gray-500">
                                        View and track your assignments.
                                    </p>

                                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#790d29]">
                                        View assignments
                                        <ChevronRight size={16} className="transition group-hover:translate-x-1" />
                                    </span>
                                </Link>

                                <Link
                                    to="/students/results"
                                    className="group rounded-xl border border-gray-100 p-5 transition hover:border-[#790d29]/30 hover:bg-[#790d29]/5"
                                >
                                    <Award className="text-[#790d29]" size={25} />

                                    <h4 className="mt-4 font-bold text-gray-800">
                                        Examination Results
                                    </h4>

                                    <p className="mt-2 text-sm text-gray-500">
                                        Review your academic performance.
                                    </p>

                                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#790d29]">
                                        View results
                                        <ChevronRight size={16} className="transition group-hover:translate-x-1" />
                                    </span>
                                </Link>
                            </div>
                        </section>

                        {/* Announcements */}
                        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

                            <div className="flex items-center justify-between">

                                <div>
                                    <h3 className="font-bold text-gray-800">
                                        Announcements
                                    </h3>

                                    <p className="mt-1 text-sm text-gray-500">
                                        School updates
                                    </p>
                                </div>

                                <Bell className="text-[#790d29]" size={23} />
                            </div>

                            <div className="mt-8 flex flex-col items-center py-6 text-center">

                                <div className="rounded-full bg-gray-100 p-4 text-gray-400">
                                    <Bell size={25} />
                                </div>

                                <p className="mt-4 text-sm font-semibold text-gray-700">
                                    No announcements yet
                                </p>

                                <p className="mt-2 text-xs leading-5 text-gray-400">
                                    Important school updates will appear here.
                                </p>
                            </div>
                        </section>
                    </div>

                    {/* Timetable and fees */}
                    <div className="mt-6 grid gap-6 md:grid-cols-2">

                        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

                            <div className="flex items-center gap-3">

                                <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
                                    <Clock size={23} />
                                </div>

                                <div>
                                    <h3 className="font-bold text-gray-800">
                                        Class Timetable
                                    </h3>

                                    <p className="text-sm text-gray-500">
                                        Your weekly learning schedule
                                    </p>
                                </div>
                            </div>

                            <p className="mt-6 rounded-xl bg-gray-50 p-5 text-center text-sm text-gray-500">
                                Your class timetable will appear here.
                            </p>
                        </section>

                        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

                            <div className="flex items-center gap-3">

                                <div className="rounded-xl bg-yellow-50 p-3 text-yellow-700">
                                    <Wallet size={23} />
                                </div>

                                <div>
                                    <h3 className="font-bold text-gray-800">
                                        School Fees
                                    </h3>

                                    <p className="text-sm text-gray-500">
                                        Your fee payment information
                                    </p>
                                </div>
                            </div>

                            <p className="mt-6 rounded-xl bg-gray-50 p-5 text-center text-sm text-gray-500">
                                Your school fee balance will appear here.
                            </p>
                        </section>
                    </div>

                    {/* Footer */}
                    <footer className="mt-10 border-t border-gray-200 py-6 text-center text-xs text-gray-400">
                        © {new Date().getFullYear()} Dombotombo Government Primary School.
                        All rights reserved.
                    </footer>

                </main>
            </div>
        </div>
    );
}
