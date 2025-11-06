"use client"

import Image from "next/image"
import { Link } from "@/app/i18n/navigation"
import { useRouter } from "@/app/i18n/navigation"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { authClient } from "@/lib/auth-client"

export default function Dashboard() {
	const { data: session, isPending, error } = authClient.useSession()
	const router = useRouter()
	const t = useTranslations("dashboard")
	const tCommon = useTranslations("common")

	const handleSignOut = async () => {
		try {
			await authClient.signOut()
			router.push("/auth")
		} catch (err) {
			console.error("Sign out error:", err)
		}
	}

	if (isPending) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
				<Card className="w-full max-w-md">
					<CardHeader>
						<CardTitle>{tCommon("loading")}</CardTitle>
						<CardDescription>{t("loadingDescription")}</CardDescription>
					</CardHeader>
				</Card>
			</div>
		)
	}

	if (error || !session) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
				<Card className="w-full max-w-md">
					<CardHeader>
						<CardTitle>{t("accessDenied")}</CardTitle>
						<CardDescription>{t("needToBeLoggedIn")}</CardDescription>
					</CardHeader>
					<CardContent>
						<Link href="/auth">
							<Button variant="default" className="w-full">
								{tCommon("goToLogin")}
							</Button>
						</Link>
					</CardContent>
				</Card>
			</div>
		)
	}

	return (
		<div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
			<Card className="w-full max-w-2xl">
				<CardHeader>
					<CardTitle>{t("title")}</CardTitle>
					<CardDescription>{t("welcome", { name: session.user.name })}</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="space-y-4">
						<h3 className="font-medium text-lg">{t("userInformation")}</h3>
						<div className="grid gap-4">
							<div className="flex items-center justify-between rounded-lg bg-muted p-3">
								<span className="font-medium text-sm">{tCommon("name")}</span>
								<span className="text-sm">{session.user.name}</span>
							</div>
							<div className="flex items-center justify-between rounded-lg bg-muted p-3">
								<span className="font-medium text-sm">{tCommon("email")}</span>
								<span className="text-sm">{session.user.email}</span>
							</div>
							<div className="flex items-center justify-between rounded-lg bg-muted p-3">
								<span className="font-medium text-sm">{t("userId")}</span>
								<span className="font-mono text-sm">{session.user.id}</span>
							</div>
							{session.user.image && (
								<div className="flex items-center justify-between rounded-lg bg-muted p-3">
									<span className="font-medium text-sm">{t("profileImage")}</span>
									<Image
										src={session.user.image}
										alt="Profile"
										width={32}
										height={32}
										className="h-8 w-8 rounded-full"
									/>
								</div>
							)}
						</div>
					</div>

					<div className="space-y-4">
						<h3 className="font-medium text-lg">{t("quickActions")}</h3>
						<div className="grid gap-2">
							<Link href="/">
								<Button variant="outline" className="w-full">
									{tCommon("backToHome")}
								</Button>
							</Link>
							<Button variant="destructive" onClick={handleSignOut} className="w-full">
								{tCommon("logout")}
							</Button>
						</div>
					</div>

					<div className="space-y-4">
						<h3 className="font-medium text-lg">{t("accountStatus")}</h3>
						<div className="rounded-lg border border-green-200 bg-green-50 p-4">
							<p className="text-green-800 text-sm">{t("accountActive")}</p>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
