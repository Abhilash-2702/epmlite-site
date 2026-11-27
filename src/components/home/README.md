# Homepage redesign (2026-11): notes for the section workers

The homepage is a port of the approved mock-up
(`Website/redesign-2026-11/index.html` in the NashOS monorepo, brief in `BRIEF.md`
beside it). Phase 1 laid the base: stylesheet, header, footer, hero, the shared
pieces below, and one stub per band. Each phase 2 worker fills only their own
files.

| Band                                            | File                                                                                 | CSS overrides                     | Owner    |
| ----------------------------------------------- | ------------------------------------------------------------------------------------ | --------------------------------- | -------- |
| From Q to D (Ask / Test / Commit console)       | `from-q-to-d.tsx`                                                                    | `src/styles/home-from-q-to-d.css` | worker 2 |
| System (stepper: Collapse, Compression, Impact) | `system.tsx`                                                                         | `src/styles/home-system.css`      | worker 3 |
| Inside Nash, For Leaders, What NashOS is, FAQ   | `inside-nash.tsx`, `for-leaders.tsx`, `what-nashos-is.tsx`, `faq.tsx`, `faq-data.ts` | `src/styles/home-static.css`      | worker 4 |

Each stub already renders its real band wrapper and section head (copy from the
mock-up). Replace the `<Placeholder>` with the body. When no band imports
`placeholder.tsx` any more, delete it. Split a band into more files inside this
folder if it helps, but do not edit files outside your row (ask instead).

There is no separate closing call-to-action band: the mock-up's closing block
("Run finance as one system.") is part of the footer, `src/components/site-footer.tsx`.

## Naming rule: every class is `hp-` + the mock-up's class

- `src/styles/home.css` is the mock-up's whole `<style>` block, converted by a
  script, rule order unchanged. Every class is prefixed: `class="wrap"` becomes
  `className="hp-wrap"`, `collapse` becomes `hp-collapse`, `row` becomes
  `hp-row`, and so on for every class, including the short ones (`k`, `v`, `n`,
  `l`, `on`, `dim`, `neg`, `em`, `ln`...) and the state classes the mock-up
  script toggles (`is-solid`, `has-signal`, `done`, `step-in`, `row-in`,
  `border-flash`, `merge-out`, `merge-in`, `node-pop`, `flow-path`, `flow-pulse`).
- Custom properties are prefixed too: `--bg` is `--hp-bg`, `--accent` is
  `--hp-accent`, `--line` is `--hp-line`. The ones the mock-up script sets are
  `--hp-p` (spine fill, already handled by `Band`), `--hp-f` (stepper connector
  fill) and `--hp-len` (flow path length).
- Keyframes are prefixed: `hp-step-in`, `hp-row-in`, `hp-ping`, `hp-pulse-soft`...
  Use these names in any inline `animation` you set from code.
- Fonts: `var(--font-display)` (Inter), `var(--font-sans)` (Roboto),
  `var(--font-mono)` (JetBrains Mono). These are the site's tokens; the mock-up's
  `--f-*` tokens were mapped onto them. Add no font.
- Do not use Tailwind utilities inside the homepage bands. Tailwind would match
  them, but the mock-up's rules are unlayered and win over every Tailwind layer,
  so mixing the two gives confusing results. Plain `hp-` classes only.
- Never use a bare mock-up class name (`collapse`, `grid`, `hidden`, `row`...):
  Tailwind scans `src` and generates a utility for any name it recognises.

## Where CSS goes

Do not edit `src/styles/home.css` (it is generated; phase 1 owns it). If your
band needs a rule the mock-up does not have, put it in your own override file
from the table above. Those files are already `@import`ed by `src/styles.css`,
after `home.css`, so a rule there wins at equal specificity. They load globally:
scope every rule to your band's classes.

## Shared pieces

All in this folder.

