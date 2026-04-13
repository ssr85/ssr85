import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import Sitemap from "vite-plugin-sitemap";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(), 
      mode === "development" && componentTagger(),
      Sitemap({
        hostname: "https://sarabjeetrattan.com",
        dynamicRoutes: ["/", "/resume"],
      }),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      // Inject the public reCAPTCHA site key
      VITE_RECAPTCHA_SITE_KEY: JSON.stringify(env.VITE_RECAPTCHA_SITE_KEY || ""),
    },
  };
});
