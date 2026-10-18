"use client"

import { useState } from "react"
import { useLocale } from "next-intl"
import { Link, usePathname } from "@/i18n/navigation"
import { routing } from "@/i18n/routing"
import { SlideSwitchFace, slideSwitchClass } from "./slideswitch"

export default function LanguageSwitcher() {
    const locale = useLocale()
    const pathname = usePathname()
    const [pending, setPending] = useState<{ from: string; to: string } | null>(null)

    const [first, second] = routing.locales
    const other = locale === first ? second : first

    const shown = pending && pending.from === locale ? pending.to : locale
    const isEnd = shown === second

    const otherName = new Intl.DisplayNames([other], { type: "language" }).of(other)

    return (
        <Link
            href={pathname}
            locale={other}
            lang={other}
            hrefLang={other}
            aria-label={otherName}
            onClick={() => setPending({ from: locale, to: other })}
            className={slideSwitchClass}
        >
            <SlideSwitchFace
                thumbClassName={isEnd ? "translate-x-full" : undefined}
                start={first}
                end={second}
                startClassName={isEnd ? "text-foreground/60" : "text-background"}
                endClassName={isEnd ? "text-background" : "text-foreground/60"}
            />
        </Link>
    )
}