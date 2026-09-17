import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    const { user, logout } = useAuth();

    return (
        <header className="sticky top-0 z-30 border-b bg-white">
            <div className="flex h-16 items-center justify-between px-4 sm:px-6">
                <div>
                    <h1 className="text-lg font-bold text-gray-900">
                        School Management
                    </h1>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden text-right sm:block">
                        <p className="text-sm font-medium text-gray-900">
                            {user?.username || "User"}
                        </p>

                        <p className="text-xs text-gray-500">
                            {user?.role || "Unknown"}
                        </p>
                    </div>

                    <button className="rounded-lg border px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </header>
    )
}