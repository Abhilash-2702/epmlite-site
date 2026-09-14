import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

/**
 * Floating call-to-action for long-scroll pages (comparisons, keyword landing
 * pages, blog posts). The header CTA scrolls out of reach on a 2,000px page;
 * this one appears once the reader is past the hero and stays within thumb
 * reach on mobile.
 *
 * It hides again once the footer is on screen: the footer carries its own
 * "Try with your data" band, and on a 375px viewport the floating bar
 * otherwise sits ~12px off the legal links. Two competing CTAs stacked on top
 * of each other is worse than one.
 */
export function StickyCta({
  label = "Book a demo",
  to = "/demo",
}: {
  label?: string;
  to?: string;
}) {
  const [past, setPast] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(footer);
    return () => io.disconnect();
  }, []);

  const show = past && !footerVisible;

  return (
    <div
      aria-hidden={!show}
      className={`fixed inset-x-0 bottom-0 z-30 flex justify-center px-4 pb-4 transition-all duration-300 motion-reduce:transition-none lg:inset-x-auto lg:right-6 lg:bottom-6 lg:px-0 lg:pb-0 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <Link
        to={to}
        tabIndex={show ? undefined : -1}
        className="btn-gold inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold shadow-2xl sm:w-auto"
      >
        {label}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
