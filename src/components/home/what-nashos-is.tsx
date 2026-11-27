import { Band, SectionHead } from "./band";
import { Placeholder } from "./placeholder";

// What NashOS is band (light). Owner: phase 2 worker 4. Body to port: the
// mock-up's .hp-prose-2, .hp-forwho and .hp-deep (with their details.hp-more
// disclosures and RiseIn reveals).
export function WhatNashOSIsBand() {
  return (
    <Band id="what-nashos-is" tone="light">
      <SectionHead
        eyebrow="What NashOS is"
        title={
          <>
            Finance software that <span className="hp-em">computes continuously.</span>
          </>
        }
        lede="One model, one set of dimensions, one computation path."
      />
      <Placeholder owner="worker 4">
        Prose, who it is for, and the three deep-dives go here.
      </Placeholder>
    </Band>
  );
}
