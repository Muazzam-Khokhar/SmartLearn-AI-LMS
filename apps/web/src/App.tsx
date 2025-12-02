import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Home from "./pages/Home";

import ProtectedRoute from "./auth/ProtectedRoute";
import RoleRoute from "./auth/RoleRoute";

// Layouts
import AdminLayout from "./components/layout/AdminLayout";
import TeacherLayout from "./components/layout/TeacherLayout";
import StudentLayout from "./components/layout/StudentLayout";

// Admin
import AdminDashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import CoursesOverview from "./pages/admin/CoursesOverview";

// Teacher
import TeacherDashboard from "./pages/teacher/Dashboard";
import MyCourses from "./pages/teacher/MyCourses";
import CourseEditor from "./pages/teacher/CourseEditor";

// Student
import StudentDashboard from "./pages/student/Dashboard";
import CoursePlayer from "./pages/student/CoursePlayer";
import MyStudentCourses from "./pages/student/MyCourses";

import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin"
      element={
        <ProtectedRoute>
          <RoleRoute allowed={["admin"]} childer={
            <AdminLayout/>
          }/>
        </ProtectedRoute>
      }>
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="courses" element={<CoursesOverview />} />
      </Route>
      <Route
        path="/teacher"
        element={
          <ProtectedRoute>
            <RoleRoute allowed={["teacher"]} childer={
              <TeacherLayout />
            } />
          </ProtectedRoute>
        }
      >
        <Route index element={<TeacherDashboard />} />
        <Route path="my-courses" element={<MyCourses />} />
        <Route path="course-editor/:id" element={<CourseEditor />} />
      </Route>
      <Route
        path="/student"
        element={
          <ProtectedRoute>
            <RoleRoute allowed={["student"]} childer={
              <StudentLayout />
            } />
          </ProtectedRoute>
        }
      >
        <Route index element={<StudentDashboard />} />
        <Route path="my-courses" element={<MyStudentCourses />} />
        <Route path="player/:courseId" element={<CoursePlayer />} />
      </Route>
    </Routes>
  );
}
