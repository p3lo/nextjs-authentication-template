import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { nextCookies } from "better-auth/next-js"
import { admin } from "better-auth/plugins"
import { db } from "@/db" // your drizzle instance
import * as schema from "@/db/schema"
export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "sqlite", // or "mysql", "postgres"
		schema: schema,
	}),
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: false,
	},
	baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000",
	plugins: [admin(), nextCookies()],
})
