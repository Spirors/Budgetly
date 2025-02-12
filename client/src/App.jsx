import './App.css'
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'

import { UserContextProvider } from './context/UserContext'
import { DataContextProvider } from './context/DataContext'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Budget from './pages/Budget'
import Transaction from './pages/Transaction'
import RedirectToLogin from './components/Auth/RedirectToLogin'

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true

function App() {
  return (
    <UserContextProvider>
      <DataContextProvider>
        <Toaster position='bottom-right' toastOptions={{ duration: 1250 }} />
        <Routes>
          <Route path="/" element={<RedirectToLogin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/budget" element={<Budget />} />
          <Route path="/dashboard/transaction" element={<Transaction />} />
        </Routes>
      </DataContextProvider>
    </UserContextProvider>
  )
}

export default App;
