"use client";

import { api } from "@/convex/_generated/api";
import { extractCodeFromPath } from "@/lib/utils";
import { useQuery } from "convex/react";
import { usePathname, useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
	const [isLoading, setIsLoading] = useState(true);

	const pathname = usePathname();
	const router = useRouter();

	const redirectCode = extractCodeFromPath(pathname);

	if (!redirectCode) {
		router.push("/");
		return null;
	}

	const redirect = useQuery(api.redirects.get, {
		redirect_code: redirectCode,
	});

	useEffect(() => {
		if (redirect) {
			setIsLoading(false);
		} else {
			setIsLoading(true);
		}
	}, [redirect]);

	useEffect(() => {
		if (isLoading) {
			// Loading state - wait until isLoading is set to false
			return;
		}

		if ((redirect && redirect === "not found") || !redirect) {
			// Handle errors or missing redirects
			router.push("/");
		} else {
			// Redirect to the fetched URL
			router.push(redirect.redirect_url);
		}
	}, [isLoading, redirect]);

	return (
		<>
			<div className="min-h-screen lg:py-20">Redirecting...</div>
		</>
	);
};

export default page;
