import { Link } from "@/app/i18n/navigation"
import { getTranslations } from "next-intl/server"
import { getSession, signOut } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default async function Home() {
	const session = await getSession()
	const t = await getTranslations("home")
	const tCommon = await getTranslations("common")

	return (
		<div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle>{t("title")}</CardTitle>
					<CardDescription>
						{session ? t("welcomeBack", { name: session.user.name }) : t("signInPrompt")}
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					{session ? (
						<div className="space-y-4">
							<p className="text-muted-foreground text-sm">{t("loggedInAs", { email: session.user.email })}</p>
							<div className="flex space-x-2">
								<Link href="/dashboard">
									<Button variant="default" className="flex-1">
										{t("goToDashboard")}
									</Button>
								</Link>
								<form action={signOut} className="flex-1">
									<Button variant="outline" type="submit" className="w-full">
										{tCommon("logout")}
									</Button>
								</form>
							</div>
						</div>
					) : (
						<div className="space-y-4">
							<p className="text-muted-foreground text-sm">{t("dashboardAccess")}</p>
							<Link href="/auth">
								<Button variant="default" className="w-full">
									{t("loginRegister")}
								</Button>
							</Link>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	)
}
