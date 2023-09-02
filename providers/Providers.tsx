import { ClerkProvider } from "@clerk/nextjs";
import { FC } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Toaster } from "react-hot-toast";
import ErrorFallBack from "@/components/ErrorFallBack";
import AnalyticsProvider from "./AnalyticsProvider";
import ConvexClientProvider from "./ConvexClientProvider";
import NextUiProvider from "./NextUiProvider";

interface indexProps {
	children: React.ReactNode;
}

const ProviderIndex: FC<indexProps> = ({ children }) => {
	return (
		<ClerkProvider
			afterSignInUrl="/"
			afterSignUpUrl="/dashboard"
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
			<ErrorBoundary FallbackComponent={ErrorFallBack}>
				<ConvexClientProvider>
					<NextUiProvider>{children}</NextUiProvider>
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
		</ClerkProvider>
	);
};

export default ProviderIndex;
