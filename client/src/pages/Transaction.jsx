import React from 'react';

import DashboardLayout from '../components/Dashboard/DashboardLayout';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

export default function Transaction() {
  const { user } = useContext(UserContext)

  return (
    <DashboardLayout>
      <h1 className="text-2xl pl-4 font-semibold">Transaction</h1>
    </DashboardLayout>
  );
}