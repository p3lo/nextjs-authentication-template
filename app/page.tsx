import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getSession, signOut } from "./actions"

export default async function Home() {
	const session = await getSession()

	return (
		<div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle>Welcome to Atrium</CardTitle>
					<CardDescription>
						{session ? `Welcome back, ${session.user.name}!` : "Sign in or create an account to get started"}
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					{session ? (
						<div className="space-y-4">
							<p className="text-muted-foreground text-sm">You are logged in as {session.user.email}</p>
							<div className="flex space-x-2">
								<Link href="/dashboard">
									<Button variant="default" className="flex-1">
										Go to Dashboard
									</Button>
								</Link>
								<form action={signOut} className="flex-1">
									<Button variant="outline" type="submit" className="w-full">
										Logout
									</Button>
								</form>
							</div>
						</div>
					) : (
						<div className="space-y-4">
							<p className="text-muted-foreground text-sm">
								Access your personalized dashboard and manage your account
							</p>
							<Link href="/auth">
								<Button variant="default" className="w-full">
									Login / Register
								</Button>
							</Link>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	)
}
