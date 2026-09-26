// The people behind the product — the single source for /about, blog bylines
// and the schema.org Person entries. Bios are supplied by the founders
// verbatim; do not embellish them.

export type TeamMemberId = "murali-reddy" | "sooryah-pokkali";

export type TeamMember = {
  /** Stable id: the /about#<id> anchor and the schema.org Person @id. */
  id: TeamMemberId;
  name: string;
  role: string;
  /** Shown until a real headshot exists. */
  initials: string;
  /**
   * Public-folder path to the headshot, e.g. "/team/murali-reddy.jpg".
   * Drop the file in Website/site/public/team/ and set this — the avatar and
   * the Person.image in structured data both switch over. Left unset, the
   * initials render instead, and no image URL is published to Google (a
   * Person.image pointing at a 404 is worse than none). Square, >=400x400.
   */
  photo?: string;
  bio: string;
};

export const TEAM: TeamMember[] = [
  {
    id: "murali-reddy",
    name: "Murali Reddy",
    role: "CEO",
    initials: "MR",
    bio:
      "10+ years leading fintech product & platform teams. Scaled enterprise finance systems globally. Product architecture and systems thinking across AI and infrastructure.",
  },
  {
    id: "sooryah-pokkali",
    name: "Sooryah Pokkali",
    role: "CBO",
    initials: "SP",
    bio:
      "25+ years across telecom & hospitality. Scaled and exited a previous venture. Enterprise GTM, strategic partnerships, and operational scaling.",
  },
];

export const TEAM_BY_ID = Object.fromEntries(TEAM.map((m) => [m.id, m])) as Record<
  TeamMemberId,
  TeamMember
>;

/** schema.org @id for a person — shared by /about's Person graph and BlogPosting.author. */
export const personId = (id: TeamMemberId) => `https://nashos.ai/about#${id}`;
