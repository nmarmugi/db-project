'use client';

import { ContextUser } from "@/components/providers/ProviderUser";
import { useContext } from "react";

export default function UserData() {
  const context = useContext(ContextUser);

  if (!context || !context.user) {
    return <div>Loading...</div>;
  }

  const { user } = context;

  return (
    <div>
      Level {user.level}
    </div>
  );
}
