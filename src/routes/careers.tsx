import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { PageHero, Section, SectionHeader, CtaBand } from "@/components/page-sections";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/careers")({
  head: () =>
    seo({
      title: "Careers — NashOS",
      description:
        "We're an early-stage product. Not actively hiring yet — but if you're an FP&A operator who codes, write us.",
      path: "/careers",
    }),
  component: CareersPage,
});

const profiles = [
  {
    title: "FP&A operator who codes",
    body:
      "You've owned the close, the variance pack, the budget cycle. You know what an `IFERROR(VLOOKUP())` chain feels like at 11pm. You can also write SQL or TypeScript without breaking a sweat. Help us shape the product roadmap from the inside.",
  },
  {
    title: "Designer who's allergic to lorem",
    body:
      "You've designed dense data UIs (BI, EPM, finance tools, observability). You think tables are not boring. You can hold an argument about table density and number alignment. Help us make finance not feel like a chore.",
  },
  {
    title: "Founding engineer (full-stack)",
    body:
      "TypeScript / React / Postgres + an opinion about LLM agent architecture. Comfortable shipping the database schema, the React tree, and the prompt in the same week. Bonus: built a side-project nobody asked for.",
  },
];

function CareersPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Careers"
        title="We're not posting jobs"
        highlight="yet."
        lede={
          <>
            NashOS is early-stage. Headcount plans are honest: small, deliberate, and we'd rather
            meet the right person before posting a JD than the other way around. If any of the
            profiles below sounds like you, drop a line.
          </>
        }
      />

      <Section>
        <SectionHeader title="Profiles we'd love to meet" />
        <div className="space-y-4">
          {profiles.map((p) => (
            <div key={p.title} className="surface-card p-7">
              <h3 className="font-semibold text-lg">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Send us a"
        highlight="note."
        lede="A paragraph about you and what you've shipped is plenty. No CV ATS gymnastics."
        primaryCta={{
          label: "Write us",
          href: "mailto:admin@nashos.ai?subject=Hello%20%E2%80%94%20NashOS%20careers",
        }}
      />
    </PageShell>
  );
}
