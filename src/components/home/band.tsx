import { useRef, type ReactNode } from "react";
import { useSpineProgress } from "./use-spine-progress";

export type BandTone = "navy" | "light";

/**
 * One homepage band: <section class="hp-band hp-navy|hp-light"> with its
 * .hp-wrap and the left spine whose fill tracks scroll (--hp-p). Children go
 * inside .hp-wrap, after the spine, exactly as in the mock-up.
 */
export function Band({
  id,
  tone,
  className,
  children,
}: {
  id: string;
  tone: BandTone;
  className?: string;
  children: ReactNode;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  useSpineProgress(wrapRef);
  return (
    <section className={`hp-band hp-${tone}${className ? ` ${className}` : ""}`} id={id}>
      <div className="hp-wrap" ref={wrapRef}>
        <div className="hp-spine" aria-hidden="true">
          <i />
        </div>
        {children}
      </div>
    </section>
  );
}

/**
 * The section head: eyebrow, headline and optional sub-line (.hp-lede), on the
 * mock-up's 12-column grid. `side` is the optional right-hand slot (Inside
 * Nash's "See how it works" button); it renders between the eyebrow and the
 * headline, as in the mock-up.
 */
export function SectionHead({
  eyebrow,
  title,
  lede,
  side,
  className,
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  lede?: ReactNode;
  side?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`hp-sec-head${className ? ` ${className}` : ""}`}>
      <span className="hp-eyebrow">{eyebrow}</span>
      {side ? <div className="hp-side">{side}</div> : null}
      <h2>{title}</h2>
      {lede ? <p className="hp-lede">{lede}</p> : null}
    </div>
  );
}
