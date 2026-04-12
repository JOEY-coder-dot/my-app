import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 2000, // 2 MB

    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react")) return "react";
            if (id.includes("@mui")) return "mui";
            if (id.includes("recharts")) return "charts";
            if (id.includes("jspdf") || id.includes("html2canvas")) return "pdf";
          }
        },
      },
    },
  },
});