import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@/core": resolve(__dirname, "./src/core"),
      "@/presentation": resolve(__dirname, "./src/presentation"),
    },
  },
});
