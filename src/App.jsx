
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/public/Home";
import Login from "./pages/public/Login";
import Register from "./pages/Register";

import AdminDashboard from "./pages/admin/AdminDashboard";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentProfile from "./pages/student/StudentProfile";
import Teachers from "./pages/Teachers";

import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Principal portal */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["PRINCIPAL"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Student portal */}
      <Route
        path="/students"
        element={
          <ProtectedRoute allowedRoles={["STUDENT"]}>
            <StudentDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/students/profile"
        element={
          <ProtectedRoute allowedRoles={["STUDENT"]}>
            <StudentProfile />
          </ProtectedRoute>
        }
      />

      {/* Teacher portal */}
      <Route
        path="/teachers"
        element={
          <ProtectedRoute allowedRoles={["TEACHER"]}>
            <Teachers />
          </ProtectedRoute>
        }
      />

      {/* Unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
