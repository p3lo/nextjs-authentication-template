import { createClient } from "@libsql/client"
import { drizzle } from "drizzle-orm/libsql"
import * as schema from "./schema"

const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
	throw new Error("DATABASE_URL must be set")
}

let _db: ReturnType<typeof drizzle> | null = null

export const getDb = () => {
	if (!_db) {
		console.log("Connecting to database at:", databaseUrl)
		const client = createClient({ url: databaseUrl })
		_db = drizzle({ client, schema })
	}
	return _db
}

// Lazy getter for backward compatibility
export const db = new Proxy({} as ReturnType<typeof drizzle>, {
	get(_, prop) {
		const dbInstance = getDb()
		return dbInstance[prop as keyof typeof dbInstance]
	},
})
