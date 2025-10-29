import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import ErrorPage from './pages/Errors'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import AboutUs from './pages/AboutUs'
import Workout from './pages/Workout'
import Settings from './pages/Settings'
import Friends from './pages/Friends'

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
          <Route path="/workout" element={<Workout />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="*" element={<Navigate to="/error" replace />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App