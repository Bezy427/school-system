import { NavLink } from "react-router";
import { useAuth } from "../context/AuthContext";
import { ROLES } from "../utils/roles";

const principalLinks = [
    {
        label: "Dashboard",
        path: "/principal",
    }, 
    {
        label: "Students",
        path: "principal/students",
    },
    {
        label: "Teachers",
        path: "/principal/teachers",
    },
    {
        label: "Departments",
        path: "/principal/departments"
    },
    {
        label: "Subjects",
        path: "/principal/subjects",
    },
    {
        label: "Exams",
        path: "/principal/exams",
    },
    {
        label: "Enrollments",
        path: "/principal/enrollments",
    },
    {
        label: "Attendance",
        path: "/principal/attendance",
    },
    {
        label: "Events",
        path: "/principal/events",
    }
];

const teacherLinks = [
    {
        label: "Dashboard",
        path: "/teacher",
    },
    {
        label: "Students",
        path: "/teacher/students",
    },
    {
        label: "Subjects",
        path: "/teacher/subjects",
    },
    {
        label: "Exams",
        path: "/teacher/exams",
    },
    {
        label: "Attendance",
        path: "/teacher/attendance",
    },
];

const studentLinks = [
    {
        label: "Dashboard",
        path: "/student",
    },
    {
        label: "Profile",
        path: "/student/profile",
    },
    {
        label: "Subject",
        path: "/student/subject",
    },
    {
        label: "Results",
        path: "/student/results",
    },
    {
        label: "Attendance",
        path: "/student/attendance",
    },
    {
        label: "Events",
        path: "/students/events",
    },
];

export default function Sidebar() {
    const { user } = useAuth();

    let links = [];

    if (user?.role === ROLES.PRINCIPAL) {
        links = principalLinks;
    }

    if (user?.role === ROLES.STUDENT) {
        links = studentLinks;
    }

    if (user?.role === ROLES.TEACHER) {
        links = teacherLinks;
    }

    return (
        <aside className="hidden min-h-[calc(10vh-4rem)] w-64 shrink-0 border-r bg-white md:block">
            <nav className="space-y-1 p-4">
                {links.map((link) => (
                    <NavLink
                        key={link.path} 
                        to={link.path}
                        end={link.path === `/${user?.role?.toLowerCase()}`}
                        className={({ isActive }) =>
                            [
                                "block rounded-lg text-sm px-3 py-2.5 hover:ring-2 font-medium transitions",
                                isActive
                                    ? "bg-gray-900 text-white"
                                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                            ].join(" ")
                    }>
                        {link.label}
                    </NavLink>
                ))}
            </nav>
        </aside>
    )

}