let pendingTarget: string | null = null
let pendingTimer: ReturnType<typeof setTimeout> | undefined

export function setPendingTarget(id: string) {
    pendingTarget = id
    clearTimeout(pendingTimer)
    pendingTimer = setTimeout(() => {
        pendingTarget = null
    }, 1200)
}

export function clearPendingTarget() {
    pendingTarget = null
    clearTimeout(pendingTimer)
}

export function getPendingTarget() {
    return pendingTarget
}

export function replaceHash(id: string) {
    const { pathname, search, hash } = window.location
    const next = id === "hero" ? "" : `#${id}`
    if (hash === next) return
    window.history.replaceState(null, "", `${pathname}${search}${next}`)
}