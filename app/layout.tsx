import "../styles/globals.css";

import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { auth } from "@clerk/nextjs";

import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";
import Providers from "@/providers/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "RedirectUrl",
	description: `Create, Share, and Manage Redirect Links`,
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { userId }: { userId: string | null } = auth();

	const isAuthenticated = userId !== null;

	return (
		<html
			lang="en"
			suppressHydrationWarning={true}
			suppressContentEditableWarning={true}>
			<body className={inter.className + " bg-zinc-900 text-white"}>
				<Providers>
					<Header isAuth={isAuthenticated} />
					<main>{children}</main>
					<Footer />
				</Providers>
			</body>
		</html>
	);
}
