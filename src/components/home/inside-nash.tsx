import { Play } from "lucide-react";
import { Band, SectionHead } from "./band";
import { Placeholder } from "./placeholder";

// Inside Nash band (light). Owner: phase 2 worker 4. Body to port: the
// mock-up's .hp-six frame and .hp-inside-foot.
// "See how it works" does nothing, exactly as on the live site (owner flag 2).
export function InsideNashBand() {
  return (
    <Band id="inside-nash" tone="light">
      <SectionHead
        eyebrow="Inside Nash"
        side={
          <button className="hp-btn hp-btn-ghost hp-btn-sm" type="button">
            <Play
              className="hp-ic"
              aria-hidden="true"
              style={{ fill: "currentColor", fontSize: 12 }}
            />
            See how it works
          </button>
        }
        title={
          <>
            Six systems.
            <br />
            <span className="hp-em">One operating model.</span>
          </>
        }
      />
      <Placeholder owner="worker 4">Six systems frame and footer line go here.</Placeholder>
    </Band>
  );
}
