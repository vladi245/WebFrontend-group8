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
          <Route path="/desk" element={<Desk />} />
          <Route path="/workout" element={<Workout />} />
          <Route path="/meals" element={<Meals />} />
          <Route path="/hydration" element={<Hydration />} />
          <Route path="/admin" element={<UsersPage />} />
          <Route path="/admin/workout" element={<ExercisesAdminPage />} />
          <Route path="/admin/foods" element={<FoodsAdminPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="*" element={<Navigate to="/error" replace />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App