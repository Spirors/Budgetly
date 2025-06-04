"use client"

import { createContext, useContext, ReactNode, useState, useEffect, useCallback } from "react";
import { useUserContext } from "./UserContext";
import { supabase } from "@/utils/supabase";

export interface Budget {
  id: string;
  userId: string;
  name: string;
  max: number;
  created_at?: string;
}

export interface Transaction {
  id: string;
  userId: string;
  budgetId?: string | null;
  budgetName: string;
  amount: number;
  date: string;
  description: string;
  created_at?: string;
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
      const { data, error } = await supabase
        .from('budgets')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Map supabase fields to Budget interface
      setBudgets(
        (data || []).map((b: any) => ({
          id: b.id,
          userId: b.user_id,
          name: b.name,
          max: Number(b.max),
          created_at: b.created_at,
        }))
      );
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
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (error) throw error;

      setTransactions(
        (data || []).map((t: any) => ({
          id: t.id,
          userId: t.user_id,
          budgetId: t.budget_id,
          budgetName: t.budget_name,
          amount: Number(t.amount),
          date: t.date,
          description: t.description,
          created_at: t.created_at,
        }))
      );
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