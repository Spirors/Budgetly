import axios from "axios";
import { createContext, useEffect, useState, useContext } from "react";
import { UserContext } from "./UserContext";

export const DataContext = createContext();

export function DataContextProvider({ children }) {
  const { user } = useContext(UserContext);
  const [budgets, setBudgets] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const fetchBudgets = async () => {
    try {
      const { data } = await axios.get(`/data/getBudgets/${user.id}`);
      setBudgets(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const { data } = await axios.get(`/data/getTransactions/${user.id}`);
      setTransactions(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchBudgets();
      fetchTransactions();
    }
  }, [user]);

  return (
    <DataContext.Provider value={{ budgets, transactions, fetchBudgets, fetchTransactions }}>
      {children}
    </DataContext.Provider>
  );
}