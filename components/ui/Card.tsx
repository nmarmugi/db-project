import { Card, CardBody } from "@chakra-ui/react";
import { ReactNode } from "react";
import { useTheme } from "next-themes";

interface CardBTVProps {
	children: ReactNode;
	className: string;
}

export default function CardBTV({ children, className }: CardBTVProps) {
	const {theme} = useTheme();
	return (
		<Card className={className} background={theme !== 'dark' && 'black'}>
			<CardBody className={`${theme !== 'dark' && 'text-white'} flex justify-start items-center gap-3`}>
				{children}
			</CardBody>
		</Card>
	);
}
