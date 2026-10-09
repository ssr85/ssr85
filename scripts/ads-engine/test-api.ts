import { OAuth2Client } from "google-auth-library";
import fs from "fs";
import path from "path";

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

const DEVELOPER_TOKEN = process.env.GOOGLE_ADS_DEVELOPER_TOKEN?.trim();
const CLIENT_ID = process.env.GOOGLE_ADS_CLIENT_ID?.trim();
const CLIENT_SECRET = process.env.GOOGLE_ADS_CLIENT_SECRET?.trim();
const REFRESH_TOKEN = process.env.GOOGLE_ADS_REFRESH_TOKEN?.trim();
const MANAGER_CUSTOMER_ID = process.env.GOOGLE_ADS_MANAGER_CUSTOMER_ID?.replace(/-/g, "").trim();
const CUSTOMER_ID = process.env.GOOGLE_ADS_CUSTOMER_ID?.replace(/-/g, "").trim();

const oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function run() {
  const { token: accessToken } = await oauth2Client.getAccessToken();
  console.log("Got access token:", accessToken ? "YES" : "NO");

  for (const v of ["v18", "v17", "v16", "v15"]) {
    console.log(`\nTesting version ${v}...`);
    const url = `https://googleads.googleapis.com/${v}/customers:listAccessibleCustomers`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "developer-token": DEVELOPER_TOKEN!,
      },
    });
    console.log(`Status ${v}:`, res.status);
    const body = await res.text();
    console.log(`Body ${v}:`, body);
  }
}

run();
