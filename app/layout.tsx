import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import DeferredWidgets from "@/components/DeferredWidgets";
import { SiteStructuredData } from "@/components/StructuredData";
import Analytics from "@/components/Analytics";

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
  metadataBase: new URL("https://nashos.ai"),
  title: {
    default:
      "NashOS — Agentic Finance | Reports in days, forecasts in minutes",
    template: "%s · NashOS",
  },
  description:
    "The agentic FP&A platform for modern finance teams. Get monthly reports in days, run 15 forecast algorithms, and ask AI agents in plain English. Built for teams switching from Anaplan, Adaptive, Oracle EPM, OneStream, SAP BPC, Vena, Cube, or Excel.",
  keywords: [
    "agentic FP&A platform",
    "FP&A software",
    "financial close software",
    "faster financial close",
    "AI FP&A",
    "AI financial planning",
    "Anaplan alternative",
    "Adaptive Planning alternative",
    "Excel FP&A replacement",
    "month-end close software",
    "financial forecasting software",
    "driver-based planning",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "NashOS — Agentic Finance",
    description:
      "Reports in days, not weeks. Forecasts in minutes. The agentic FP&A platform for modern finance teams.",
    url: "https://nashos.ai",
    siteName: "NashOS",
    // OG image is generated dynamically by app/opengraph-image.tsx
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NashOS — Agentic Finance",
    description: "Reports in days, not weeks. Forecasts in minutes.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${jetbrainsMono.variable}`}>
      <body className="font-body bg-surface-0 text-slate-900 antialiased">
        <SiteStructuredData />
        <Nav />
        <main className="pt-16">{children}</main>
        <Footer />
        <DeferredWidgets />
        <Analytics />
      </body>
    </html>
  );
}
