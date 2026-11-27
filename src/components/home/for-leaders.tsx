import { Link } from "@tanstack/react-router";
import { Band, SectionHead } from "./band";

// For Leaders band (navy): the three role lenses (CFO, FP&A, Founder).
export function ForLeadersBand() {
  return (
    <Band id="for-leaders" tone="navy">
      <SectionHead
        eyebrow="Built for finance leaders"
        title={
          <>
            Built for the way finance
            <br />
            <span className="hp-em">actually works.</span>
          </>
        }
        lede="Same system, three lenses, each tuned to what your role needs to ship today."
      />
      <div className="hp-lenses">
        <article className="hp-lens">
          <div className="hp-lens-head">
            <span className="hp-lens-mark" aria-hidden="true">
              C
            </span>
            <div>
              <div className="hp-lens-role">CFO</div>
              <div className="hp-mini">Control + Audit</div>
            </div>
          </div>
          <p className="hp-lens-line">Board-ready numbers with an audit trail. Zero rebuilds.</p>
          <div className="hp-mock">
            <div className="hp-mock-head">
              <span className="hp-dot">audit trail · recent</span>
              <span>latest</span>
            </div>
            <div className="hp-log">
              <div>
                <span className="hp-t">11:42:18</span>
                <span className="hp-op">BULK_SAVE</span>
                <span className="hp-m">plan_action · forecast FY27 · admin</span>
              </div>
              <div>
                <span className="hp-t">12:01:09</span>
                <span className="hp-op">INSERT</span>
                <span className="hp-m">dim_account · OPEX_RND</span>
              </div>
              <div>
                <span className="hp-t">12:04:31</span>
                <span className="hp-op">INSERT</span>
                <span className="hp-m">dim_scenario · WHATIF_MH2K7Q9</span>
              </div>
              <div>
                <span className="hp-t">12:06:18</span>
                <span className="hp-op">UPDATE</span>
                <span className="hp-m">fact_data · $4.2M → $6.3M</span>
              </div>
              <div>
                <span className="hp-t">12:08:42</span>
                <span className="hp-op">UPDATE</span>
                <span className="hp-m">exchange_rates · JPY 150 → 152</span>
              </div>
            </div>
          </div>
          <ul className="hp-checks">
            <li>Every figure saved is recorded</li>
            <li>Defensible forecasts</li>
            <li>Board-grade governance</li>
          </ul>
          <Link className="hp-lens-cta" to="/try">
            Explore Nash for CFO <span aria-hidden="true">→</span>
          </Link>
        </article>
        <article className="hp-lens hp-hl">
          <span className="hp-badge">Most teams</span>
          <div className="hp-lens-head">
            <span className="hp-lens-mark" aria-hidden="true">
              F
            </span>
            <div>
              <div className="hp-lens-role">FP&amp;A</div>
              <div className="hp-mini">Continuous Planning</div>
            </div>
          </div>
          <p className="hp-lens-line">Planning as a continuous system, not a monthly cycle.</p>
          <div className="hp-mock">
            <div className="hp-mock-head">
              <span className="hp-on">Scenario · Q3 hire pace</span>
              <span>recompute · live</span>
            </div>
            <div className="hp-fake-slider" aria-hidden="true">
              <i />
            </div>
            <div className="hp-ticks">
              <span>0 hires</span>
              <span>10 hires</span>
            </div>
            <div className="hp-tri">
              <div>
                <div className="hp-k">Runway</div>
                <div className="hp-v">12.8mo</div>
              </div>
              <div>
                <div className="hp-k">Burn</div>
                <div className="hp-v">$15.6M</div>
              </div>
              <div>
                <div className="hp-k">EBITDA</div>
                <div className="hp-v">−$1.1M</div>
              </div>
            </div>
          </div>
          <ul className="hp-checks">
            <li>Scenarios update instantly</li>
            <li>No model rebuilds</li>
            <li>Driver-based multi-entity rollups</li>
          </ul>
          <Link className="hp-lens-cta" to="/try">
            Try with your data <span aria-hidden="true">→</span>
          </Link>
        </article>
        <article className="hp-lens">
          <div className="hp-lens-head">
            <span className="hp-lens-mark" aria-hidden="true">
              F
            </span>
            <div>
              <div className="hp-lens-role">Founder</div>
              <div className="hp-mini">Real-time clarity</div>
            </div>
          </div>
          <p className="hp-lens-line">Know your runway instantly. No need to ask finance.</p>
          <div className="hp-mock">
            <div className="hp-mock-head">
              <span className="hp-on">Current runway</span>
              <span className="hp-dot">live</span>
            </div>
            <div className="hp-runway">
              <span className="hp-big">14.2</span>
              <span className="hp-u">months</span>
              <span className="hp-d">+1.4 mo QoQ ↗</span>
            </div>
            <div className="hp-duo">
              <div>
                <span className="hp-k">Cash</span>
                <span className="hp-v">$211M</span>
              </div>
              <div>
                <span className="hp-k">Burn</span>
                <span className="hp-v">$14.8M/mo</span>
              </div>
            </div>
          </div>
          <ul className="hp-checks">
            <li>Real-time clarity</li>
            <li>Decisions in minutes</li>
            <li>Self-serve burn + runway</li>
          </ul>
          <Link className="hp-lens-cta" to="/try">
            Explore Nash for founders <span aria-hidden="true">→</span>
          </Link>
        </article>
      </div>
    </Band>
  );
}
