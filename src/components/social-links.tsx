import { Linkedin } from "lucide-react";
import { SOCIAL_PROFILES } from "@/lib/social";

// X has no lucide glyph (the bird is the old brand), so it is inlined.
function XMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

/**
 * Official profile links. Rendered in the footer and on /contact; the same
 * URLs are emitted as Organization `sameAs` so the brand entity resolves.
 */
export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex items-center gap-3 ${className}`}>
      {SOCIAL_PROFILES.map((p) => (
        <li key={p.url}>
          <a
            href={p.url}
            target="_blank"
            rel="noopener noreferrer me"
            aria-label={`NashOS on ${p.name}`}
            title={`NashOS on ${p.name}`}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-gold/50 hover:text-gold"
          >
            {p.icon === "linkedin" ? (
              <Linkedin className="h-4 w-4" />
            ) : (
              <XMark className="h-3.5 w-3.5" />
            )}
          </a>
        </li>
      ))}
    </ul>
  );
}
