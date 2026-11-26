import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles = [] }) {
    const token = localStorage.getItem('token');    

    let user = null;

    try {
        user = JSON.parse(localStorage.getItem('user'));
    } catch {
        user = null;
    }

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles.length > 0 && (!user || !allowedRoles.includes(user.role))) {
        return <Navigate to="/login" replace />;
    }
    
    return children;


}