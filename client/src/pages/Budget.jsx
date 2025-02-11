import React from 'react';

import DashboardLayout from '../components/Dashboard/DashboardLayout';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

export default function Budget() {
  const { user } = useContext(UserContext)

  return (
    <DashboardLayout>
    </DashboardLayout>
  );
}