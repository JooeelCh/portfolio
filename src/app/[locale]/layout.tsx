import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import {Bitcount_Single ,Geist, Geist_Mono} from "next/font/google"
import "../globals.css";
import Navbar from "@/components/layout/navbar";
import ThemeProvider from "@/components/layout/themeprovider";
import ThemeRestore from "@/components/layout/themerestore";
import { Toaster } from "sonner";

const bitcount = Bitcount_Single({ subsets: ["latin"], variable: "--font-bitcount", display: "swap" })
const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans", display: "swap" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" })

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale()

  return (
    <html lang={locale} suppressHydrationWarning className={`${bitcount.variable} ${geistSans.variable} ${geistMono.variable} scroll-smooth`} data-scroll-behavior="smooth">
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ThemeRestore />
          <Toaster />
          <NextIntlClientProvider>
            <Navbar/>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}