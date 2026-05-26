import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "@/core": resolve(__dirname, "./src/core"),
      "@/presentation": resolve(__dirname, "./src/presentation"),
    },
  },
  server: {
    allowedHosts: [
      "ministry-strengthening-returning-special.trycloudflare.com",
    ],
  },
});
