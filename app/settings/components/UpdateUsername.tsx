import { Flex, useToast, Button } from "@chakra-ui/react";
import { SetStateAction, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FiCheck } from "react-icons/fi";
import { updateUsername } from "@/app/actions";
import { User } from "@/components/providers/ProviderUser";

interface FormUpdatesUsernameProps {
	user: User;
	setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export default function UpdateUsername({ user, setUser }: FormUpdatesUsernameProps) {
	const toast = useToast();
	const [initialUsername] = useState(user.username);
	const [username, setUsername] = useState(user.username);

	const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUsername(e.target.value);
	};

	const handleClickSend = () => {
		try {
			updateUsername(username);
			setUser((prevState) => {
				if (!prevState) return null;
				return {
					...prevState,
					username: username,
				};
			});
			toast({
				title: "Username updated",
				description: "Your username has been updated successfully.",
				status: "success",
				duration: 5000,
				isClosable: true,
			});
		} catch (e) {
			toast({
				title: "Error",
				description: "Error updating username.",
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		}
	}

	const isUsernameChanged = username !== initialUsername;

	return (
		<Flex align="center" w='383px' gap={3}>
			<Label htmlFor="text">Username</Label>
			<Input
				name="text"
				type="text"
				placeholder="Your Username"
				value={username}
				onChange={handleUsernameChange}
			/>
			{isUsernameChanged && (
				<Button className='w-[150px]' onClick={handleClickSend} leftIcon={<FiCheck size={20} color="green" />}>
					Send
				</Button>
			)}
		</Flex>
	);
}
