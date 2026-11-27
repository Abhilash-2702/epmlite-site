import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Section, SectionHeader, FaqList } from "@/components/page-sections";

// Indexable copy for the homepage.
//
// The live homepage measured a 7.4% text-to-HTML ratio (4,611 text chars in
// 62,341 bytes) — well under the ~10% floor crawlers treat as "thin". The
// animated sections above carry the story visually but contribute very little
// crawlable prose. This block and the FAQ below are the fix, and the FAQ
// doubles as FAQPage structured data via index.tsx's head().
//
// Answers are written for how buyers actually search ("what is agentic FP&A",
// "NashOS vs Anaplan") rather than padded with keywords.

// HOME_FAQ moved to components/home/faq-data.ts (single source for the FAQ band
// and the FAQPage schema); re-exported here so this component keeps building.
import { HOME_FAQ } from "@/components/home/faq-data";
export { HOME_FAQ };

// Compact disclosure — the summary line carries the point, the detail stays in
// the DOM (native <details> keeps it crawlable) so tightening this block
// visually doesn't undo the text-to-HTML ratio fix described above.
function Detail({ summary, children }: { summary: string; children: ReactNode }) {
  return (
    <details className="detail-card group">
      <summary className="flex items-start gap-2 cursor-pointer list-none text-sm text-muted-foreground marker:hidden">
        <ChevronDown className="mt-[3px] h-3.5 w-3.5 shrink-0 text-gold transition-transform duration-200 group-open:rotate-180" />
        <span>{summary}</span>
      </summary>
      <div className="detail-body pl-[22px] pt-2 text-sm leading-relaxed text-muted-foreground">
        {children}
      </div>
    </details>
  );
}

export function HomeContentSection() {
  return (
    <>
      <Section>
        <SectionHeader
          eyebrow="What NashOS is"
          title={
            <>
              Finance software that <span className="text-gradient-gold">computes continuously.</span>
            </>
          }
          caption="One model, one set of dimensions, one computation path."
        />

        {/* Lead — two tight statements, detail one click away. */}
        <div className="grid lg:grid-cols-2 gap-x-10 gap-y-6 mt-8">
          <div className="rise-in space-y-3">
            <p className="text-base leading-relaxed text-muted-foreground">
              Traditional EPM splits finance across eight or more modules, each holding its own
              copy of the truth — so every month starts with reconciliation and every change
              starts with a rebuild.
            </p>
            <Detail summary="Which eight modules, and why the copies drift">
              Planning, close, reporting, scenarios, data, governance, consolidation and
              allocations are each built and maintained separately. Because every module keeps its
              own copy of the model, a structural change in one is a rebuild and a
              re-reconciliation everywhere else.
            </Detail>
          </div>

          <div className="rise-in space-y-3" style={{ animationDelay: "80ms" }}>
            <p className="text-base leading-relaxed text-muted-foreground">
              NashOS collapses them into five systems on one data foundation. A driver changes once
              and every dependent figure — forecast, consolidation, variance, runway — recomputes
              from the same source.
            </p>
            <Detail summary="What that removes from the month">
              There is no export step, no model rebuild, and no window where two reports disagree.
              The same figure is used by planning, consolidation and variance because there is only
              one of it.
            </Detail>
          </div>
        </div>

        {/* Who it is for — one compact row instead of a bulleted block. */}
        <div className="rise-in mt-10" style={{ animationDelay: "160ms" }}>
          <h3 className="text-xs uppercase tracking-[0.18em] text-gold font-semibold mb-4">
            Who it is for
          </h3>
          <div className="grid sm:grid-cols-3 gap-4 text-sm">
            <p className="text-muted-foreground">
              <Link to="/for-leaders" className="text-foreground font-medium hover:text-gold">
                CFOs
              </Link>{" "}
              — board-ready numbers, and every figure saved is recorded with who saved it and when.
            </p>
            <p className="text-muted-foreground">
              <span className="text-foreground font-medium">FP&amp;A teams</span> — driver-based
              plans across multiple entities and currencies.
            </p>
            <p className="text-muted-foreground">
              <span className="text-foreground font-medium">Founders</span> — runway and burn on
              demand, without asking finance.
            </p>
          </div>
        </div>

        {/* Three deep-dives, collapsed by default. */}
        <div className="grid md:grid-cols-3 gap-4 mt-10">
          {[
            {
              h: "How a request runs",
              lead: "Ask in plain English. NashOS resolves the intent against your dimensions, computes across every affected entity, and returns a draft.",
              body: (
                <>
                  A request like “what happens to runway if we hire ten engineers in Q3?” is
                  parsed, resolved and computed in place — nothing is written until you confirm it.
                  The{" "}
                  <Link to="/inside-nash" className="text-gold hover:underline">
                    six systems behind that
                  </Link>{" "}
                  are described in full on a dedicated page.
                </>
              ),
            },
            {
              h: "What makes it auditable",
              lead: "Most edits committed from a Nash draft card record the before value, the after value, the actor and the timestamp.",
              body: (
                <>
                  Grid saves and bulk loads are recorded per save, with who, when and how many rows; report lines expand from rollup to
                  leaf; and each connector keeps the source rows of its recent runs. Agent-proposed
                  changes are staged as drafts and are not written until a user confirms them.
                </>
              ),
            },
            {
              h: "What it connects to",
              lead: "REST API, SFTP, Excel and CSV are self-serve today, and every inbound load is validated before anything is written.",
              body: (
                <>
                  Each connector has connection testing and run history, and REST API and SFTP
                  sources can be pulled on a schedule you set (hourly, daily, weekly or a custom
                  cron). The SAP S/4HANA, NetSuite, QuickBooks Online and Stripe engines are built
                  and covered by automated tests, and we set those up with you.
                </>
              ),
            },
          ].map((c, i) => (
            <div
              key={c.h}
              className="rise-in surface-card p-5"
              style={{ animationDelay: `${240 + i * 80}ms` }}
            >
              <h3 className="text-base font-semibold text-foreground">{c.h}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.lead}</p>
              <div className="mt-3">
                <Detail summary="More detail">{c.body}</Detail>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="FAQ"
          title={
            <>
              Questions finance teams ask{" "}
              <span className="text-gradient-gold">before they buy.</span>
            </>
          }
        />
        <div className="mt-10 max-w-3xl">
          <FaqList items={HOME_FAQ} />
        </div>
      </Section>
    </>
  );
}
