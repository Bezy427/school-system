
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/public/Home";
import Login from "./pages/public/Login";
import Register from "./pages/Register";

import AdminDashboard from "./pages/admin/AdminDashboard";
import PrincipalLectures from "./pages/admin/PrincipalLectures";

import StudentDashboard from "./pages/student/StudentDashboard";
import StudentProfile from "./pages/student/StudentProfile";
import StudentSubjects from "./pages/student/StudentSubjects";

import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["PRINCIPAL"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/lectures"
        element={
          <ProtectedRoute allowedRoles={["PRINCIPAL"]}>
            <PrincipalLectures />
          </ProtectedRoute>
        }
      />

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

      <Route
        path="/students/subjects"
        element={
          <ProtectedRoute allowedRoles={["STUDENT"]}>
            <StudentSubjects />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
