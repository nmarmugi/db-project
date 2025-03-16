'use client';

import { ContextUser } from "@/components/providers/ProviderUser";
import { Text, Flex, Skeleton, Input} from "@chakra-ui/react";
import { useContext} from "react";
import UpdateUsername from "./UpdateUsername";

export default function UserData() {
  const context = useContext(ContextUser);

  if (!context || !context.user) {
    return (
      <Flex gap={3}>
        <Skeleton>
          <Text>Username</Text>
        </Skeleton>
        <Skeleton>
          <Input />
        </Skeleton>
      </Flex>
    );
  }

  const { user } = context;

  return (
    <Flex gap={5} direction='column'>
      <UpdateUsername user={user} />
    </Flex>
  );
}
