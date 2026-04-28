import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-dm-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://epmlite.com"),
  title: {
    default: "EPM Lite — AI-native financial planning",
    template: "%s · EPM Lite",
  },
  description:
    "Forecast in minutes, not weeks. Built for finance teams who want plain-English answers, not 12-tab spreadsheets.",
  openGraph: {
    title: "EPM Lite — AI-native financial planning",
    description:
      "Close the books in days. Forecast in minutes. AI-native FP&A for finance leaders tired of Excel gymnastics.",
    url: "https://epmlite.com",
    siteName: "EPM Lite",
    // OG image is generated dynamically by app/opengraph-image.tsx
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EPM Lite — AI-native financial planning",
    description: "Close the books in days. Forecast in minutes.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${jetbrainsMono.variable}`}>
      <body className="font-body bg-surface-0 text-slate-900 antialiased">
        <Nav />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
