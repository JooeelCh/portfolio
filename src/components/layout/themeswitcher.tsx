"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useTranslations } from "next-intl"
import { SlideSwitchFace, slideSwitchClass } from "./slideswitch"

export default function ThemeSwitcher() {
    const t = useTranslations("Navbar")
    const { resolvedTheme, setTheme } = useTheme()

    return (
        <button
            type="button"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            aria-label={t("themeToggle")}
            className={slideSwitchClass}
        >
            <SlideSwitchFace
                thumbClassName="dark:translate-x-full"
                start={<Sun className="size-4" />}
                end={<Moon className="size-4" />}
                startClassName="text-background dark:text-foreground/60"
                endClassName="text-foreground/60 dark:text-background"
            />
        </button>
    )
}