'use client';

import { ContextUser } from "@/components/providers/ProviderUser";
import StarRating from "@/components/ui/StarRating";
import { Flex, Text } from "@chakra-ui/react";
import { useContext } from "react";

export default function UserData() {
  const context = useContext(ContextUser);

  if (!context || !context.user) {
    return <div>Loading...</div>;
  }

  const { user } = context;

  return (
    <Flex gap={2}>
      <Text as='span'>Rating</Text>
      <StarRating size={'24px'} defaultValue={user.level} />
    </Flex>
  );
}
