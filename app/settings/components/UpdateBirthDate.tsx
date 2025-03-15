import { Flex, useToast, Button} from "@chakra-ui/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FiCheck } from "react-icons/fi";
import { updateBirthday } from "@/app/actions";
import { useState } from "react";
import { User } from "@/components/providers/ProviderUser";

interface FormUpdatesBirthDateProps {
	user: User;
}

export default function UpdateBirthDate({ user }: FormUpdatesBirthDateProps) {
	const toast = useToast();
	const [initialBirthday] = useState(user.date_of_birth || '');
	const [birthday, setBirthday] = useState(user.date_of_birth || '');

	const handleBirthDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const date = e.target.value;
		setBirthday(date.toString().split('T')[0]);
	};

	const handleClickSend = () => {
		try {
			updateBirthday(birthday);
			toast({
				title: "Birthday updated",
				description: "Your birthday has been updated successfully.",
				status: "success",
				duration: 5000,
				isClosable: true,
			});
		} catch (e) {
			toast({
				title: "Error",
				description: "Error updating date of birth.",
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		}
	}

	const isBirthdayChanged = birthday !== initialBirthday;

	return (
		<Flex direction="column" w='383px' gap={3}>
			<Flex align="center" gap={3}>
				<Label className="min-w-[64.59px]" htmlFor="date">Birthday</Label>
				<Input name="text" className="min-w-[203.67px]" type="date" value={birthday} onChange={handleBirthDateChange} />
				{isBirthdayChanged && (
					<Button className='w-[150px]' onClick={handleClickSend} leftIcon={<FiCheck size={20} color="green" />}>
						Send
					</Button>
				)}
			</Flex>
		</Flex>
	);
}
