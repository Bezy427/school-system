import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function({ allowedRoles }) {
    const { user, isAuthenticated, loading} = useAuth();

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <p className="text-gray-500">Loading...</p>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(user?.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
}
