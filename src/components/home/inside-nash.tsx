import { Link } from "@tanstack/react-router";
import { Activity, Brain, Database, Play, Plug, ShieldCheck, Workflow } from "lucide-react";
import { Band, SectionHead } from "./band";

// Inside Nash band (light): the six-systems frame and the footer line.
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
      <div className="hp-six">
        <article>
          <Brain className="hp-ic" aria-hidden="true" />
          <h3>Decision System</h3>
          <p>
            Understands the business: P&amp;L, Balance Sheet, Cash Flow as one model with variance,
            drivers, and drill-down to source of truth.
          </p>
        </article>
        <article>
          <Activity className="hp-ic" aria-hidden="true" />
          <h3>Continuous Planning</h3>
          <p>
            Keeps it current: driver-based planning, scenarios, what-ifs and continuous
            recomputation across the model.
          </p>
        </article>
        <article>
          <Workflow className="hp-ic" aria-hidden="true" />
          <h3>Agentic Execution</h3>
          <p>
            Turns intent into action. Ask in plain English; the system plans and drafts, and you
            confirm and commit.
          </p>
        </article>
        <article>
          <ShieldCheck className="hp-ic" aria-hidden="true" />
          <h3>Audit &amp; Control</h3>
          <p>
            Every figure saved is recorded, attributed to its user, with before/after kept on most
            committed drafts, and role-based control.
          </p>
        </article>
        <article>
          <Database className="hp-ic" aria-hidden="true" />
          <h3>Data Foundation</h3>
          <p>
            Holds it together: multi-entity, multi-currency, shared dimensions, consistent
            computation everywhere.
          </p>
        </article>
        <article>
          <Plug className="hp-ic" aria-hidden="true" />
          <h3>Integrations</h3>
          <p>
            Connects Nash to your data: APIs, SFTP, CSV, Excel, validated on every run with full run
            history.
          </p>
        </article>
      </div>
      <div className="hp-inside-foot">
        <p>
          Together, these systems operate as one: multi-entity, continuously computed, every saved
          figure recorded. <strong>No handoffs. No sync issues. No rebuilds.</strong>
        </p>
        <Link className="hp-btn hp-btn-primary" to="/try">
          Try with your data <span aria-hidden="true">→</span>
        </Link>
      </div>
    </Band>
  );
}
