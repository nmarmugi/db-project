'use client';

import { ContextUser } from "@/components/providers/ProviderUser";
import CardBTV from "@/components/ui/Card";
import StarRating from "@/components/ui/StarRating";
import { Flex, Progress, Skeleton, Text, Tooltip } from "@chakra-ui/react";
import { useContext } from "react";

export default function Carousel() {
	const context = useContext(ContextUser);
	
	if (!context || !context.user) {
		return (
			<Flex gap={5} className="flex-wrap" justify='center'>
				<Skeleton w='190px' h='108px' className="rounded-md" />
				<Skeleton w='190px' h='108px' className="rounded-md" />
				<Skeleton w='190px' h='108px' className="rounded-md" />
				<Skeleton w='190px' h='108px' className="rounded-md" />
				<Skeleton w='190px' h='108px' className="rounded-md" />
				<Skeleton w='190px' h='108px' className="rounded-md" />
			</Flex>
		);
	}

	const {user} = context;

	return (
		<Flex gap={5} w='100%' className="flex-wrap" justify='center'>
			<CardBTV className="w-[190px]">
				<Flex direction='column' gap={2}>
					<Text className="text-xl text-bold">Your Rate</Text>
					<StarRating defaultValue={user.level} size="24px" />
				</Flex>
			</CardBTV>
			<CardBTV className="w-[190px]">
				<Flex direction='column' gap={2}>
					<Text className="text-xl text-bold">Your XP</Text>
					<Progress value={user.xp} width="140px" className="rounded-md" />
				</Flex>
			</CardBTV>
			<CardBTV className="w-[190px]">
				<Flex direction='column' gap={2}>
					<Text className="text-xl text-bold">Your Wins</Text>
					<Text className="text-2xl text-bold">{user.wins}</Text>
				</Flex>
			</CardBTV>
			<CardBTV className="w-[190px]">
				<Flex direction='column' gap={2}>
					<Text className="text-xl text-bold">Your Defeats</Text>
					<Text className="text-2xl text-bold">{user.defeats}</Text>
				</Flex>
			</CardBTV>
			<CardBTV className="w-[190px]">
				<Flex direction='column' gap={2}>
					<Text className="text-xl text-bold">Your Username</Text>
					<Tooltip label={user.username}>
						<Text className="text-2xl font-bold">{user.username.length > 10 ? `${user.username.slice(0, 10)}...` : user.username}</Text>
					</Tooltip>
				</Flex>
			</CardBTV>
			<CardBTV className="w-[190px]">
				<Flex direction='column' gap={2}>
					<Text className="text-xl text-bold">Created at</Text>
					<Text className="text-2xl font-bold">{new Date(user.created_at).toLocaleDateString()}</Text>
				</Flex>
			</CardBTV>
		</Flex>
	);
}
