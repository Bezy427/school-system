import { Navigate, Outlet, replace, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";
import LoadingScreen from "../components/LoadingScreen";

export default function ProtectedRoute() {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <LoadingScreen />;
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