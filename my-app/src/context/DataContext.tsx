"use client"

import { createContext, useContext, ReactNode, useState, useEffect, useCallback } from "react";
import { useUserContext } from "./UserContext";

export interface Budget {
  id: string;
  userId: string;
  name: string;
  max: number;
}

export interface Transaction {
  id: string;
  userId: string;
  budgetName: string;
  amount: number;
  date: string;
  description: string;
}

interface DataContextType {
  budgets: Budget[];
  transactions: Transaction[];
  fetchBudgets: () => Promise<void>;
  fetchTransactions: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
  resetData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

interface DataContextProviderProps {
  children: ReactNode;
}

export function DataContextProvider({ children }: DataContextProviderProps) {
  const { user, isAuthenticated } = useUserContext();
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetData = useCallback(() => {
    setBudgets([]);
    setTransactions([]);
    setError(null);
  }, []);

  const fetchBudgets = useCallback(async () => {
    if (!isAuthenticated || !user) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/budgets?userId=${user.id}`);
      if (!response.ok) throw new Error('Failed to fetch budgets');
      const data = await response.json();
      setBudgets(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Budget fetch failed');
      console.error("Budget fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [user, isAuthenticated]);

  const fetchTransactions = useCallback(async () => {
    if (!isAuthenticated || !user) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/transactions?userId=${user.id}`);
      if (!response.ok) throw new Error('Failed to fetch transactions');
      const data = await response.json();
      setTransactions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Transaction fetch failed');
      console.error("Transaction fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [user, isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchBudgets();
      fetchTransactions();
    } else {
      resetData();
    }
  }, [isAuthenticated, fetchBudgets, fetchTransactions, resetData]);

  const value = {
    budgets,
    transactions,
    fetchBudgets,
    fetchTransactions,
    isLoading,
    error,
    resetData,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

export function useDataContext() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useDataContext must be used within a DataContextProvider');
  }
  return context;
}