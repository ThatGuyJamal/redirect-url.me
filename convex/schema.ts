import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
	redirects: defineTable({
		user_email: v.string(),
		redirect_url: v.string(),
		redirect_name: v.string(),
		redirect_code: v.string(),
		redirect_lifespan: v.optional(v.number()),
	})
		.index("by_email", ["user_email"])
		.index("by_email_code", ["user_email", "redirect_code"]),
	users: defineTable({
		user_email: v.string(),
		email_verified: v.boolean(),
		is_admin: v.boolean(),
		is_premium: v.boolean(),
	}).index("by_email", ["user_email"]),
});
