import { Band, SectionHead } from "./band";
import { Placeholder } from "./placeholder";

// System band (navy, id="system": the hero's "Explore Nash" scrolls here).
// Owner: phase 2 worker 3. Body to port: the mock-up's .hp-sys (stepper and
// canvas: Collapse diagram, Compression bar, Impact cards) and the "System"
// block of its script.
export function SystemBand() {
  return (
    <Band id="system" tone="navy">
      <SectionHead
        eyebrow="Architecture"
        title={
          <>
            From modules.
            <br />
            <span className="hp-em">To a system.</span>
          </>
        }
        lede="Most EPM tools sell you modules. NashOS gives you one system that operates as one."
      />
      <Placeholder owner="worker 3">Three-step stepper goes here.</Placeholder>
    </Band>
  );
}
