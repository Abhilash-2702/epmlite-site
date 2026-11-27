import type { ReactNode } from "react";

// TEMPORARY (phase 1 of the homepage port). Marks a band body that a phase 2
// worker has not filled yet. Delete this file once no band imports it.
export function Placeholder({ owner, children }: { owner: string; children: ReactNode }) {
  return (
    <div
      style={{
        marginTop: "clamp(28px,4vw,52px)",
        padding: "48px 28px",
        border: "2px dashed var(--hp-line-2)",
        borderRadius: 14,
        font: "500 13px/1.6 var(--font-mono)",
        letterSpacing: ".08em",
        textTransform: "uppercase",
        color: "var(--hp-muted)",
      }}
    >
      Placeholder ({owner}): {children}
    </div>
  );
}
