import Database from "better-sqlite3"
import { drizzle } from "drizzle-orm/better-sqlite3"
import * as schema from "./schema"

const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
	throw new Error("DATABASE_URL must be set")
}

let _db: ReturnType<typeof drizzle> | null = null

export const getDb = () => {
	if (!_db) {
		console.log("Connecting to database at:", databaseUrl)
		const sqlite = new Database(databaseUrl)
		_db = drizzle({ client: sqlite, schema })
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
