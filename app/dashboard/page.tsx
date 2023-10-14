"use client";

import RedirectsTable from "@/components/RedirectsTable";
import CreateRedirectForm from "@/components/forms/CreateRedirectForm";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
	const { user } = useUser();

	const email = user?.primaryEmailAddress?.emailAddress

	const redirects = useQuery(api.redirects.getAll, {
		user_email: email ? email : "skip",
	});

	const isPremium =
		useQuery(api.user.get, {
			user_email: email ? email : "skip",
		})?.is_premium ?? false;

	return (
		<>
			<div className="min-h-screen lg:py-20">
				<div className="mx-auto p-8">
					<CreateRedirectForm isPremium={isPremium} user={user!} />
					<RedirectsTable redirects={redirects ?? []}username={user?.username} isPremium={isPremium}/>
				</div>
			</div>
		</>
	);
};

export default page;
