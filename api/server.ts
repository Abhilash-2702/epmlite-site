// Vercel serverless function wrapper around the TanStack Start SSR bundle.
// TanStack Start v1.167 emits dist/server/server.js as a Node http handler;
// Vercel needs a function in api/ to route requests to it.
//
// The vercel.json `includeFiles` config ships dist/server/** with the function
// so the dynamic import resolves at runtime. The companion rewrite rule sends
// every non-static path to this handler.

// @ts-expect-error — dist/ is built at deploy-time, not committed
import handler from "../dist/server/server.js";

export default handler;
