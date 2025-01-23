import { useState } from 'react'

export default function Signup() {
  const [data, setData] = useState({
    email: '',
    username: '',
    password: ''
  })

  const signupUser = async (e) => {
    e.preventDefault()
  }

  return (
    <div>
      <form onSubmit={signupUser}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" placeholder='enter email' value={data.email} onChange={(e) => setData({...data, email: e.target.value})} required />

        <label htmlFor="username">Username</label>
        <input type="username" id="username" name="username" placeholder='enter username' value={data.username} onChange={(e) => setData({...data, username: e.target.value})} required />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" placeholder='enter password' value={data.password} onChange={(e) => setData({...data, password: e.target.value})} required />

        <button type="submit">Signup</button>
      </form>
    </div>
  )
}
