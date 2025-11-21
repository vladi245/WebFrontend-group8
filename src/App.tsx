import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
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

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/desk" element={<ProtectedRoute><Desk /></ProtectedRoute>} />
          <Route path="/workout" element={<ProtectedRoute><Workout /></ProtectedRoute>} />
          <Route path="/meals" element={<ProtectedRoute><Meals /></ProtectedRoute>} />
          <Route path="/hydration" element={<ProtectedRoute><Hydration /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute><UsersPage /></ProtectedRoute>} />
          <Route path="/admin/workout" element={<ProtectedRoute><ExercisesAdminPage /></ProtectedRoute>} />
          <Route path="/admin/foods" element={<ProtectedRoute><FoodsAdminPage /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="/friends" element={<ProtectedRoute><Friends /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/error" replace />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App