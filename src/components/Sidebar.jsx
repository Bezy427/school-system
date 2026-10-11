import { NavLink } from "react-router";
import { useAuth } from "../context/AuthContext";


const links = {
    PRINCIPAL: [
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
    ],
    
    TEACHER: [
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
    ],
    
    STUDENT: [
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
    ]
}

function Sidebar() {
    const { user } = useAuth();

    const role = user?.role?.toUpperCase();

    const roleLinks = links[role] || [];

    return (
        <aside className="min-h-[calc(100vh-4rem)] w-64 shrink-0 border-r bg-white">
            <div className="border-b p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Portal
                </p>

                <p className="mt-1 font-semibold text-gray-900">
                    {role || "USER"}
                </p>
            </div>
            <nav className="space-y-1 p-4">
                {roleLinks.map((link) => (
                    <NavLink
                        key={link.path} 
                        to={link.path}
                        end={link.path === `/${role?.toLowerCase()}`}
                        className={({ isActive }) =>
                            `block rounded-lg px-4 py-3 text-sm font-medium ${
                                isActive
                                  ? "bg-gray-900 text-white"
                                  : "text-gray-600 hover:bg-gray-100"
                            }`
                        }
                    >
                        {link.label}
                    </NavLink>
                ))}
            </nav>
        </aside>
    )

}

export default Sidebar;