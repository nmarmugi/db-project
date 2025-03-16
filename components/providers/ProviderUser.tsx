'use client';

import { getUserProfiles } from '@/app/actions';
import { createContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: number;
  user_id: string;
  username: string;
  level: number;
  created_at: string;
  updated_at: string;
  xp: number;
  wins: number;
  defeats: number;
}

interface ContextUserType {
  user: User | null;
  setUser: (user: User) => void;
}

export const ContextUser = createContext<ContextUserType | null>(null);

interface ContextUserProviderProps {
  children: ReactNode;
}

export const ContextUserProvider = ({ children }: ContextUserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUserProfiles();
      setUser(userData);
    };
    fetchUser();
  }, []);

  return (
    <ContextUser.Provider value={{ user, setUser }}>
      {children}
    </ContextUser.Provider>
  );
};