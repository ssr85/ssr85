import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            if (id.includes("node_modules")) {
              if (id.includes("recharts") || id.includes("recharts-scale") || id.includes("d3-")) return "charts";
              if (id.includes("lucide-react")) return "icons";
              if (id.includes("@tanstack/react-query") || id.includes("@tanstack/query-core")) return "query";
              if (id.includes("next-themes")) return "theme";
              if (id.includes("react-dom") || id.includes("react/") || id.includes("react-router") || id.includes("scheduler")) return "vendor";
              if (id.includes("cmdk") || id.includes("vaul") || id.includes("sonner") || id.includes("embla") || id.includes("input-otp")) return "ui-vendor";
            }
          },
        },
      },
    },
  };
});
