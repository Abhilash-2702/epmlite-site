import { Band, SectionHead } from "./band";
import { HOME_FAQ } from "./faq-data";

// FAQ band (navy), rendered from HOME_FAQ (the same list feeds the FAQPage
// schema in src/routes/index.tsx).
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
          {HOME_FAQ.map((f) => (
            <details key={f.question}>
              <summary>
                {f.question}
                <span aria-hidden="true">▾</span>
              </summary>
              <p>{f.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </Band>
  );
}
