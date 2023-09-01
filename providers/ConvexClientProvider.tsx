"use client";

import { ReactNode, useEffect } from "react";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { useAuth } from "@clerk/nextjs";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

function ClerkConvexAdapter() {
	const { getToken, isSignedIn } = useAuth();

	useEffect(() => {
		if (isSignedIn) {
			convex.setAuth(async () =>
				getToken({ template: "convex", skipCache: true })
			);
		} else {
			convex.clearAuth();
		}
	}, [getToken, isSignedIn]);
	return null;
}

export default function ConvexClientProvider({
	children,
}: {
	children: ReactNode;
}) {
	return (
		<ConvexProviderWithClerk client={convex} useAuth={useAuth}>
			<ClerkConvexAdapter />
			{children}
		</ConvexProviderWithClerk>
	);
}
