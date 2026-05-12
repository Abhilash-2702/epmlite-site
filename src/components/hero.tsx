import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";

import heroPoster from "@/assets/hero-wave.jpg";
import heroCfo from "@/assets/hero-cfo.mp4.asset.json";
import heroBoardroom from "@/assets/hero-boardroom.mp4.asset.json";

const CLIPS = [heroCfo.url, heroBoardroom.url];

export function Hero() {
  const layerRef = useRef<HTMLDivElement>(null);
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(0); // 0 = A visible, 1 = B visible

  useEffect(() => {
    const el = layerRef.current;
    if (!el) return;
    let raf = 0;
    let tx = 0, ty = 0, cx = 0, cy = 0;
    const onMove = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      tx = (e.clientX / w - 0.5) * 22;
      ty = (e.clientY / h - 0.5) * 16;
    };
    const tick = () => {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      el.style.transform = `scale(1.06) translate3d(${cx}px, ${cy}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  // iOS Safari/Chrome reliability + cross-fade controller
  useEffect(() => {
    const a = videoARef.current;
    const b = videoBRef.current;
    if (!a || !b) return;
    const videos = [a, b];
    videos.forEach((v) => {
      v.muted = true;
      v.defaultMuted = true;
      v.setAttribute("muted", "");
      v.setAttribute("playsinline", "");
      v.setAttribute("webkit-playsinline", "");
      v.loop = false;
    });
    // Start A; keep B paused at frame 0 until first swap
    a.currentTime = 0;
    b.currentTime = 0;
    a.play().catch(() => {});
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const FADE_MS = 1400;
    let current = 0;
    let swapping = false;

    const swap = () => {
      if (swapping) return;
      swapping = true;
      const next = current === 0 ? 1 : 0;
      const incoming = videos[next];
      const outgoing = videos[current];
      // Restart incoming from frame 0 for a clean, non-repeating cut
      try { incoming.currentTime = 0; } catch {}
      incoming.play().catch(() => {});
      current = next;
      setActive(next);
      // After fade completes, pause outgoing and reset for next cycle
      window.setTimeout(() => {
        try { outgoing.pause(); outgoing.currentTime = 0; } catch {}
        swapping = false;
      }, FADE_MS + 60);
    };

    // Trigger swap when active clip nears its end (sync to actual video timing)
    const onTimeUpdate = (v: HTMLVideoElement) => () => {
      if (videos[current] !== v) return;
      const remaining = (v.duration || 5) - v.currentTime;
      if (remaining > 0 && remaining <= FADE_MS / 1000) swap();
    };
    const onEnded = (v: HTMLVideoElement) => () => {
      if (videos[current] !== v) return;
      swap();
    };
    const handlersTU = videos.map((v) => {
      const h = onTimeUpdate(v);
      v.addEventListener("timeupdate", h);
      return h;
    });
    const handlersEnd = videos.map((v) => {
      const h = onEnded(v);
      v.addEventListener("ended", h);
      return h;
    });

    const onInteract = () => { videos[current].play().catch(() => {}); };
    document.addEventListener("touchstart", onInteract, { passive: true, once: true });
    document.addEventListener("click", onInteract, { once: true });
    return () => {
      videos.forEach((v, i) => {
        v.removeEventListener("timeupdate", handlersTU[i]);
        v.removeEventListener("ended", handlersEnd[i]);
      });
      document.removeEventListener("touchstart", onInteract);
      document.removeEventListener("click", onInteract);
    };
  }, []);

  return (
    // bg-background ensures the section is dark from first paint — eliminates
    // the bright poster-image flash before the hero video starts playing.
    <section className="relative min-h-screen w-full overflow-hidden flex flex-col bg-background">
      {/* Video background — anchored to bottom half */}
      <div className="absolute inset-x-0 bottom-0 top-1/3 overflow-hidden bg-background">
        <div ref={layerRef} className="absolute inset-0 will-change-transform">
          {[videoARef, videoBRef].map((ref, i) => (
            <video
              key={i}
              ref={ref}
              className="absolute inset-0 h-full w-full object-cover pointer-events-none transition-opacity duration-[1400ms] ease-in-out"
              style={{ opacity: active === i ? 1 : 0 }}
              src={CLIPS[i]}
              autoPlay={i === 0}
              muted
              playsInline
              controls={false}
              disableRemotePlayback
              poster={heroPoster}
              preload="auto"
            />
          ))}
        </div>
        {/* Global darken to tame brightness */}
        <div className="pointer-events-none absolute inset-0 bg-background/55" />
        {/* Brand-tint overlay to bind footage to dark/gold theme */}
        <div className="pointer-events-none absolute inset-0 mix-blend-overlay bg-[radial-gradient(ellipse_at_center,oklch(0.82_0.14_78/14%),transparent_70%)]" />
        {/* Strong top-down fade, lighter at bottom */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-transparent sm:from-background sm:via-background/70" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/80 to-transparent" />
      </div>

      {/* Decorative corner frame (desktop) */}
      <CornerFrame />

      {/* Centered hero content */}
      <div className="relative z-10 flex-1 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10 pt-20 sm:pt-44 lg:pt-52 pb-6 flex flex-col items-center justify-center sm:justify-start text-center">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-[1.1] sm:leading-[1.05] tracking-tight max-w-5xl">
          A unified system for{" "}
          <span className="text-gradient-gold">planning, forecasting,</span>{" "}
          and <span className="text-gradient-gold font-serif-accent font-normal">decisions.</span>
        </h1>

        <p className="mt-5 sm:mt-6 text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl leading-relaxed">
          One continuously computed system for finance — multi-entity, multi-currency, audit-ready.
        </p>

        <div className="mt-8 sm:mt-8 w-full flex flex-col sm:flex-row sm:flex-wrap justify-center items-center gap-2.5 sm:gap-3">
          <a
            href="#system"
            className="btn-gold inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 sm:py-3.5 text-sm font-semibold w-full max-w-xs sm:w-auto sm:max-w-none"
          >
            Explore Nash <span aria-hidden>→</span>
          </a>
          <Link
            to="/try"
            className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 sm:py-3.5 text-sm font-medium border border-border bg-card/60 hover:bg-card transition-colors text-foreground w-full max-w-xs sm:w-auto sm:max-w-none"
          >
            Try with your data
          </Link>
        </div>
      </div>

      {/* Trusted by marquee — borderless trust strip */}
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10 mt-10 sm:mt-0 pt-6 pb-5 sm:pb-6 lg:pb-8">
        <p className="text-center text-[0.7rem] tracking-[0.25em] text-gold uppercase">
          Trusted by finance teams that move fast
        </p>
        <div className="mt-4 marquee-mask">
          <div className="marquee-track">
            {[...Array(2)].map((_, dup) => (
              <div className="marquee-group" key={dup} aria-hidden={dup === 1}>
                {[
                  ["✦", "NORTHSTAR"],
                  ["⬡", "BEACON"],
                  ["▦", "PULSE FP&A"],
                  ["◉", "CLARION"],
                  ["▲", "ATLAS DATA"],
                  ["△", "AURORA SYSTEMS"],
                  ["✺", "MERIDIAN"],
                  ["◈", "VANTAGE"],
                ].map(([icon, name]) => (
                  <div key={name} className="flex items-center gap-2.5 text-xs sm:text-sm tracking-wider text-muted-foreground whitespace-nowrap">
                    <span className="text-gold/80 text-lg">{icon}</span>
                    <span>{name}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CornerFrame() {
  // Bracket dimensions (px) shared by SVG + overlays
  const W = 440;
  const H = 360;
  const R = 48;
  // Path: top → down vertical → rounded corner → horizontal → end
  const leftPath = `M 0 0 L 0 ${H - R} Q 0 ${H} ${R} ${H} L ${W} ${H}`;
  const rightPath = `M ${W} 0 L ${W} ${H - R} Q ${W} ${H} ${W - R} ${H} L 0 ${H}`;

  return (
    <div className="pointer-events-none absolute inset-0 z-0 hidden lg:block">
      {/* Left bracket */}
      <div className="absolute left-12 top-[18%]" style={{ width: W, height: H }}>
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none" className="absolute inset-0 overflow-visible">
          <path d={leftPath} stroke="oklch(0.82 0.14 78 / 0.14)" strokeWidth="1" />
          <circle r="2.5" fill="var(--gold)" style={{ filter: "drop-shadow(0 0 6px var(--gold))" }}>
            <animateMotion dur="7s" repeatCount="indefinite" path={leftPath} rotate="auto" begin="0.4s" />
          </circle>
        </svg>
        <div className="absolute bottom-0 left-20 translate-y-1/2 flex items-center gap-3 px-2 bg-background">
          <span className="h-2 w-2 rounded-full bg-gold shadow-[0_0_18px_var(--gold)]" style={{ animation: "pulse-soft 4.6s ease-in-out infinite" }} />
          <span className="text-[0.65rem] tracking-[0.3em] text-muted-foreground uppercase whitespace-nowrap">
            Audit-ready
          </span>
        </div>
      </div>

      {/* Right bracket */}
      <div className="absolute right-12 top-[22%]" style={{ width: W, height: H }}>
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none" className="absolute inset-0 overflow-visible">
          <path d={rightPath} stroke="oklch(0.82 0.14 78 / 0.14)" strokeWidth="1" />
          <circle r="2.5" fill="var(--gold)" style={{ filter: "drop-shadow(0 0 6px var(--gold))" }}>
            <animateMotion dur="9s" repeatCount="indefinite" path={rightPath} rotate="auto" begin="1.7s" />
          </circle>
        </svg>
        <div className="absolute bottom-0 right-20 translate-y-1/2 flex items-center gap-3 px-2 bg-background">
          <span className="text-[0.65rem] tracking-[0.3em] text-muted-foreground uppercase whitespace-nowrap">
            Continuously Computed
          </span>
          <span className="h-2 w-2 rounded-full bg-gold shadow-[0_0_18px_var(--gold)]" style={{ animation: "pulse-soft 5.8s ease-in-out infinite", animationDelay: "1.1s" }} />
        </div>
      </div>
    </div>
  );
}
