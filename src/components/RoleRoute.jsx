import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";
import LoadingScreen from "./LoadingScreen";

export default function({ allowedRoles }) {
    const { user, isAuthenticated, loading} = useAuth();

    if (loading) {
        return <LoadingScreen />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(user?.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
}
