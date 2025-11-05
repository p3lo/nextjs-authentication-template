"use server"

import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"

export async function signUp(formData: FormData) {
	const email = formData.get("email") as string
	const name = formData.get("name") as string
	const password = formData.get("password") as string

	try {
		const result = await auth.api.signUpEmail({
			body: {
				email,
				name,
				password,
			},
			headers: await headers(),
		})
		console.log("Sign up successful:", result)
		return { success: true, result }
	} catch (error) {
		console.error("Sign up error:", error)
		throw error
	}
}

export async function signIn(formData: FormData) {
	const email = formData.get("email") as string
	const password = formData.get("password") as string

	try {
		const result = await auth.api.signInEmail({
			body: {
				email,
				password,
			},
			headers: await headers(),
		})
		console.log("Sign in successful:", result)
		return { success: true, result }
	} catch (error) {
		console.error("Sign in error:", error)
		throw error
	}
}

export async function signOut() {
	try {
		await auth.api.signOut({
			headers: await headers(),
		})
		redirect("/")
	} catch (error) {
		console.error("Sign out error:", error)
		throw error
	}
}

export async function getSession() {
	try {
		const session = await auth.api.getSession({
			headers: await headers(),
		})
		return session
	} catch (error) {
		console.error("Get session error:", error)
		return null
	}
}
