import { NextIntlClientProvider } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import {Bitcount_Single ,Geist, Geist_Mono} from "next/font/google"
import Navbar from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import ThemeProvider from "@/components/layout/themeprovider";
import ThemeRestore from "@/components/layout/themerestore";
import { Toaster } from "sonner";
import "../globals.css";

const bitcount = Bitcount_Single({ subsets: ["latin"], variable: "--font-bitcount", display: "swap" })
const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans", display: "swap" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" })

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: "Portfolio - Joel Chubrega",
    description: t("description"),
    openGraph: {
      title: "Portfolio - Joel Chubrega",
      description: t("description"),
    },
  };
}

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
            <Navbar />
            {children}
            <Footer />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}