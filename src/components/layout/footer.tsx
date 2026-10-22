import { ArrowUp } from "lucide-react"
import { getTranslations } from "next-intl/server"

import { socialLinks } from "@/content/socials"
import { Link } from "@/i18n/navigation"
const links = ["about", "stack", "projects", "contact"] as const

const interactive =
    "rounded-sm text-foreground/60 outline-none transition-colors hover:text-foreground " +
    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 " +
    "focus-visible:ring-offset-background motion-reduce:transition-none"

export async function Footer() {
    const t = await getTranslations("Footer")
    const tNav = await getTranslations("Navbar")
    const year = new Date().getFullYear()

    return (
        <footer className="glass-surface relative z-10 -mt-12 border-t px-6 py-4 text-sm text-foreground/60 md:-mt-17">
            <div className="flex flex-col items-center gap-6 md:grid md:grid-cols-[1fr_auto_1fr] md:gap-4">
                <div className="flex flex-col items-center gap-1 text-center md:items-start md:text-left">
                    <p>{t("copyright", { year })}</p>
                </div>

                <nav aria-label={t("navLabel")} className="md:justify-self-center">
                    <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
                        {links.map((id) => (
                            <li key={id}>
                                <Link href={`/#${id}`} className={`py-1 ${interactive}`}>
                                    {tNav(id)}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="flex items-center gap-4 md:justify-self-end">
                    <ul aria-label={t("socialLabel")} className="flex items-center gap-1">
                        {socialLinks.map(({ id, href, Icon, external }) => (
                            <li key={id}>
                                <a
                                    href={href}
                                    aria-label={t(`social.${id}`)}
                                    {...(external
                                        ? { target: "_blank", rel: "noopener noreferrer" }
                                        : {})}
                                    className={`inline-flex size-9 items-center justify-center ${interactive}`}
                                >
                                    <Icon aria-hidden className="size-5" />
                                </a>
                            </li>
                        ))}
                    </ul>

                    <span aria-hidden className="h-5 w-px bg-foreground/20" />

                    <Link href="/#hero" className={`inline-flex items-center gap-2 px-1 py-2 ${interactive}`}>
                        <ArrowUp aria-hidden className="size-4" />
                        <span className="hidden sm:inline">{t("backToTop")}</span>
                        <span className="sr-only sm:hidden">{t("backToTop")}</span>
                    </Link>
                </div>
            </div>
        </footer>
    )
}