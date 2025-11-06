"use client"

import { Languages } from "lucide-react"
import { usePathname, useRouter } from "@/app/i18n/navigation"
import type { routing } from "@/app/i18n/routing"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function LanguageSelector() {
	const router = useRouter()
	const pathname = usePathname()

	const handleLanguageChange = (locale: (typeof routing.locales)[number]) => {
		console.log("Current pathname:", pathname)
		console.log("Switching to locale:", locale)
		router.push(pathname, { locale })
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="icon">
					<Languages className="h-[1.2rem] w-[1.2rem]" />
					<span className="sr-only">Change language</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={() => handleLanguageChange("en")}>🇬🇧 English</DropdownMenuItem>
				<DropdownMenuItem onClick={() => handleLanguageChange("sk")}>🇸🇰 Slovenčina</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
