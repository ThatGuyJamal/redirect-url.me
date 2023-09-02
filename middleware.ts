import { authMiddleware } from "@clerk/nextjs";

// ? See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default authMiddleware({
	// Routes that don't need authentication to access.
	publicRoutes: ["/", /^\/r\/.*/],
});

export const config = {
	matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
