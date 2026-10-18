import * as rootParams from "next/root-params"
import { notFound } from "next/navigation"
import { hasLocale } from "next-intl"
import { getRequestConfig } from "next-intl/server"
import { routing } from "@/i18n/routing"

export default getRequestConfig(async ({ locale: explicitLocale }) => {
    const candidate = explicitLocale ?? (await rootParams.locale())

    if (!hasLocale(routing.locales, candidate)) notFound()

    return { locale: candidate, messages: (await import(`../../messages/${candidate}.json`)).default }
})
