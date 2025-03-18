'use client';

import { getUserProfiles } from '@/app/actions';
import { createContext, useState, useEffect, ReactNode } from 'react';

export interface FriendRequests {
  status: string;
  sender_id: string;
  receiver_id: string;
}

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
  sent_friend_requests: FriendRequests[] | null;
  received_friend_requests: FriendRequests[] | null;
}

interface ContextUserType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
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