'use client';

import { ContextUser } from "@/components/providers/ProviderUser";
import { Flex} from "@chakra-ui/react";
import { useContext} from "react";
import UpdateUsername from "./UpdateUsername";
import UpdateBirthDate from "./UpdateBirthDate";

export default function UserData() {
  const context = useContext(ContextUser);

  if (!context || !context.user) {
    return <div>Loading...</div>;
  }

  const { user } = context;

  return (
    <Flex gap={5} direction='column'>
      <UpdateUsername user={user} />
      <UpdateBirthDate user={user} />
    </Flex>
  );
}
