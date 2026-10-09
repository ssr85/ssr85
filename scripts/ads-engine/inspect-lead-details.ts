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
  console.log("=== 1. Click View for 2026-10-08 ===");
  try {
    const clickQuery = `
      SELECT 
        click_view.gclid,
        click_view.keyword,
        click_view.keyword_info.text,
        click_view.keyword_info.match_type,
        campaign.name,
        ad_group.name,
        segments.date,
        segments.device
      FROM click_view
      WHERE segments.date = '2026-10-08'
    `;
    const clickResults = await queryGoogleAds(clickQuery);
    console.log("Clicks on 2026-10-08:", JSON.stringify(clickResults, null, 2));
  } catch (e: any) {
    console.error("Click query 2026-10-08 error:", e.message);
  }

  console.log("\n=== 2. Click View for 2026-10-09 ===");
  try {
    const clickQueryToday = `
      SELECT 
        click_view.gclid,
        click_view.keyword,
        click_view.keyword_info.text,
        click_view.keyword_info.match_type,
        campaign.name,
        ad_group.name,
        segments.date,
        segments.device
      FROM click_view
      WHERE segments.date = '2026-10-09'
    `;
    const clickTodayResults = await queryGoogleAds(clickQueryToday);
    console.log("Clicks on 2026-10-09:", JSON.stringify(clickTodayResults, null, 2));
  } catch (e: any) {
    console.error("Click query 2026-10-09 error:", e.message);
  }

  console.log("\n=== 3. Geographic View (All historical) ===");
  try {
    const geoQuery = `
      SELECT 
        geographic_view.country_criterion_id,
        geographic_view.location_type,
        segments.date,
        campaign.name,
        metrics.clicks,
        metrics.impressions,
        metrics.cost_micros
      FROM geographic_view
      WHERE segments.date DURING LAST_30_DAYS
        AND metrics.clicks > 0
    `;
    const geoResults = await queryGoogleAds(geoQuery);
    console.log("Geographic View:", JSON.stringify(geoResults, null, 2));
  } catch (e: any) {
    console.error("Geo error:", e.message);
  }

  console.log("\n=== 4. All Search Terms Across Last 30 Days ===");
  try {
    const searchTermsQuery = `
      SELECT 
        search_term_view.search_term,
        search_term_view.status,
        segments.date,
        ad_group.name,
        metrics.clicks,
        metrics.impressions,
        metrics.cost_micros
      FROM search_term_view
      WHERE segments.date DURING LAST_30_DAYS
      ORDER BY segments.date DESC, metrics.clicks DESC
    `;
    const searchResults = await queryGoogleAds(searchTermsQuery);
    console.log("Search Terms:", JSON.stringify(searchResults, null, 2));
  } catch (e: any) {
    console.error("Search terms error:", e.message);
  }
}

main().catch(console.error);
