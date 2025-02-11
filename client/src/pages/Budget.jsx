import React from 'react';

import DashboardLayout from '../components/Dashboard/DashboardLayout';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

export default function Budget() {
  const { user } = useContext(UserContext)

  return (
    <DashboardLayout>
      <h1 className="text-2xl pl-4 font-semibold">Budget</h1>
    </DashboardLayout>
  );
}