import { Band, SectionHead } from "./band";
import { Placeholder } from "./placeholder";

// For Leaders band (navy). Owner: phase 2 worker 4. Body to port: the
// mock-up's .hp-lenses frame (CFO, FP&A, Founder).
export function ForLeadersBand() {
  return (
    <Band id="for-leaders" tone="navy">
      <SectionHead
        eyebrow="Built for finance leaders"
        title={
          <>
            Built for the way finance
            <br />
            <span className="hp-em">actually works.</span>
          </>
        }
        lede="Same system, three lenses, each tuned to what your role needs to ship today."
      />
      <Placeholder owner="worker 4">Three role lenses go here.</Placeholder>
    </Band>
  );
}
