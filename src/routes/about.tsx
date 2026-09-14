import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, History, GitBranch } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import {
  PageHero,
  Section,
  SectionHeader,
  CardGrid,
  StatGrid,
  CtaBand,
} from "@/components/page-sections";
import { seo } from "@/lib/seo";

// Visible trail + BreadcrumbList schema. Same array to both so they can't drift.
const CRUMBS = [{ name: "About", path: "/about" }];

export const Route = createFileRoute("/about")({
  head: () => {
    const base = seo({
      title: "About NashOS — The Team Behind Agentic FP&A",
      description:
        "Who builds NashOS: an FP&A operator and a fintech platform team who got tired of rebuilding the same spreadsheet. Meet the people behind the product.",
      breadcrumbs: CRUMBS,
      path: "/about",
    });
    // seo() covers FAQ and breadcrumbs; Person entries are appended here.
    return {
      ...base,
      scripts: [
        ...base.scripts,
        { type: "application/ld+json", children: JSON.stringify(TEAM_JSON_LD) },
      ],
    };
  },
  component: AboutPage,
});

// The site had no named people anywhere, which is the single biggest
// E-E-A-T gap for a finance product: Google and AI answer engines both look
// for who stands behind the claims. Bios are supplied by the founders.
//
// TODO(photos): headshots are not in the repo yet. Drop them in
// src/assets/team/ and swap `initials` for an <img> when they land.
type TeamMember = {
  name: string;
  role: string;
  initials: string;
  bio: string;
};

const TEAM: TeamMember[] = [
  {
    name: "Murali Reddy",
    role: "CEO",
    initials: "MR",
    bio:
      "10+ years leading fintech product & platform teams. Scaled enterprise finance systems globally. Product architecture and systems thinking across AI and infrastructure.",
  },
  {
    name: "Sooryah Pokkali",
    role: "CBO",
    initials: "SP",
    bio:
      "25+ years across telecom & hospitality. Scaled and exited a previous venture. Enterprise GTM, strategic partnerships, and operational scaling.",
  },
];

// Person entries hang off the Organization node so the founders resolve as
// entities tied to NashOS rather than as loose names on a page.
const TEAM_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": TEAM.map((m) => ({
    "@type": "Person",
    name: m.name,
    jobTitle: m.role,
    description: m.bio,
    worksFor: { "@id": "https://nashos.ai/#organization" },
    url: "https://nashos.ai/about",
  })),
};

const beliefs = [
  {
    Icon: Sparkles,
    title: "Plain English beats formulas",
    body:
      "Most CFO questions are sentences, not VLOOKUPs. The product should answer in the same language the question was asked.",
  },
  {
    Icon: History,
    title: "Audit trail beats version history",
    body:
      "Knowing who changed the COGS assumption — and what the value was before — is non-negotiable for finance. Excel can't do this. We do.",
  },
  {
    Icon: GitBranch,
    title: "Drivers beat spreadsheet rebuilds",
    body:
      "Hire 5 engineers shouldn't trigger a 3-day model rework. Drivers + member formulas mean the plan recomputes itself.",
  },
];

const stats = [
  {
    num: "9",
    label:
      "Product pillars · Dashboard, P&L, BS, CF, Drivers, AI Chat, Forecasting, What-If, Alerts",
  },
  { num: "35+", label: "AI tools that cover ~99% of manual app actions in plain English" },
  { num: "15", label: "ML forecasting algorithms — compare side-by-side, pick the winner" },
  {
    num: "9-dim",
    label:
      "Cube · Entity × Account × Period × Scenario × Version × Currency × Year × Product × Department",
  },
];

function AboutPage() {
  return (
    <PageShell crumbs={CRUMBS}>
      <PageHero
        tight
        eyebrow="Who we are"
        title={<>The FP&amp;A platform we couldn't buy.</>}
        highlight="So we built it."
        lede={
          <>
            We'd spent enough Sundays reconciling the close, enough Mondays explaining why
            EBITDA was off, enough Tuesdays rebuilding the variance pack one broken VLOOKUP at
            a time. The tools we evaluated — Excel, Anaplan, Adaptive — each fixed one thing
            and broke two others. We wanted the close in days, the variance pack in minutes,
            and an AI agent that read AND wrote the cube safely. Nothing on the market did all
            three. So we built it.
          </>
        }
      />

      <Section>
        <SectionHeader title="What we believe" />
        <CardGrid items={beliefs} cols={3} />
      </Section>

      <Section>
        <SectionHeader
          eyebrow="The team"
          title="Building the next-generation financial operating system."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {TEAM.map((m) => (
            <div key={m.name} className="surface-card p-7">
              <div className="flex items-center gap-4">
                <span
                  aria-hidden
                  className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gold/10 text-lg font-semibold text-gold"
                >
                  {m.initials}
                </span>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">{m.name}</h3>
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {m.role}
                  </p>
                </div>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{m.bio}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Backed by four more senior engineers with deep ERP and EPM experience.
        </p>
      </Section>

      <Section>
        <SectionHeader title="What we've built so far" />
        <StatGrid items={stats} cols={2} />
      </Section>

      <CtaBand
        title="See the product"
        highlight="that runs your finance."
        primaryCta={{ label: "See products", to: "/products" }}
        secondaryCta={{ label: "Talk to us", to: "/try" }}
      />
    </PageShell>
  );
}
