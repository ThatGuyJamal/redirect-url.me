"use client"

import { FC } from "react";

interface ErrorFallBackProps {}

const ErrorFallBack: FC<ErrorFallBackProps> = ({}) => {
	return (
		<>
			<div>{"Something went very wrong...I think you broke me :("}</div>
		</>
	);
};

export default ErrorFallBack;
