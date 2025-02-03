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
      <h1 className="text-3xl font-bold mb-8 text-center">Signup</h1>
      <form onSubmit={signupUser} className="space-y-6">
        <div>
          <label className="block mb-2 text-base font-medium text-gray-700">Username</label>
          <input
            type="text"
            value={data.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}
            className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block mb-2 text-base font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block mb-2 text-base font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <button type="submit" className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Signup
        </button>

        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link className="underline text-blue-600 hover:text-blue-800" to="/login">Login here</Link>
        </p>
      </form>
    </AuthLayout>
  );
}