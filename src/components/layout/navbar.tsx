"use client"

import { AnimatePresence, MotionConfig, motion } from "motion/react"
import { House } from "lucide-react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { useActiveSection } from "@/lib/hooks/useSection"
import { cn } from "@/lib/utils"
import LanguageSwitcher from "./languageswitcher"
import ThemeSwitcher from "./themeswitcher"
import MobileMenu from "./mobilemenu"

const links = ["about", "stack", "projects", "contact"] as const

const spring = { type: "spring", stiffness: 380, damping: 32 } as const

export default function Navbar() {
    const t = useTranslations("Navbar")
    const { active, ready } = useActiveSection()
    const inHero = active === "hero"
    const items = links.map((id) => ({ id, label: t(id) }))

    return (
        <MotionConfig reducedMotion="user" transition={ready ? spring : { duration: 0 }}>
            <header
                className={cn(
                    "fixed inset-x-0 top-0 z-50 grid grid-cols-[1fr_auto_1fr] items-center border-b px-6 py-4 transition-colors duration-300",
                    inHero
                        ? "border-transparent bg-transparent"
                        : "glass-surface"
                )}
            >
                <div className="col-start-1 row-start-1 justify-self-start">
                    <AnimatePresence initial={false}>
                        {!inHero && (
                            <motion.div
                                key="home"
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -8 }}
                            >
                                <Link
                                    href="/#hero"
                                    aria-label={t("home")}
                                    className="flex gap-1 items-center rounded-md p-1 text-foreground/60 transition-colors hover:text-foreground"
                                >
                                    <House className="size-5" />
                                    <p className="hidden sm:block">{t("home")}</p>
                                </Link>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <motion.nav
                    layout="position"
                    className={cn(
                        "row-start-1 hidden md:block",
                        inHero ? "col-start-1 justify-self-start" : "col-start-2 justify-self-center"
                    )}
                >
                    <ul className="flex gap-8">
                        {links.map((id) => {
                            const isActive = active === id
                            return (
                                <li key={id}>
                                    <Link
                                        href={`/#${id}`}
                                        aria-current={isActive ? "location" : undefined}
                                        className={cn(
                                            "relative py-1 transition-colors",
                                            isActive
                                                ? "text-foreground"
                                                : "text-foreground/60 hover:text-foreground"
                                        )}
                                    >
                                        {t(id)}
                                        {isActive && (
                                            <motion.span
                                                layoutId="nav-underline"
                                                className="absolute inset-x-0 -bottom-0.5 h-px bg-foreground"
                                            />
                                        )}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </motion.nav>

                <div className="col-start-3 row-start-1 flex items-center gap-4 justify-self-end">
                    <ThemeSwitcher />
                    <LanguageSwitcher />
                    <MobileMenu items={items} active={active} />
                </div>
            </header>
        </MotionConfig>
    )
}