import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'

export default function Dashboard() {
  const { user } = useContext(UserContext)
  return (
    <div>
      <h1 class="text-3xl font-bold underline">Dashboard</h1>
      {!!user && (<h2>Welcome, {user.username}!</h2>)}
    </div>
  )
}
