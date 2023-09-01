import { Id } from "@/convex/_generated/dataModel";

export type IRedirect =
	| {
			readonly _id: Id<"redirects">;
			readonly _creationTime: number;
			readonly user_email: string;
			readonly redirect_url: string;
			readonly redirect_name: string;
			redirect_lifespan?: number;
			readonly redirect_code: string;
	  }
	| undefined;

export type IRedirectEdit = {
	readonly _id: Id<"redirects">
	readonly redirect_url: string;
	readonly redirect_name: string;
	readonly redirect_lifespan?: number;
};

// A simplified version of the Clerk User type
export type PartialClerkUser =
	| {
			readonly id: string;
			readonly primaryEmailAddress: PartialClerkEmail | null;
			readonly username: string | null;
			readonly fullName: string | null;
			readonly firstName: string | null;
			readonly lastName: string | null;
			readonly imageUrl: string;
			readonly hasImage: boolean;
			readonly hasVerifiedEmailAddress: boolean;
	  }
	| undefined;

type PartialClerkEmail = {
	readonly id: string;
	readonly emailAddress: string;
};

export type CreateRedirectFormState = {
	name: string;
	link: string;
	lifespan?: number;
};
