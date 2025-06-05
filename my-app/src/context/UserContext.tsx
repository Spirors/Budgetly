"use client"

import { createContext, useState, ReactNode, useContext, useEffect } from "react";
import { supabase } from "@/utils/supabase_temp";

/**
 * UserContext.tsx
 * 
 * Manages user authentication state and user profile information.
 * Provides login, logout, and user session management.
 */

export interface User {
  id: string;
  username: string;
  email: string;
  // Add other user properties as needed
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserContextProviderProps {
  children: ReactNode;
}

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [user, _setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Wrapped setter for potential future logic
  const setUser = (user: User | null) => {
    _setUser(user);
  };

  // Keep user logged in by checking session on mount
  useEffect(() => {
    const getSession = async () => {
      setLoading(true);
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        _setUser({
          id: data.user.id,
          email: data.user.email ?? "",
          username: data.user.user_metadata?.username ?? "",
        });
      } else {
        _setUser(null);
      }
      setLoading(false);
    };
    getSession();

    // Listen for auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        _setUser({
          id: session.user.id,
          email: session.user.email ?? "",
          username: session.user.user_metadata?.username ?? "",
        });
      } else {
        _setUser(null);
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const value = {
    user,
    setUser,
    isAuthenticated: !!user,
    loading,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserContextProvider');
  }
  return context;
}