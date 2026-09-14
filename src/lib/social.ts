// Official NashOS social profiles - one definition, used by the footer, the
// contact page and the Organization `sameAs` array in __root.tsx. Search
// engines use sameAs to tie these profiles to the brand entity, so the URLs
// rendered on the page and the ones in the schema must stay identical.
//
// Only add a profile here once it exists and is publicly visible. A link to an
// empty or abandoned profile is worse than no link at all.

export type SocialProfile = {
  name: string;
  url: string;
  /** Icon key resolved by the rendering component. */
  icon: "linkedin" | "x";
};

export const SOCIAL_PROFILES: SocialProfile[] = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/company/nashos/",
    icon: "linkedin",
  },
  {
    name: "X",
    url: "https://x.com/NashOSAi",
    icon: "x",
  },
];

/** Absolute profile URLs for schema.org `sameAs`. */
export const SOCIAL_SAME_AS = SOCIAL_PROFILES.map((p) => p.url);
