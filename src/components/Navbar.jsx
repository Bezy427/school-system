import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    const { user, logout } = useAuth();

    const role = user?.role?.toUpperCase();

    const displayRole = 
        role?.charAt(0) + role?.slice(1).toUpperCase();

    return (
        <header className="flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm">
            <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-900 text-sm font-bold text-white">
                    CH
                </div>
                <div>
                    <div>
                        <Link 
                            to="/"
                            className="text-lg font-bold text-gray-900">
                            Chakari High School
                        </Link>

                        <p className="text-xs text-gray-500 sm:block">
                            School Management System
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                           {user?.role || "User"} 
                        </p>

                        <p className="text-xs text-gray-500">
                            {user?.role || "USER"}
                        </p>
                    </div>

                    <button onClick={logout} className="rounded-lg border px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </header>
    )
}