import { Band, SectionHead } from "./band";
import { Placeholder } from "./placeholder";

// From Q to D band (light). Owner: phase 2 worker 2.
// Body to port: the mock-up's .hp-loop (tabs, ask bar, console, CTA strip) and
// the "From Q to D console" block of its script.
export function FromQtoDBand() {
  return (
    <Band id="from-q-to-d" tone="light">
      <SectionHead
        eyebrow="From Q to D"
        title={
          <>
            Finance is about decisions.
            <br />
            <span className="hp-em">Not reports.</span>
          </>
        }
        lede="Ask. Test. Commit. One continuous loop: every saved figure recorded, every assumption explicit."
      />
      <Placeholder owner="worker 2">Ask / Test / Commit console goes here.</Placeholder>
    </Band>
  );
}
