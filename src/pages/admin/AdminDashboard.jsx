
import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  School,
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  CalendarCheck,
  ClipboardList,
  Wallet,
  Bell,
  Settings,
  Search,
  Menu,
  X,
  ChevronDown,
  UserPlus,
  CalendarDays,
  TrendingUp,
  MoreHorizontal,
  LogOut,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

const navigation = [
  { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { name: "Students", path: "/admin/students", icon: GraduationCap },
  { name: "Teachers", path: "/admin/teachers", icon: Users },
  { name: "Classes", path: "/admin/lectures", icon: School },
  { name: "Departments", path: "/admin/departments", icon: BookOpen },
  { name: "Attendance", path: "/admin/attendance", icon: CalendarCheck },
  { name: "Examinations", path: "/admin/examinations", icon: ClipboardList },
  { name: "Fees & Payments", path: "/admin/fees", icon: Wallet },
  { name: "Announcements", path: "/admin/announcements", icon: Bell },
];

const enrollmentData = [
  { month: "Jan", students: 420 },
  { month: "Feb", students: 460 },
  { month: "Mar", students: 490 },
  { month: "Apr", students: 510 },
  { month: "May", students: 550 },
  { month: "Jun", students: 590 },
  { month: "Jul", students: 610 },
  { month: "Aug", students: 640 },
  { month: "Sep", students: 680 },
  { month: "Oct", students: 710 },
  { month: "Nov", students: 735 },
];

const attendanceData = [
  { day: "Mon", present: 680, absent: 35 },
  { day: "Tue", present: 695, absent: 25 },
  { day: "Wed", present: 670, absent: 50 },
  { day: "Thu", present: 700, absent: 20 },
  { day: "Fri", present: 685, absent: 35 },
];

const activities = [
  {
    title: "New student registration",
    description: "A new student account was registered",
    time: "Today, 09:30 AM",
    icon: UserPlus,
  },
  {
    title: "Attendance updated",
    description: "Class 7A attendance was submitted",
    time: "Today, 08:45 AM",
    icon: CalendarCheck,
  },
  {
    title: "Examination records",
    description: "Term examination records were updated",
    time: "Yesterday",
    icon: ClipboardList,
  },
];

const stats = [
  {
    title: "Total Students",
    value: "735",
    change: "+12.5%",
    icon: GraduationCap,
    color: "bg-blue-50 text-blue-700",
  },
  {
    title: "Total Teachers",
    value: "42",
    change: "+4.8%",
    icon: Users,
    color: "bg-purple-50 text-purple-700",
  },
  {
    title: "Total Classes",
    value: "18",
    change: "+2 new",
    icon: School,
    color: "bg-amber-50 text-amber-700",
  },
  {
    title: "Attendance Rate",
    value: "94.6%",
    change: "+3.2%",
    icon: TrendingUp,
    color: "bg-green-50 text-green-700",
  },
];

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-[#650d27] text-white transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-yellow-400 p-2.5 text-[#650d27]">
              <School size={25} />
            </div>

            <div>
              <h1 className="font-extrabold tracking-wide">DOMBOTOMBO</h1>
              <p className="text-[10px] tracking-widest text-gray-300">
                SCHOOL PORTAL
              </p>
            </div>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <X size={22} />
          </button>
        </div>

        <div className="px-5 py-6">
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-400">
            Main Menu
          </p>

          <nav className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.path === "/admin"}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? "bg-yellow-400 text-[#650d27] shadow-lg"
                        : "text-gray-200 hover:bg-white/10 hover:text-white"
                    }`
                  }
                >
                  <Icon size={19} />
                  {item.name}
                </NavLink>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto border-t border-white/10 p-5">
          <NavLink
            to="/admin/settings"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-200 hover:bg-white/10"
          >
            <Settings size={19} />
            Settings
          </NavLink>

          <NavLink
            to="/login"
            className="mt-2 flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-200 hover:bg-white/10"
          >
            <LogOut size={19} />
            Sign Out
          </NavLink>
        </div>
      </aside>

      {/* Main area */}
      <div className="min-h-screen lg:ml-72">

        {/* Topbar */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-gray-200 bg-white px-5 md:px-8">

          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-600 lg:hidden"
            >
              <Menu size={25} />
            </button>

            <div>
              <h2 className="text-lg font-extrabold text-gray-800">
                Admin Dashboard
              </h2>
              <p className="hidden text-xs text-gray-500 sm:block">
                School administration overview
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-5">

            <div className="hidden items-center rounded-xl bg-gray-100 px-3 py-2 md:flex">
              <Search size={18} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-36 bg-transparent px-2 text-sm outline-none"
              />
            </div>

            <button className="relative rounded-full p-2 text-gray-500 hover:bg-gray-100">
              <Bell size={21} />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
            </button>

            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#790d29] font-bold text-white">
                A
              </div>

              <div className="hidden sm:block">
                <p className="text-sm font-bold text-gray-800">
                  Administrator
                </p>
                <p className="text-xs text-gray-500">School Admin</p>
              </div>

              <ChevronDown size={17} className="hidden text-gray-400 sm:block" />
            </div>

          </div>
        </header>

        {/* Dashboard content */}
        <main className="space-y-7 p-5 md:p-8">

          {/* Welcome */}
          <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Welcome back,
              </p>

              <h1 className="mt-1 text-2xl font-extrabold text-[#650d27] md:text-3xl">
                School Administrator
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Here's what's happening at your school.
              </p>
            </div>

            <button className="flex items-center justify-center gap-2 rounded-xl bg-[#790d29] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#57091d]">
              <CalendarDays size={18} />
              Academic Year 2026
              <ChevronDown size={16} />
            </button>
          </section>

          {/* Statistics */}
          <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.title}
                  className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className={`rounded-xl p-3 ${stat.color}`}>
                      <Icon size={23} />
                    </div>

                    <button className="text-gray-400 hover:text-gray-700">
                      <MoreHorizontal size={22} />
                    </button>
                  </div>

                  <p className="mt-5 text-sm font-medium text-gray-500">
                    {stat.title}
                  </p>

                  <div className="mt-2 flex items-end justify-between gap-2">
                    <h3 className="text-3xl font-extrabold text-gray-800">
                      {stat.value}
                    </h3>

                    <span className="mb-1 text-xs font-bold text-green-600">
                      {stat.change}
                    </span>
                  </div>
                </div>
              );
            })}
          </section>

          {/* Charts */}
          <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">

            {/* Enrollment chart */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm xl:col-span-2">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-gray-800">
                    Student Enrollment
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">
                    Enrollment trend throughout the year
                  </p>
                </div>

                <button className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-600">
                  This Year
                </button>
              </div>

              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={enrollmentData}>
                    <defs>
                      <linearGradient
                        id="enrollmentColor"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="0%" stopColor="#790d29" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#790d29" stopOpacity={0} />
                      </linearGradient>
                    </defs>

                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip />

                    <Area
                      type="monotone"
                      dataKey="students"
                      stroke="#790d29"
                      strokeWidth={3}
                      fill="url(#enrollmentColor)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Attendance chart */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="mb-6">
                <h3 className="font-extrabold text-gray-800">
                  Weekly Attendance
                </h3>
                <p className="mt-1 text-xs text-gray-500">
                  Students present and absent
                </p>
              </div>

              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={attendanceData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} />
                    <YAxis hide />
                    <Tooltip />
                    <Bar
                      dataKey="present"
                      fill="#790d29"
                      radius={[5, 5, 0, 0]}
                    />
                    <Bar
                      dataKey="absent"
                      fill="#e5b94b"
                      radius={[5, 5, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-3 flex justify-center gap-5 text-xs text-gray-500">
                <span>● Present</span>
                <span className="text-yellow-600">● Absent</span>
              </div>
            </div>
          </section>

          {/* Recent activity and announcements */}
          <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">

            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="font-extrabold text-gray-800">
                  Recent Activity
                </h3>

                <button className="text-sm font-bold text-[#790d29]">
                  View all
                </button>
              </div>

              <div className="space-y-6">
                {activities.map((activity) => {
                  const Icon = activity.icon;

                  return (
                    <div key={activity.title} className="flex gap-4">
                      <div className="h-fit rounded-xl bg-[#790d29]/10 p-3 text-[#790d29]">
                        <Icon size={20} />
                      </div>

                      <div className="flex-1">
                        <p className="text-sm font-bold text-gray-800">
                          {activity.title}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          {activity.description}
                        </p>

                        <p className="mt-2 text-xs text-gray-400">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="font-extrabold text-gray-800">
                  School Announcements
                </h3>

                <button className="text-sm font-bold text-[#790d29]">
                  View all
                </button>
              </div>

              <div className="rounded-xl border border-yellow-100 bg-yellow-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-yellow-700">
                  Important Notice
                </p>

                <h4 className="mt-2 font-bold text-gray-800">
                  Upcoming Academic Activities
                </h4>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Important school dates, examination schedules and academic
                  activities will be communicated through this portal.
                </p>
              </div>

              <div className="mt-4 rounded-xl border border-gray-100 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  School Information
                </p>

                <h4 className="mt-2 font-bold text-gray-800">
                  Welcome to the Admin Portal
                </h4>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Use the administration menu to manage the school's
                  academic and operational records.
                </p>
              </div>
            </div>

          </section>

          <footer className="border-t border-gray-200 pt-5 text-center text-xs text-gray-400">
            © {new Date().getFullYear()} Dombotombo Government Primary School.
            All rights reserved.
          </footer>

        </main>
      </div>
    </div>
  );
}
