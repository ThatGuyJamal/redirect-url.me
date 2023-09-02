"use client"

import { FC } from "react";
import { NextUIProvider } from "@nextui-org/react";

interface NextUiProviderProps {
	children: React.ReactNode;
}

// The provider from the lib is client side only, so we need to wrap this to work in the SSC layout.tsx file
const NextUiProvider: FC<NextUiProviderProps> = ({ children }) => {
	return <NextUIProvider>{children}</NextUIProvider>;
};

export default NextUiProvider;
