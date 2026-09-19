import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "../src/pages/Home"
import Login from "../src/pages/Login"
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./pages/Unauthorized";
import RoleRoute from "./components/RoleRoute";
import StudentDashboard from "./pages/students/StudentDashboard";
import Profile from "./pages/students/Profile";
import PrincipalDashboard from "./pages/PrincipalDashboard";
import Students from "./pages/principal/students";
import Teachers from "./pages/principal/Teachers";
import Departments from "./pages/principal/Departments";
import Subjects from "./pages/principal/Subjects";
import Exams from "./pages/principal/Exams";
import Enrollments from "./pages/principal/Enrollments";
import Attendance from "./pages/principal/Attendance";
import Events from "./pages/principal/Events";
import TeacherDashboard from "./pages/teacher/TeacherDashboard"
import TeacherSubjects from "./pages/teacher/Subjects";
import TeacherStudents from "./pages/teacher/Students";
import TeacherExams from "./pages/teacher/Exams";
import TeacherAttendances from "./pages/teacher/Attendances";
import StudentSubjects from "./pages/students/Subjects";
import StudentResults from "./pages/students/Results";
import StudentAttendance from "./pages/students/Attendance";
import StudentEvents from "./pages/students/Events";

export default function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/> 
          <Route path="*" element={<NotFound />}/>
          <Route path="/unauthorized" element={<Unauthorized />}/>
          <Route path="/principal" element={<PrincipalDashboard />}/> 
          <Route path="/principal/students" element={<Students />}/> 
          <Route path="/principal/teachers" element={<Teachers />}/> 
          <Route path="/principal/departments" element={<Departments />}/> 
          <Route path="/principal/subjects" element={<Subjects />}/> 
          <Route path="/principal/exams" element={<Exams />}/> 
          <Route path="/principal/enrollments" element={<Enrollments />}/> 
          <Route path="/principal/attendances" element={<Attendance />}/> 
          <Route path="/principal/events" element={<Events />}/> 
          <Route path="/teacher/students" element={<TeacherStudents />}/> 
          <Route path="/teacher/subjects" element={<TeacherSubjects />}/> 
          <Route path="/teacher/exams" element={<TeacherExams />}/> 
          <Route path="/teacher/attendances" element={<TeacherAttendances />}/> 
          <Route path="/teacher" element={<TeacherDashboard />}/> 
          <Route path="/student" element={<StudentDashboard />}/> 
          <Route path="/student/profile" element={<Profile />}/> 
          <Route path="/student/subjects" element={<StudentSubjects />}/> 
          <Route path="/student/results" element={<StudentResults />}/> 
          <Route path="/student/attendance" element={<StudentAttendance />}/> 
          <Route path="/student/events" element={<StudentEvents />}/> 
          {/*Prootected Routes*/} 
          <Route element={<ProtectedRoute />}>
            <Route element={<RoleRoute allowedRoles={["PRINCIPAL"]}/>}>
            </Route>
            <Route element={<RoleRoute allowedRoles={["STUDENT"]}/>}>
            </Route> 
            <Route element={<RoleRoute allowedRoles={["TEACHER"]}/>}>
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  )
}