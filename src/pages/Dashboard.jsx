import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
    const { user, logout } = useAuth();

    return (
        <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-500">
                        Welcome back
                    </p>

                    <h1 className="mt-1 text-3xl font-bold text-gray-900">
                        {user?.username || "User"}
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        Role: {user?.role || "Unknown"}
                    </p>
                </div>

                <button 
                    onClick={logout}
                    className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-50"
                >
                    Logout
                </button>
            </div>
        </main>
    );
}