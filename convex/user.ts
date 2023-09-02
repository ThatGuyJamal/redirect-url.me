import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const get = query({
	args: {
		user_email: v.string(),
	},
	handler: async (ctx, args) => {
		return await ctx.db
			.query("users")
			.withIndex("by_email", (q) => q.eq("user_email", args.user_email))
			.unique();
	},
});

export const create = mutation({
	args: {
		user_email: v.string(),
		email_verified: v.boolean(),
		is_admin: v.boolean(),
		is_premium: v.boolean(),
	},
	handler: async (ctx, args) => {
		const { user_email, email_verified, is_admin, is_premium } = args;

		const user = await get(ctx, {
			user_email,
		});

		if (user) throw new Error("User already exists");

		await ctx.db.insert("users", {
			user_email,
			email_verified,
			is_admin,
			is_premium,
		});
	},
});

// Used as an internal function.
// Creates a user if non exist. Does nothing if user exists.
export const createIfNull = mutation({
	args: {
		user_email: v.string(),
		email_verified: v.boolean(),
		is_admin: v.boolean(),
		is_premium: v.boolean(),
	},
	handler: async (ctx, args) => {
		const { user_email, email_verified, is_admin, is_premium } = args;

		const user = await ctx.db
			.query("users")
			.withIndex("by_email", (q) => q.eq("user_email", user_email))
			.unique();

		if (user) return;

		await ctx.db.insert("users", {
			user_email,
			email_verified,
			is_admin,
			is_premium,
		});
	},
});
