import Script from "next/script";

/**
 * Conditionally mounts Microsoft Clarity + Google Analytics 4 tracking
 * scripts. Both are gated on environment variables — if the user hasn't
 * set them in Vercel, nothing renders (zero impact on first paint).
 *
 * Required env vars (set in Vercel project settings · Production scope):
 *   NEXT_PUBLIC_CLARITY_ID   — Microsoft Clarity project ID (e.g. "abcd1234ef")
 *   NEXT_PUBLIC_GA_ID        — Google Analytics 4 measurement ID (e.g. "G-XXXXXXXXXX")
 *
 * Both prefixed with NEXT_PUBLIC_ so they're available client-side at build
 * time. They're public IDs by design (visible in any visitor's HTML) — not
 * secrets.
 *
 * Both scripts use strategy="afterInteractive" so they don't block the
 * critical hydration path. They start firing after the page is interactive.
 */
export default function Analytics() {
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <>
      {clarityId && (
        <Script id="ms-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${clarityId}");`}
        </Script>
      )}
      {gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}', { send_page_view: true });`}
          </Script>
        </>
      )}
    </>
  );
}
