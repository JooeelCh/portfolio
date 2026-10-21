"use client"

import { useEffect } from "react"
import { clearPendingTarget, replaceHash, setPendingTarget } from "@/lib/hash"

const normalize = (path: string) => path.replace(/\/$/, "") || "/"

export default function HashScroll() {
    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            if (e.defaultPrevented || e.button !== 0) return
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
            if (!(e.target instanceof Element)) return

            const anchor = e.target.closest("a")
            if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return

            const url = new URL(anchor.href, window.location.href)
            if (url.origin !== window.location.origin || !url.hash) return
            if (normalize(url.pathname) !== normalize(window.location.pathname)) return

            const id = decodeURIComponent(url.hash.slice(1))
            const target = document.getElementById(id)
            if (!target) return

            e.preventDefault()
            const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
            setPendingTarget(id)
            target.scrollIntoView({ behavior: reduceMotion ? "instant" : "smooth", block: "start" })
            replaceHash(id)
        }

        const cancel = () => clearPendingTarget()

        document.addEventListener("click", onClick, true)
        window.addEventListener("wheel", cancel, { passive: true })
        window.addEventListener("touchstart", cancel, { passive: true })
        window.addEventListener("keydown", cancel)

        return () => {
            document.removeEventListener("click", onClick, true)
            window.removeEventListener("wheel", cancel)
            window.removeEventListener("touchstart", cancel)
            window.removeEventListener("keydown", cancel)
        }
    }, [])

    return null
}