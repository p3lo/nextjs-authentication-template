"use client"

import { useState } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { signIn, signUp } from "../actions"
import { useRouter } from "next/navigation"

interface SignInForm {
	email: string
	password: string
}

interface SignUpForm {
	name: string
	email: string
	password: string
}

export default function AuthPage() {
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)
	const [signInForm, setSignInForm] = useState<SignInForm>({ email: "", password: "" })
	const [signUpForm, setSignUpForm] = useState<SignUpForm>({ name: "", email: "", password: "" })
	const router = useRouter()

	const handleSignIn = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)
		setError(null)
		try {
			const formData = new FormData()
			formData.append("email", signInForm.email)
			formData.append("password", signInForm.password)
			const result = await signIn(formData)
			if (result?.success) {
				router.push("/dashboard")
			}
		} catch (err) {
			setError(err instanceof Error ? err.message : "Sign in failed")
		} finally {
			setLoading(false)
		}
	}

	const handleSignUp = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)
		setError(null)
		try {
			const formData = new FormData()
			formData.append("name", signUpForm.name)
			formData.append("email", signUpForm.email)
			formData.append("password", signUpForm.password)
			const result = await signUp(formData)
			if (result?.success) {
				router.push("/auth")
			}
		} catch (err) {
			setError(err instanceof Error ? err.message : "Sign up failed")
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle>Authentication</CardTitle>
					<CardDescription>Sign in to your account or create a new one</CardDescription>
				</CardHeader>
				<CardContent>
					<Tabs defaultValue="signin" className="w-full">
						<TabsList className="grid w-full grid-cols-2">
							<TabsTrigger value="signin">Sign In</TabsTrigger>
							<TabsTrigger value="signup">Sign Up</TabsTrigger>
						</TabsList>

						<TabsContent value="signin">
							<form onSubmit={handleSignIn} className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="signin-email">Email</Label>
									<Input
										id="signin-email"
										name="email"
										type="email"
										placeholder="Enter your email"
										value={signInForm.email}
										onChange={(e) => setSignInForm({ ...signInForm, email: e.target.value })}
										required
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="signin-password">Password</Label>
									<Input
										id="signin-password"
										name="password"
										type="password"
										placeholder="Enter your password"
										value={signInForm.password}
										onChange={(e) => setSignInForm({ ...signInForm, password: e.target.value })}
										required
									/>
								</div>
								<Button type="submit" className="w-full" disabled={loading}>
									{loading ? "Signing in..." : "Sign In"}
								</Button>
							</form>
						</TabsContent>

						<TabsContent value="signup">
							<form onSubmit={handleSignUp} className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="signup-name">Name</Label>
									<Input
										id="signup-name"
										name="name"
										type="text"
										placeholder="Enter your name"
										value={signUpForm.name}
										onChange={(e) => setSignUpForm({ ...signUpForm, name: e.target.value })}
										required
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="signup-email">Email</Label>
									<Input
										id="signup-email"
										name="email"
										type="email"
										placeholder="Enter your email"
										value={signUpForm.email}
										onChange={(e) => setSignUpForm({ ...signUpForm, email: e.target.value })}
										required
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="signup-password">Password</Label>
									<Input
										id="signup-password"
										name="password"
										type="password"
										placeholder="Create a password"
										value={signUpForm.password}
										onChange={(e) => setSignUpForm({ ...signUpForm, password: e.target.value })}
										required
										minLength={6}
									/>
								</div>
								<Button type="submit" className="w-full" disabled={loading}>
									{loading ? "Creating account..." : "Sign Up"}
								</Button>
							</form>
						</TabsContent>
					</Tabs>

					{error && (
						<Alert className="mt-4" variant="destructive">
							<AlertDescription>{error}</AlertDescription>
						</Alert>
					)}
				</CardContent>
			</Card>
		</div>
	)
}
