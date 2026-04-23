import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/serverless";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";
import keystatic from "@keystatic/astro";

export default defineConfig({
  output: "server",
  adapter: vercel(),
  site: "https://revistaparrhesia.com",
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react(), markdoc(), keystatic()],
});
