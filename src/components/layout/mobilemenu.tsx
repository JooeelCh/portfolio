"use client"

import { useEffect, useState } from "react"
import { Menu } from "lucide-react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { cn } from "@/lib/utils"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

type MobileMenuProps = {
    items: { id: string; label: string }[]
    active: string
}

export default function MobileMenu({ items, active }: MobileMenuProps) {
    const t = useTranslations("Navbar")
    const [open, setOpen] = useState(false)

    // Si la ventana llega al breakpoint md con el menú abierto, se cierra solo
    useEffect(() => {
        const mq = window.matchMedia("(min-width: 768px)")
        const onChange = (e: MediaQueryListEvent) => {
            if (e.matches) setOpen(false)
        }
        mq.addEventListener("change", onChange)
        return () => mq.removeEventListener("change", onChange)
    }, [])

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger>
                <button
                    type="button"
                    aria-label={t("menu")}
                    className="grid size-10 place-items-center rounded-md text-foreground/60 transition-colors hover:text-foreground md:hidden"
                >
                    <Menu className="size-5" />
                </button>
            </SheetTrigger>

            <SheetContent
                side="right"
                closeLabel={t("closeMenu")}
                aria-describedby={undefined}
                className="motion-reduce:animate-none!"
            >
                <SheetHeader className="text-left">
                    <SheetTitle className="font-heading text-sm font-normal uppercase tracking-wider text-foreground/60">
                        {t("menu")}
                    </SheetTitle>
                </SheetHeader>

                <nav aria-label={t("menu")} className="px-4">
                    <ul className="flex flex-col gap-1">
                        {items.map(({ id, label }) => {
                            const isActive = active === id
                            return (
                                <li key={id}>
                                    <SheetClose>
                                        <Link
                                            href={`/#${id}`}
                                            aria-current={isActive ? "location" : undefined}
                                            className={cn(
                                                "flex items-center gap-3 rounded-md py-3 text-2xl transition-colors",
                                                isActive
                                                    ? "text-foreground"
                                                    : "text-foreground/60 hover:text-foreground"
                                            )}
                                        >
                                            <span
                                                aria-hidden
                                                className={cn(
                                                    "h-px w-4 transition-colors",
                                                    isActive ? "bg-foreground" : "bg-transparent"
                                                )}
                                            />
                                            {label}
                                        </Link>
                                    </SheetClose>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
            </SheetContent>
        </Sheet>
    )
}