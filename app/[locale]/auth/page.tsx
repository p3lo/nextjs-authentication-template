"use client"

import { useTranslations } from "next-intl"
import { useRouter } from "@/app/i18n/navigation"
import { useState } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { authClient } from "@/lib/auth-client"

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
	const t = useTranslations("auth")
	const tCommon = useTranslations("common")

	const handleSignIn = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)
		setError(null)
		try {
			const { data: _, error } = await authClient.signIn.email({
				email: signInForm.email,
				password: signInForm.password,
			})
			if (error) {
				setError(error.message || t("signInFailed"))
			} else {
				router.push("/dashboard")
			}
		} catch (err) {
			setError(err instanceof Error ? err.message : t("signInFailed"))
		} finally {
			setLoading(false)
		}
	}

	const handleSignUp = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)
		setError(null)
		try {
			const { data: _, error } = await authClient.signUp.email({
				name: signUpForm.name,
				email: signUpForm.email,
				password: signUpForm.password,
			})
			if (error) {
				setError(error.message || t("signUpFailed"))
			} else {
				router.push("/auth")
			}
		} catch (err) {
			setError(err instanceof Error ? err.message : t("signUpFailed"))
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle>{t("title")}</CardTitle>
					<CardDescription>{t("description")}</CardDescription>
				</CardHeader>
				<CardContent>
					<Tabs defaultValue="signin" className="w-full">
						<TabsList className="grid w-full grid-cols-2">
							<TabsTrigger value="signin">{t("signIn")}</TabsTrigger>
							<TabsTrigger value="signup">{t("signUp")}</TabsTrigger>
						</TabsList>

						<TabsContent value="signin">
							<form onSubmit={handleSignIn} className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="signin-email">{tCommon("email")}</Label>
									<Input
										id="signin-email"
										name="email"
										type="email"
										placeholder={t("emailPlaceholder")}
										value={signInForm.email}
										onChange={(e) => setSignInForm({ ...signInForm, email: e.target.value })}
										required
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="signin-password">{tCommon("password")}</Label>
									<Input
										id="signin-password"
										name="password"
										type="password"
										placeholder={t("passwordPlaceholder")}
										value={signInForm.password}
										onChange={(e) => setSignInForm({ ...signInForm, password: e.target.value })}
										required
									/>
								</div>
								<Button type="submit" className="w-full" disabled={loading}>
									{loading ? t("signingIn") : t("signIn")}
								</Button>
							</form>
						</TabsContent>

						<TabsContent value="signup">
							<form onSubmit={handleSignUp} className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="signup-name">{tCommon("name")}</Label>
									<Input
										id="signup-name"
										name="name"
										type="text"
										placeholder={t("namePlaceholder")}
										value={signUpForm.name}
										onChange={(e) => setSignUpForm({ ...signUpForm, name: e.target.value })}
										required
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="signup-email">{tCommon("email")}</Label>
									<Input
										id="signup-email"
										name="email"
										type="email"
										placeholder={t("emailPlaceholder")}
										value={signUpForm.email}
										onChange={(e) => setSignUpForm({ ...signUpForm, email: e.target.value })}
										required
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="signup-password">{tCommon("password")}</Label>
									<Input
										id="signup-password"
										name="password"
										type="password"
										placeholder={t("confirmPasswordPlaceholder")}
										value={signUpForm.password}
										onChange={(e) => setSignUpForm({ ...signUpForm, password: e.target.value })}
										required
										minLength={6}
									/>
								</div>
								<Button type="submit" className="w-full" disabled={loading}>
									{loading ? t("creatingAccount") : t("signUp")}
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
