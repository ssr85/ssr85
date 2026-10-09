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

async function queryGoogleAds(query: string, customerId: string = CUSTOMER_ID!) {
  const { token: accessToken } = await oauth2Client.getAccessToken();
  const url = `https://googleads.googleapis.com/v25/customers/${customerId}/googleAds:searchStream`;
  const headers: Record<string, string> = {
    "Authorization": `Bearer ${accessToken}`,
    "developer-token": DEVELOPER_TOKEN!,
    "Content-Type": "application/json",
  };

  if (MANAGER_CUSTOMER_ID && MANAGER_CUSTOMER_ID !== customerId) {
    headers["login-customer-id"] = MANAGER_CUSTOMER_ID;
  }

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Google Ads API HTTP ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  const results: any[] = [];
  if (Array.isArray(data)) {
    for (const batch of data) {
      if (batch.results) {
        results.push(...batch.results);
      }
    }
  }
  return results;
}

async function main() {
  console.log("=== Granular Geo View ===");
  try {
    const geoQuery = `
      SELECT 
        geographic_view.country_criterion_id,
        geographic_view.location_type,
        campaign.name,
        metrics.clicks,
        metrics.impressions,
        metrics.cost_micros
      FROM geographic_view
      WHERE segments.date DURING LAST_30_DAYS
    `;
    const res = await queryGoogleAds(geoQuery);
    console.log("Geographic View Results:", JSON.stringify(res, null, 2));
  } catch (e: any) {
    console.error("Geo error:", e.message);
  }

  console.log("\n=== Campaign Criteria (Locations Targeted) ===");
  try {
    const critQuery = `
      SELECT 
        campaign_criterion.criterion_id,
        campaign_criterion.location.geo_target_constant,
        campaign_criterion.negative,
        campaign_criterion.status
      FROM campaign_criterion
      WHERE campaign_criterion.type = 'LOCATION'
    `;
    const res = await queryGoogleAds(critQuery);
    console.log("Campaign Location Criteria:", JSON.stringify(res, null, 2));
  } catch (e: any) {
    console.error("Criteria error:", e.message);
  }
}

main().catch(console.error);
