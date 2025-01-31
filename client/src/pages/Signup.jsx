import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate, Link } from 'react-router-dom'

import AuthLayout from '../components/ui/AuthLayout';

export default function Signup() {
  const navigate = useNavigate()
  const [data, setData] = useState({
    username: '',
    email: '',
    password: ''
  })

  const signupUser = async (e) => {
    e.preventDefault()
    const { username, email, password } = data
    try {
      const {data} = await axios.post('/signup', { username, email, password })
      if (data.error) {
        return toast.error(data.error)
      } else {
        setData({ username: '', email: '', password: '' });
        toast.success('Signup successful')
        navigate('/login')
      }
    } 
    catch (error) {
      console.log(error)
    }
  }

  return (
    <AuthLayout>
      <h1 className="text-2xl font-bold mb-6">Signup</h1>
      <form onSubmit={signupUser}>
        <label className="block mb-2">Username</label>
        <input
          type="text"
          value={data.username}
          onChange={(e) => setData({ ...data, username: e.target.value })}
          className="w-full p-2 mb-4 border rounded"
        />

        <label className="block mb-2">Email</label>
        <input
          type="email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          className="w-full p-2 mb-4 border rounded"
        />

        <label className="block mb-2">Password</label>
        <input
          type="password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          className="w-full p-2 mb-4 border rounded"
        />

        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Signup</button>

        <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
          Already have an account?{" "}
          <Link className="underline text-blue-600 hover:text-blue-800" to="/Login">Login here</Link>
        </p>
      </form>
    </AuthLayout>
  )
}
