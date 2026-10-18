import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

// La "tecla": una píldora que se hunde 2px al presionar mientras su sombra se achica
export const slideSwitchClass = cn(
    "group/switch relative inline-flex shrink-0 items-center rounded-full p-0.5",
    "border border-foreground/15 bg-foreground/5",
    "shadow-[0_2px_0_0] shadow-foreground/15",
    "transition-[transform,box-shadow] duration-100",
    "active:translate-y-0.5 active:shadow-[0_0_0_0]",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground",
    "motion-reduce:transition-none"
)

const slotClass =
    "relative z-10 grid size-7 place-items-center text-xs font-medium uppercase transition-colors duration-300 motion-reduce:transition-none"

type SlideSwitchFaceProps = {
    start: ReactNode
    end: ReactNode
    thumbClassName?: string
    startClassName?: string
    endClassName?: string
}

export function SlideSwitchFace({
    start,
    end,
    thumbClassName,
    startClassName,
    endClassName,
}: SlideSwitchFaceProps) {
    return (
        <>
            <span
                aria-hidden
                className={cn(
                    "absolute left-0.5 top-0.5 size-7 rounded-full bg-foreground",
                    "transition-transform duration-300 ease-out motion-reduce:transition-none",
                    "group-active/switch:scale-90",
                    thumbClassName
                )}
            />
            <span className={cn(slotClass, startClassName)}>{start}</span>
            <span className={cn(slotClass, endClassName)}>{end}</span>
        </>
    )
}