import "../styles/globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { ErrorBoundary } from "react-error-boundary";
import { ClerkProvider, auth } from "@clerk/nextjs";

import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";
import ConvexClientProvider from "@/providers/ConvexClientProvider";
import { Toaster } from "react-hot-toast";
import ErrorFallBack from "@/components/ErrorFallBack";
import AnalyticsProvider from "@/providers/AnalyticsProvider";


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
		<html lang="en" suppressHydrationWarning={true}>
			<ClerkProvider
				appearance={{
					variables: { colorPrimary: "#000000" },
					elements: {
						formButtonPrimary:
							"bg-black border border-black border-solid hover:bg-white hover:text-black",
						socialButtonsBlockButton:
							"bg-white border-gray-200 hover:bg-transparent hover:border-black text-gray-600 hover:text-black",
						socialButtonsBlockButtonText: "font-semibold",
						formButtonReset:
							"bg-white border border-solid border-gray-200 hover:bg-transparent hover:border-black text-gray-500 hover:text-black",
						membersPageInviteButton:
							"bg-black border border-black border-solid hover:bg-white hover:text-black",
						card: "bg-[#fafafa]",
					},
				}}>
				<body className={inter.className + " bg-zinc-900 text-white"}>
					<ErrorBoundary FallbackComponent={ErrorFallBack}>
						<ConvexClientProvider>
							<Header isAuth={isAuthenticated} />
							<main>{children}</main>
							<Footer />
						</ConvexClientProvider>
					</ErrorBoundary>
					<Toaster
						position="top-center"
						reverseOrder={false}
						gutter={8}
						containerClassName=""
						containerStyle={{}}
						toastOptions={{
							// default options
							className: "",
							duration: 5000,
							style: {
								background: "#363636",
								color: "#fff",
							},
							success: {
								duration: 3000,
							},
							loading: {
								duration: 5000,
							},
						}}
					/>
					<AnalyticsProvider />
				</body>
			</ClerkProvider>
		</html>
	);
}
