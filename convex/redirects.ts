import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { createIfNull } from "./user";

export const getAll = query({
	args: {
		user_email: v.string(),
	},
	handler: async (ctx, args) => {
		return await ctx.db
			.query("redirects")
			.withIndex("by_email", (q) => q.eq("user_email", args.user_email))
			.order("desc")
			.collect();
	},
});

export const get = query({
	args: { redirect_code: v.string() },
	handler: async (ctx, args) => {
		const q = await ctx.db
			.query("redirects")
			.filter((q) => q.eq(q.field("redirect_code"), args.redirect_code))
			.unique();

		if (!q) return "not found";

		return q;
	},
});

export const create = mutation({
	args: {
		redirect_name: v.string(),
		redirect_url: v.string(),
		user_email: v.string(),
		user_email_verified: v.boolean(),
		redirect_lifespan: v.optional(v.number()),
		isPremium: v.boolean(),
	},
	handler: async (ctx, args) => {
		const {
			redirect_url,
			user_email,
			redirect_name,
			isPremium,
			user_email_verified,
			redirect_lifespan,
		} = args;

		const getUserRedirects = await ctx.db
			.query("redirects")
			.filter((q) => q.eq(q.field("user_email"), user_email))
			.collect();

		if (getUserRedirects.length > 25 && !isPremium) {
			throw new Error("Max redirects reached");
		}

		await ctx.db.insert("redirects", {
			redirect_name: redirect_name,
			redirect_url,
			user_email,
			redirect_lifespan,
			// Todo - Generate a random code using a better algorithm
			redirect_code: Math.random().toString(36).substring(2, 15),
		});

		await createIfNull(ctx, {
			user_email,
			email_verified: user_email_verified,
			is_admin: false,
			is_premium: false,
		});
	},
});

export const destroy = mutation({
	args: {
		user_email: v.string(),
		id: v.id("redirects"),
	},
	handler: async (ctx, args) => {
		try {
			const user = await ctx.auth.getUserIdentity();

			if (!user) {
				return "Unauthorized";
			}

			const { id, user_email } = args;

			if (user_email !== user.email || !user.emailVerified) {
				return "Unauthorized";
			}

			await ctx.db.delete(id);

			await createIfNull(ctx, {
				user_email,
				email_verified: user.emailVerified,
				is_admin: false,
				is_premium: false,
			});

			return "Success";
		} catch (error) {
			console.log(error);
			return "Error";
		}
	},
});

export const update = mutation({
	args: {
		id: v.id("redirects"),
		redirect_name: v.string(),
		redirect_url: v.string(),
		redirect_lifespan: v.optional(v.number()),
		user_email: v.string(),
		user_email_verified: v.boolean(),
	},
	handler: async (ctx, args) => {
		try {
			const {
				id,
				redirect_name,
				redirect_url,
				redirect_lifespan,
				user_email,
				user_email_verified,
			} = args;

			const doc = await ctx.db.get(id);

			if (!doc) {
				return "Not found";
			}

			await ctx.db.patch(id, {
				redirect_name: redirect_name,
				redirect_url: redirect_url,
				redirect_lifespan: redirect_lifespan,
			});

			await createIfNull(ctx, {
				user_email: user_email,
				email_verified: user_email_verified,
				is_admin: false,
				is_premium: false,
			});

			return "Success";
		} catch (error) {
			console.log(error);
			return "Error";
		}
	},
});
