"use client"

import { useLayoutEffect } from "react"

export default function ThemeRestore() {
    useLayoutEffect(() => {
        try {
            const stored = localStorage.getItem("theme")
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
            const isDark = stored === "dark" || (stored !== "light" && prefersDark)

            const root = document.documentElement
            root.classList.toggle("dark", isDark)
            root.style.colorScheme = isDark ? "dark" : "light"
        } catch {}
    }, [])

    return null
}