import { useEffect, useState } from "react"

export const SECTION_IDS = ["hero", "about", "stack", "projects", "contact"] as const
export type SectionId = (typeof SECTION_IDS)[number]

export function useActiveSection() {
    const [active, setActive] = useState<SectionId>("hero")
    const [ready, setReady] = useState(false)

    useEffect(() => {
        const elements = SECTION_IDS
            .map((id) => document.getElementById(id))
            .filter((el): el is HTMLElement => el !== null)
        if (elements.length === 0) return

        // Banda de 1% de alto a ~45% del viewport: la sección que la cruza es la activa
        let first = true
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) setActive(entry.target.id as SectionId)
                }
                if (first) {
                    first = false
                    // "ready" llega un frame después: la primera carga no se anima
                    requestAnimationFrame(() => setReady(true))
                }
            },
            { rootMargin: "-45% 0px -54% 0px" }
        )
        elements.forEach((el) => observer.observe(el))

        // Respaldo: si la última sección es corta, nunca cruza la banda
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

    return { active, ready }
}