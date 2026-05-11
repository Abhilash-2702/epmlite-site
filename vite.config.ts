import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

// NashOS marketing site — TanStack Start + Vercel.
// (Cloudflare adapter and Lovable wrapper removed; see git history pre-rebuild for the prior config.)
export default defineConfig({
  plugins: [
    tsConfigPaths(),
    tailwindcss(),
    tanstackStart({
      target: "vercel",
      tsr: { srcDirectory: "src" },
    }),
    viteReact(),
  ],
});
