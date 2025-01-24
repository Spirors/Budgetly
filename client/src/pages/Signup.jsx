import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

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
        setData({})
        toast.success('Signup successful')
        navigate('/login')
      }
    } 
    catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <form onSubmit={signupUser}>
        <label>Username</label>
        <input placeholder='enter username' value={data.username} onChange={(e) => setData({...data, username: e.target.value})} />

        <label>Email</label>
        <input placeholder='enter email' value={data.email} onChange={(e) => setData({...data, email: e.target.value})} />

        <label>Password</label>
        <input type="password" placeholder='enter password' value={data.password} onChange={(e) => setData({...data, password: e.target.value})} />

        <button type="submit">Signup</button>
      </form>
    </div>
  )
}
