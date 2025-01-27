import './App.css'
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'

import { UserContextProvider } from '../context/UserContext'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import RedirectToLogin from './components/RedirectToLogin'

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true

function App() {
  return (
    <UserContextProvider>
      <Toaster position='bottom-right' toastOptions={{ duration: 2000 }} />
      <Routes>
        <Route path="/" element={<RedirectToLogin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </UserContextProvider>
  )
}

export default App;
