import { Flex, Text } from "@chakra-ui/react";
import UserSettings from "./components/userSettings";

export default function SettingsPage() {
  return (
    <Flex direction='column' align='center' gap={5} maxW='350px'>
      <Text textAlign='center'>Here you can update your username.</Text>
      <UserSettings />
    </Flex>
  );
}
