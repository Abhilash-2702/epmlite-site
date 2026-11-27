import { Band, SectionHead } from "./band";
import { Placeholder } from "./placeholder";

// FAQ band (navy). Owner: phase 2 worker 4. Body to port: the mock-up's
// .hp-faq-list, rendered from HOME_FAQ in ./faq-data.ts (the same list feeds
// the FAQPage schema in src/routes/index.tsx, so render it, do not retype it).
export function FaqBand() {
  return (
    <Band id="faq" tone="navy">
      <div className="hp-faq">
        <SectionHead
          eyebrow="FAQ"
          title={
            <>
              Questions finance teams ask <span className="hp-em">before they buy.</span>
            </>
          }
        />
        <div className="hp-faq-list">
          <Placeholder owner="worker 4">The seven questions go here, from HOME_FAQ.</Placeholder>
        </div>
      </div>
    </Band>
  );
}
