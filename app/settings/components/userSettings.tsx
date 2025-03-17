'use client';

import { ContextUser } from "@/components/providers/ProviderUser";
import { Text, Flex, Skeleton, Input} from "@chakra-ui/react";
import { useContext} from "react";
import UpdateUsername from "./UpdateUsername";
import ShowUsers from "./showUsers";

export default function UserData() {
  const context = useContext(ContextUser);

  if (!context || !context.user) {
    return (
      <Flex direction='column' gap={5} align='center'>
        <Flex gap={3} align='center'>
          <Skeleton h='20px'>
            <Text>Username</Text>
          </Skeleton>
          <Skeleton>
            <Input />
          </Skeleton>
        </Flex>
        <Flex gap={3} align='center'>
          <Skeleton h='40px' w='100px'></Skeleton>
        </Flex>
      </Flex>
    );
  }

  const { user } = context;

  return (
    <Flex gap={5} direction='column' align='center'>
      <UpdateUsername user={user} />
      <ShowUsers user={user} />
    </Flex>
  );
}
