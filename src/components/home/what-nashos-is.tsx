import { Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import { Band, SectionHead } from "./band";
import { RiseIn } from "./rise-in";

function More({ label, children }: { label: string; children: ReactNode }) {
  return (
    <details className="hp-more">
      <summary>
        <ChevronDown className="hp-ic" aria-hidden="true" />
        <span>{label}</span>
      </summary>
      <div className="hp-more-body">{children}</div>
    </details>
  );
}

// What NashOS is band (light): prose, who it is for, and three deep-dives,
// each with a native <details> disclosure.
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
      <div className="hp-prose-2">
        <RiseIn>
          <p>
            Traditional EPM splits finance across eight or more modules, each holding its own copy
            of the truth, so every month starts with reconciliation and every change starts with a
            rebuild.
          </p>
          <More label="Which eight modules, and why the copies drift">
            Planning, close, reporting, scenarios, data, governance, consolidation and allocations
            are each built and maintained separately. Because every module keeps its own copy of the
            model, a structural change in one is a rebuild and a re-reconciliation everywhere else.
          </More>
        </RiseIn>
        <RiseIn>
          <p>
            NashOS collapses them into five systems on one data foundation. A driver changes once
            and every dependent figure (forecast, consolidation, variance, runway) recomputes from
            the same source.
          </p>
          <More label="What that removes from the month">
            There is no export step, no model rebuild, and no window where two reports disagree. The
            same figure is used by planning, consolidation and variance because there is only one of
            it.
          </More>
        </RiseIn>
      </div>
      <RiseIn className="hp-forwho">
        <h3>Who it is for</h3>
        <div className="hp-who-grid">
          <p>
            <Link to="/for-leaders">CFOs</Link>: board-ready numbers, and every figure saved is
            recorded with who saved it and when.
          </p>
          <p>
            <b>FP&amp;A teams</b>: driver-based plans across multiple entities and currencies.
          </p>
          <p>
            <b>Founders</b>: runway and burn on demand, without asking finance.
          </p>
        </div>
      </RiseIn>
      <div className="hp-deep">
        <RiseIn as="article">
          <h3>How a request runs</h3>
          <p>
            Ask in plain English. NashOS resolves the intent against your dimensions, computes
            across every affected entity, and returns a draft.
          </p>
          <More label="More detail">
            A request like “what happens to runway if we hire ten engineers in Q3?” is parsed,
            resolved and computed in place. Nothing is written until you confirm it. The{" "}
            <Link to="/inside-nash">six systems behind that</Link> are described in full on a
            dedicated page.
          </More>
        </RiseIn>
        <RiseIn as="article">
          <h3>What makes it auditable</h3>
          <p>
            Most edits committed from a Nash draft card record the before value, the after value,
            the actor and the timestamp.
          </p>
          <More label="More detail">
            Grid saves and bulk loads are recorded per save, with who, when and how many rows;
            report lines expand from rollup to leaf; and each connector keeps the source rows of its
            recent runs. Agent-proposed changes are staged as drafts and are not written until a
            user confirms them.
          </More>
        </RiseIn>
        <RiseIn as="article">
          <h3>What it connects to</h3>
          <p>
            REST API, SFTP, Excel and CSV are self-serve today, and every inbound load is validated
            before anything is written.
          </p>
          <More label="More detail">
            Each connector has connection testing and run history, and REST API and SFTP sources can
            be pulled on a schedule you set (hourly, daily, weekly or a custom cron). The SAP
            S/4HANA, NetSuite, QuickBooks Online and Stripe engines are built and covered by
            automated tests, and we set those up with you.
          </More>
        </RiseIn>
      </div>
    </Band>
  );
}
