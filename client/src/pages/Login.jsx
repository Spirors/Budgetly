import { useState } from 'react'
import axios from 'axios'

export default function Login() {
  const [data, setData] = useState({
    email: '',
    password: ''
  })

  const loginUser = async (e) => {
    e.preventDefault()
    axios.get('/')
  }

  return (
    <div>
      <form onSubmit={loginUser}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" placeholder='enter email' value={data.email} onChange={(e) => setData({...data, email: e.target.value})} required />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" placeholder='enter password' value={data.password} onChange={(e) => setData({...data, password: e.target.value})} required />

        <button type="submit">Login</button>
      </form>
    </div>
  )
}
