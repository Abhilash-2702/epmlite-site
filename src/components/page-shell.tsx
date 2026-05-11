import { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

// Standard outer chrome for every content page (gold-on-dark theme).
// Wraps SiteHeader + main + SiteFooter; adds the soft gold radial glow that
// sits behind every page hero.
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-hidden">
      <SiteHeader />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] h-[600px] w-[600px] rounded-full"
        style={{ background: "var(--gradient-radial-gold)", opacity: 0.35 }}
      />
      {children}
      <SiteFooter />
    </main>
  );
}
