import { Navigate, Outlet, replace, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute() {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <p className="text-gray-500">Loading...</p>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <Navigate 
                to="/login"
                replace
                state={{ from: location }}
            />
        );
    }

    return <Outlet />
}