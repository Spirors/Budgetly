import { useContext } from 'react'

import { UserContext } from '../../context/UserContext'
import DashboardLayout from '../components/ui/DashboardLayout';
import Header from '../components/ui/Header';

export default function Dashboard() {
  const { user } = useContext(UserContext)
  return (
    <DashboardLayout>
      <Header title="Dashboard">
        {!!user && (<h2 className="text-white">Welcome, {user.username}!</h2>)}
      </Header>
    </DashboardLayout>
  )
}
