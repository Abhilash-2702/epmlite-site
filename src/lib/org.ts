// Single source of truth for the company's NAP (name, address, phone).
//
// The footer, /contact and the Organization schema in routes/__root.tsx all
// read from here, so the three cannot drift: Google cross-checks them
// character for character, and a Google Business Profile, when one exists,
// has to match this exact form too.
//
// This is the REGISTERED OFFICE - a Delaware registered-agent address, not a
// staffed location. Wherever it renders, label it "Registered office"; do not
// present it as headquarters, an office you can visit, or a support address.
// Format follows the certificate of incorporation ("1013 Centre Rd. Suite
// 403-A, Wilmington, DE 19805, County of New Castle"). The canonical display form
// standardises the punctuation to "1013 Centre Rd., Suite 403-A" - WITH the comma; use
// exactly this form in any Google Business Profile or directory listing.
export const ORG_POSTAL_ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: "1013 Centre Rd., Suite 403-A",
  addressLocality: "Wilmington",
  addressRegion: "DE",
  postalCode: "19805",
  addressCountry: "US",
} as const;

/** Two display lines, used verbatim by the footer and /contact. */
export const ORG_ADDRESS_LINES = [
  "1013 Centre Rd., Suite 403-A",
  "Wilmington, DE 19805, USA",
] as const;

/** Phone renders only once a real, answered number exists (see site-header.tsx).
 *  When it does, set it here in E.164 and mirror it into ORG_JSON_LD. */
export const ORG_PHONE_E164: string | null = null;
