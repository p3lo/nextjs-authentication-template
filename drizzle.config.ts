import type { Config } from "drizzle-kit"

const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
	throw new Error("DATABASE_URL environment variable is required")
}

export default {
	schema: "./db/schema/**/*.ts",
	out: "./db/drizzle",
	dialect: "sqlite",
	dbCredentials: {
		url: databaseUrl,
	},
} satisfies Config
