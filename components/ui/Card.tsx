import { Card, CardBody } from "@chakra-ui/react";
import { ReactNode } from "react";
import { useTheme } from "next-themes";

interface CardBTVProps {
	children: ReactNode;
}

export default function CardBTV({ children }: CardBTVProps) {
	const {theme} = useTheme();
	return (
		<Card className="w-[190px]" background={theme !== 'dark' && 'black'}>
			<CardBody className={`${theme !== 'dark' && 'text-white'} flex justify-start items-center gap-3`}>
				{children}
			</CardBody>
		</Card>
	);
}
