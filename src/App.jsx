import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Students from "./pages/Students";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/students" element={<Students />} />
        <Route 
          path="/dashboard" 
          element={<ProtectedRoute><h1 className="p-6 text-2xl">Dashboard</h1></ProtectedRoute>} 
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  )
}