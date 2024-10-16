import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react(), nodePolyfills()],
  build: {
    outDir: "docs",
  },
  // @ts-ignore
  base: process.env.GH_PAGES ? "/disintar-nft-reveal/" : "./",
  server: {
    fs: {
      allow: ["../sdk", "./"],
    },
  },
});
