import { Flex, Text } from "@chakra-ui/react";
import UserData from "./components/userData";

export default function SettingsPage() {
  return (
    <Flex direction='column' align='center' gap={5} maxW='350px'>
      <Text textAlign='center'>Here you can set your username and date of birth.</Text>
      <UserData />
    </Flex>
  );
}
