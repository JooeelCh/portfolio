import { useEffect, useRef, useState } from "react"
import { clearPendingTarget, getPendingTarget, replaceHash } from "@/lib/hash"

export const SECTION_IDS = ["hero", "about", "stack", "projects", "contact"] as const
export type SectionId = (typeof SECTION_IDS)[number]

export function useActiveSection() {
    const [active, setActive] = useState<SectionId>("hero")
    const [ready, setReady] = useState(false)
    const lastSeen = useRef<SectionId | null>(null)

    useEffect(() => {
        const elements = SECTION_IDS
            .map((id) => document.getElementById(id))
            .filter((el): el is HTMLElement => el !== null)
        if (elements.length === 0) return

        let first = true
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) setActive(entry.target.id as SectionId)
                }
                if (first) {
                    first = false
                    requestAnimationFrame(() => setReady(true))
                }
            },
            { rootMargin: "-45% 0px -54% 0px" }
        )
        elements.forEach((el) => observer.observe(el))

        const last = elements[elements.length - 1]
        const onScroll = () => {
            const atBottom =
                window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
            if (atBottom) setActive(last.id as SectionId)
        }
        window.addEventListener("scroll", onScroll, { passive: true })

        return () => {
            observer.disconnect()
            window.removeEventListener("scroll", onScroll)
        }
    }, [])

    useEffect(() => {
        if (!ready) return

        if (lastSeen.current === null) {
            lastSeen.current = active
            return
        }
        if (lastSeen.current === active) return
        lastSeen.current = active

        const pending = getPendingTarget()
        if (pending && pending !== active) return

        clearPendingTarget()
        replaceHash(active)
    }, [active, ready])

    return { active, ready }
}