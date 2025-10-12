import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Read from process.env or fallback to a default backend URL
const apiUrl = process.env.VITE_API_URL || "http://16.171.206.188:8000";

export default defineConfig({
  plugins: [react()],
  define: {
    "import.meta.env.VITE_API_URL": JSON.stringify(apiUrl),
  },
  build: {
    outDir: "dist",
  },
  server: {
    host: true,
    port: 5173,
  },
});