| Piece                                                          | Use                                                                                                                                                                                                                                                                       |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Band` (`band.tsx`)                                            | `<Band id="system" tone="navy">...</Band>` renders `<section class="hp-band hp-navy" id>` > `.hp-wrap` > the spine, then your children. The spine fill (`--hp-p`) is wired through `use-spine-progress.ts` (one shared scroll listener). `tone` is `"navy"` or `"light"`. |
| `SectionHead` (`band.tsx`)                                     | `<SectionHead eyebrow="..." title={<>Line one.<br /><span className="hp-em">Line two.</span></>} lede="..." side={...} />` renders `.hp-sec-head` with `.hp-eyebrow`, optional `.hp-side`, `h2` and optional `.hp-lede`.                                                  |
| `RiseIn` (`rise-in.tsx`)                                       | `<RiseIn as="article">...</RiseIn>` adds `hp-rise-in`, the mock-up's CSS scroll reveal (no script). You can also put `hp-rise-in` on an element yourself.                                                                                                                 |
| `HashLink` (`hash-link.tsx`)                                   | `<HashLink hash="system" className="hp-btn hp-btn-ghost">See the system</HashLink>` for the mock-up's `href="#system"` links: smooth scroll, a jump under reduced motion.                                                                                                 |
| `NashLockup`, `NashMonogram` (`src/components/nash-marks.tsx`) | The brand marks as inline SVG, `fill="currentColor"`.                                                                                                                                                                                                                     |
| `HOME_FAQ` (`faq-data.ts`)                                     | The one source for the FAQ band and the FAQPage schema in `src/routes/index.tsx`. Render it; do not retype the answers.                                                                                                                                                   |

Icons: use `lucide-react` with `className="hp-ic"` and `aria-hidden="true"`.
The mock-up's sprite maps to: `i-mail` Mail, `i-menu` AlignRight, `i-x` X,
`i-play` Play, `i-chev` ChevronDown, `i-brain` Brain, `i-activity` Activity,
`i-workflow` Workflow (beside "Agentic Execution", not Sparkles),
`i-shield` ShieldCheck, `i-database` Database, `i-plug` Plug,
`i-linkedin` Linkedin. An inline style on the mock-up's `<svg>` carries over as
a `style` prop (for example the Play icon's `fill: currentColor`).

Links: the mock-up's absolute `https://nashos.ai/...` links are router links on
the site (`<Link to="/try">`); its `#...` links are `HashLink`.

## Porting the mock-up script

- Port each block into effects with cleanup: timers, rAF, listeners and
  observers are all released on unmount. Nothing may read `window`,
  `document` or `matchMedia` during render (the page is server-rendered), and
  the first client render must match the server's, so start from the mock-up's
  initial state and change it in effects.
- Keep every timing and constant as written (`AUTO_MS = 7000`, the 0.12
  IntersectionObserver threshold, the hover pause, and so on) and the
  reduced-motion handling as written.
- Where the mock-up builds markup with `innerHTML`, render it with JSX
  instead; React escapes text, so `esc()` is not needed.

## Tailwind preflight: what is different from the mock-up's browser defaults

Tailwind's preflight (a layer) is loaded before `home.css`. The mock-up's rules
are unlayered, so they beat it, but where the mock-up relied on a browser
default that preflight changed, the default is gone unless a rule restores it:

- `svg` is `display:block` in preflight. Restored to `inline` inside the
  homepage, header and footer (end of `home.css`), because the mock-up's inline
  icons (for example `.hp-six .hp-ic`) sit on a text line. An svg that the
  mock-up styles explicitly is unaffected.
- `img` is `display:block; max-width:100%; height:auto`. Not restored; the
  mock-up uses no `img`.
- Headings have `font-size:inherit; font-weight:inherit`. The mock-up gives
  every heading an explicit size, and `home.css` restores weight 700 for h1-h4.
  A heading you add without a size will be body size.
- Lists have `list-style:none` and no padding; `margin` and `padding` are 0 on
  every element; `button` has a transparent background, no border, radius 0 and
  inherits colour and letter-spacing. The mock-up sets all of these where it
  needs them.
- Borders are `0 solid` everywhere, and the site sets `border-color` to its own
  border colour on every element. Always write border colour with the width.
- `a` inherits colour and text decoration (no underline unless set).
- The site's body has `font-feature-settings: "cv11","ss01","ss03"`; the
  homepage, header and footer reset it to `normal`, as in the mock-up.
- `position: sticky` (the System stepper, the FAQ head) needs every ancestor to
  be free of `overflow: hidden`. The wrapper uses `overflow-x: clip`, which is
  safe; do not add `overflow: hidden` around a band.

## Header and footer

They are restyled in place in `src/components/site-header.tsx` and
`site-footer.tsx` and render on every page, so their styles are self-contained
under `.hp-site-header` and `.hp-site-footer`. The header is `position: fixed`
(the mock-up's is sticky) so inner pages keep their layout; on the homepage the
hero slides under it as designed. The footer's curved spine end renders on the
homepage only.
