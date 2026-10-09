import { OAuth2Client } from "google-auth-library";
import http from "http";
import url from "url";
import fs from "fs";
import path from "path";

// Load .env manually
function loadEnv() {
  const envPath = path.resolve(process.cwd(), ".env");
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf-8");
    for (const line of envContent.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx !== -1) {
        const key = trimmed.slice(0, eqIdx).trim();
        const rawVal = trimmed.slice(eqIdx + 1).trim();
        const val = rawVal.replace(/^["']|["']$/g, "");
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  }
}

loadEnv();

const CLIENT_ID = process.env.GOOGLE_ADS_CLIENT_ID?.trim();
const CLIENT_SECRET = process.env.GOOGLE_ADS_CLIENT_SECRET?.trim();
const PORT = 3000;
const REDIRECT_URI = `http://localhost:${PORT}/oauth2callback`;

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error("\n❌ Missing GOOGLE_ADS_CLIENT_ID or GOOGLE_ADS_CLIENT_SECRET in .env\n");
  process.exit(1);
}

const oauth2Client = new OAuth2Client(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

const SCOPES = ["https://www.googleapis.com/auth/adwords"];

const authUrl = oauth2Client.generateAuthUrl({
  access_type: "offline",
  prompt: "consent",
  scope: SCOPES,
});

const server = http.createServer(async (req, res) => {
  try {
    if (req.url && req.url.startsWith("/oauth2callback")) {
      const parsedUrl = url.parse(req.url, true);
      const code = parsedUrl.query.code as string;

      if (!code) {
        res.writeHead(400, { "Content-Type": "text/html" });
        res.end("<h3>Missing authorization code</h3>");
        return;
      }

      const { tokens } = await oauth2Client.getToken(code);

      // Auto update .env
      const envPath = path.resolve(process.cwd(), ".env");
      let envContent = fs.readFileSync(envPath, "utf-8");
      if (envContent.includes("GOOGLE_ADS_REFRESH_TOKEN=")) {
        envContent = envContent.replace(
          /GOOGLE_ADS_REFRESH_TOKEN=".*"/,
          `GOOGLE_ADS_REFRESH_TOKEN="${tokens.refresh_token}"`
        );
        fs.writeFileSync(envPath, envContent, "utf-8");
      }

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(`
        <div style="font-family: sans-serif; max-width: 600px; margin: 50px auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px; text-align: center;">
          <h2 style="color: #16a34a;">Authentication Successful! 🎉</h2>
          <p>Your Refresh Token has been automatically saved to your .env file.</p>
          <p>You can close this window now.</p>
        </div>
      `);

      console.log("\n========================================================");
      console.log("✅ Refresh Token generated and auto-saved to .env!");
      console.log("Token:", tokens.refresh_token);
      console.log("========================================================\n");

      server.close();
      process.exit(0);
    }
  } catch (error: any) {
    res.writeHead(500, { "Content-Type": "text/html" });
    res.end(`<h3>Error: ${error.message}</h3>`);
    console.error("\n❌ Token exchange error:", error.message || error);
    server.close();
    process.exit(1);
  }
});

server.listen(PORT, () => {
  console.log("\n========================================================");
  console.log("🔑 Google Ads One-Click OAuth Setup");
  console.log("========================================================");
  console.log("\n👉 Please click or copy this URL into your browser to authorize:\n");
  console.log(`${authUrl}\n`);
  console.log("Waiting for login callback on localhost:3000...\n");
});
