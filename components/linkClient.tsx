'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { FiHome, FiSettings } from 'react-icons/fi';
import { ContextUser } from "./providers/ProviderUser";

export default function LinkClient() {
    const pathname = usePathname();
    const context = useContext(ContextUser);
  
    if (!context || !context.user) {
      return null;
    }
  
    const { user } = context;
  
    const pendingRequestsCount =
      (user.received_friend_requests ?? []).filter(
        (friendRequest) => friendRequest.status === "pending"
      ).length;
  
    return (
      <>
        {pathname === "/settings" ? (
          <Link href="/userPage">
            <FiHome />
          </Link>
        ) : pathname === "/userPage" ? (
          <Link href="/settings" className="relative">
            {pendingRequestsCount > 0 && <span className="absolute -top-3 -right-3 bg-red-500 w-4 h-4 flex justify-center items-center rounded-full text-[10px]">{pendingRequestsCount}</span>}
            <FiSettings />
          </Link>
        ) : null}
      </>
    );
  }
  