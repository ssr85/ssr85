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

async function run() {
  console.log("\n========================================================");
  console.log(`🚀 GOOGLE ADS LIVE PERFORMANCE REPORT: ACCOUNT ${CUSTOMER_ID}`);
  console.log("========================================================\n");

  // 1. Account / Campaign Summary
  const campaignQuery = `
    SELECT 
      campaign.id, 
      campaign.name, 
      campaign.status, 
      campaign.bidding_strategy_type,
      metrics.impressions, 
      metrics.clicks, 
      metrics.ctr, 
      metrics.average_cpc, 
      metrics.cost_micros, 
      metrics.conversions, 
      metrics.cost_per_conversion,
      metrics.search_impression_share,
      metrics.search_budget_lost_impression_share,
      metrics.search_rank_lost_impression_share
    FROM campaign 
    WHERE segments.date DURING LAST_30_DAYS
  `;
  const campaigns = await queryGoogleAds(campaignQuery);
  console.log("📊 CAMPAIGN OVERVIEW (LAST 30 DAYS):");
  console.table(
    campaigns.map((c: any) => ({
      Campaign: c.campaign?.name,
      Status: c.campaign?.status,
      Impressions: c.metrics?.impressions || 0,
      Clicks: c.metrics?.clicks || 0,
      CTR: `${((c.metrics?.ctr || 0) * 100).toFixed(2)}%`,
      "Avg CPC (₹)": ((c.metrics?.averageCpc || 0) / 1_000_000).toFixed(2),
      "Total Spend (₹)": ((c.metrics?.costMicros || 0) / 1_000_000).toFixed(2),
      Conversions: c.metrics?.conversions || 0,
      "Search IS": c.metrics?.searchImpressionShare ? `${(c.metrics?.searchImpressionShare * 100).toFixed(1)}%` : "N/A",
      "Lost IS (Budget)": c.metrics?.searchBudgetLostImpressionShare ? `${(c.metrics?.searchBudgetLostImpressionShare * 100).toFixed(1)}%` : "N/A",
      "Lost IS (Rank)": c.metrics?.searchRankLostImpressionShare ? `${(c.metrics?.searchRankLostImpressionShare * 100).toFixed(1)}%` : "N/A",
    }))
  );

  // 2. Ad Group Breakdown
  const adGroupQuery = `
    SELECT 
      ad_group.id,
      ad_group.name,
      ad_group.status,
      metrics.impressions,
      metrics.clicks,
      metrics.ctr,
      metrics.average_cpc,
      metrics.cost_micros,
      metrics.conversions
    FROM ad_group
    WHERE segments.date DURING LAST_30_DAYS
    ORDER BY metrics.cost_micros DESC
  `;
  const adGroups = await queryGoogleAds(adGroupQuery);
  console.log("\n📦 AD GROUP PERFORMANCE:");
  console.table(
    adGroups.map((ag: any) => ({
      "Ad Group": ag.adGroup?.name,
      Status: ag.adGroup?.status,
      Impressions: ag.metrics?.impressions || 0,
      Clicks: ag.metrics?.clicks || 0,
      CTR: `${((ag.metrics?.ctr || 0) * 100).toFixed(2)}%`,
      "Avg CPC (₹)": ((ag.metrics?.averageCpc || 0) / 1_000_000).toFixed(2),
      "Spend (₹)": ((ag.metrics?.costMicros || 0) / 1_000_000).toFixed(2),
      Conversions: ag.metrics?.conversions || 0,
    }))
  );

  // 3. Search Terms (What triggered the spend)
  const searchTermsQuery = `
    SELECT 
      search_term_view.search_term, 
      search_term_view.status,
      ad_group.name,
      metrics.impressions, 
      metrics.clicks, 
      metrics.ctr, 
      metrics.average_cpc, 
      metrics.cost_micros, 
      metrics.conversions
    FROM search_term_view 
    WHERE segments.date DURING LAST_30_DAYS
    ORDER BY metrics.cost_micros DESC, metrics.impressions DESC
    LIMIT 50
  `;
  const searchTerms = await queryGoogleAds(searchTermsQuery);
  console.log("\n🔍 EXACT SEARCH TERMS TRIGGERED BY USERS:");
  console.table(
    searchTerms.map((st: any) => ({
      "User Search Query": st.searchTermView?.searchTerm,
      "Ad Group": st.adGroup?.name,
      Impressions: st.metrics?.impressions || 0,
      Clicks: st.metrics?.clicks || 0,
      CTR: `${((st.metrics?.ctr || 0) * 100).toFixed(2)}%`,
      "Avg CPC (₹)": ((st.metrics?.averageCpc || 0) / 1_000_000).toFixed(2),
      "Spend (₹)": ((st.metrics?.costMicros || 0) / 1_000_000).toFixed(2),
      Conversions: st.metrics?.conversions || 0,
    }))
  );
}

run();
