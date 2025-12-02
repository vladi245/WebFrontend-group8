import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import './App.css'
import Home from './pages/Home'
import ErrorPage from './pages/Errors'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import AboutUs from './pages/AboutUs'
import Desk from './pages/Desk'

import Workout from './pages/Workout'
import Meals from './pages/Meals'
import Hydration from './pages/Hydration'
import Settings from './pages/Settings'
import Friends from './pages/Friends'
import Dashboard from './pages/Dashboard'
import UsersPage from './pages/Admin/UsersPage'
import ExercisesAdminPage from './pages/Admin/ExercisesAdminPage'
import FoodsAdminPage from './pages/Admin/FoodsAdminPage'
import ProtectedRoute from './components/ProtectedRoute'

//  routes that should have theme applied
const protectedRoutes = ['/dashboard', '/workout', '/meals', '/desk', '/settings', '/admin'];

function ThemeHandler() {
  const location = useLocation();

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const isProtectedRoute = protectedRoutes.some(route => location.pathname.startsWith(route));

    if (isProtectedRoute && token) {
      // apply theme iflogged in
      const savedTheme = localStorage.getItem('theme') || 'dark';
      if (savedTheme === 'light') {
        document.body.classList.add('light');
        document.body.classList.remove('dark');
      } else {
        document.body.classList.add('dark');
        document.body.classList.remove('light');
      }
    } else {
      // remove theme if not logged in
      document.body.classList.remove('light', 'dark');
    }
  }, [location.pathname]);

  return null;
}

function App() {

  return (
    <>
      <BrowserRouter>
        <ThemeHandler />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/desk" element={<ProtectedRoute><Desk /></ProtectedRoute>} />
          <Route path="/workout" element={<ProtectedRoute><Workout /></ProtectedRoute>} />
          <Route path="/meals" element={<ProtectedRoute requiredType="premium"><Meals /></ProtectedRoute>} />
          {/*<Route path="/hydration" element={<ProtectedRoute><Hydration /></ProtectedRoute>} /> */}
          <Route path="/admin" element={<ProtectedRoute requiredType="admin"><UsersPage /></ProtectedRoute>} />
          <Route path="/admin/workout" element={<ProtectedRoute requiredType="admin"><ExercisesAdminPage /></ProtectedRoute>} />
          <Route path="/admin/foods" element={<ProtectedRoute requiredType="admin"><FoodsAdminPage /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          {/*<Route path="/friends" element={<ProtectedRoute><Friends /></ProtectedRoute>} />*/}
          <Route path="*" element={<Navigate to="/error" replace />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App