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

async function executeOptimizations() {
  const { token: accessToken } = await oauth2Client.getAccessToken();
  const searchUrl = `https://googleads.googleapis.com/v25/customers/${CUSTOMER_ID}/googleAds:searchStream`;
  const headers: Record<string, string> = {
    "Authorization": `Bearer ${accessToken}`,
    "developer-token": DEVELOPER_TOKEN!,
    "Content-Type": "application/json",
  };
  if (MANAGER_CUSTOMER_ID && MANAGER_CUSTOMER_ID !== CUSTOMER_ID) {
    headers["login-customer-id"] = MANAGER_CUSTOMER_ID;
  }

  console.log("\n========================================================");
  console.log("🚀 EXECUTING GOOGLE ADS LIVE OPTIMIZATIONS");
  console.log("========================================================\n");

  // 1. Fetch Campaign ID
  const campRes = await fetch(searchUrl, {
    method: "POST",
    headers,
    body: JSON.stringify({
      query: "SELECT campaign.id, campaign.name FROM campaign WHERE campaign.status = 'ENABLED'"
    }),
  });
  const campData = await campRes.json();
  const campaignId = campData[0]?.results?.[0]?.campaign?.id || "24314044205";
  console.log(`🎯 Active Campaign ID: ${campaignId}`);

  // ----------------------------------------------------
  // ACTION 1: Reduce Mobile Bid by -40% (bidModifier = 0.6)
  // ----------------------------------------------------
  console.log("\n📱 1. Applying Mobile Device Bid Modifier (-40%)...");
  
  // Check if Mobile Campaign Criterion already exists
  const critQueryRes = await fetch(searchUrl, {
    method: "POST",
    headers,
    body: JSON.stringify({
      query: `
        SELECT 
          campaign_criterion.resource_name,
          campaign_criterion.device.type,
          campaign_criterion.bid_modifier
        FROM campaign_criterion
        WHERE campaign_criterion.type = 'DEVICE' AND campaign.id = ${campaignId}
      `
    }),
  });
  const critData = await critQueryRes.json();
  const existingMobileCrit = critData[0]?.results?.find(
    (r: any) => r.campaignCriterion?.device?.type === "MOBILE" || r.campaignCriterion?.device?.type === 3
  );

  const deviceMutateUrl = `https://googleads.googleapis.com/v25/customers/${CUSTOMER_ID}/campaignCriteria:mutate`;
  let deviceOps: any[] = [];

  if (existingMobileCrit) {
    console.log("Existing mobile criterion found, updating bid modifier to 0.60...");
    deviceOps = [{
      updateMask: "bid_modifier",
      update: {
        resourceName: existingMobileCrit.campaignCriterion.resourceName,
        bidModifier: 0.6,
      }
    }];
  } else {
    console.log("Creating new mobile device criterion with 0.60 bid modifier...");
    deviceOps = [{
      create: {
        campaign: `customers/${CUSTOMER_ID}/campaigns/${campaignId}`,
        device: {
          type: "MOBILE"
        },
        bidModifier: 0.6,
      }
    }];
  }

  const devMutateRes = await fetch(deviceMutateUrl, {
    method: "POST",
    headers,
    body: JSON.stringify({ operations: deviceOps }),
  });

  if (!devMutateRes.ok) {
    console.warn("⚠️ Device mutation response:", await devMutateRes.text());
  } else {
    console.log("✅ Mobile Bid Modifier successfully set to -40% (0.60x)!");
  }

  // ----------------------------------------------------
  // ACTION 2: Pause n8n Ad Group
  // ----------------------------------------------------
  console.log("\n⏸️ 2. Pausing n8n Ad Group (AG4_n8n_Workflow_Automation)...");
  const agQueryRes = await fetch(searchUrl, {
    method: "POST",
    headers,
    body: JSON.stringify({
      query: `SELECT ad_group.id, ad_group.name, ad_group.status FROM ad_group WHERE campaign.id = ${campaignId}`
    }),
  });
  const agData = await agQueryRes.json();
  const allAdGroups: any[] = [];
  if (Array.isArray(agData)) {
    for (const b of agData) {
      if (b.results) allAdGroups.push(...b.results);
    }
  }

  const n8nAdGroup = allAdGroups.find((r: any) => r.adGroup?.name?.toLowerCase().includes("n8n"));
  if (n8nAdGroup) {
    const agMutateUrl = `https://googleads.googleapis.com/v25/customers/${CUSTOMER_ID}/adGroups:mutate`;
    const agOps = [{
      updateMask: "status",
      update: {
        resourceName: n8nAdGroup.adGroup.resourceName,
        status: "PAUSED",
      }
    }];
    const agMutRes = await fetch(agMutateUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({ operations: agOps }),
    });
    if (agMutRes.ok) {
      console.log(`✅ Ad Group '${n8nAdGroup.adGroup.name}' (ID: ${n8nAdGroup.adGroup.id}) successfully PAUSED!`);
    } else {
      console.warn("⚠️ Ad Group pause error:", await agMutRes.text());
    }
  } else {
    console.log("ℹ️ n8n Ad Group not found or already disabled.");
  }

  // ----------------------------------------------------
  // ACTION 3: Upgrade EU GDPR Compliance Ad Copy & Strength
  // ----------------------------------------------------
  console.log("\n🛡️ 3. Upgrading EU GDPR Compliance Ad Copy (Ad ID: 826741801110)...");
  const gdprAdGroup = allAdGroups.find((r: any) => r.adGroup?.name?.toLowerCase().includes("gdpr"));
  
  if (gdprAdGroup) {
    const gdprAdId = "826741801110";
    const adMutateUrl = `https://googleads.googleapis.com/v25/customers/${CUSTOMER_ID}/adGroupAds:mutate`;

    const newHeadlines = [
      { text: "EU GDPR Compliance Dev" },
      { text: "Avoid Costly GDPR Fines" },
      { text: "Google Consent Mode v2" },
      { text: "Cookie Banner & Tech Fix" },
      { text: "WooCommerce GDPR Setup" },
      { text: "Full GDPR Site Audit" },
      { text: "Sell in EU Compliantly" },
      { text: "16+ Yrs Web Architecture" },
      { text: "Sub-500ms Clean Code" },
      { text: "Direct SSR Consultation" },
    ];

    const newDescriptions = [
      { text: "Full technical EU GDPR & Google Consent Mode v2 implementation without breaking analytics." },
      { text: "Audit, cookie consent banner, data privacy architecture & sub-500ms speed. Built by SSR." },
      { text: "Avoid up to €20M regulatory fines. Guaranteed compliance for WordPress & custom web apps." },
      { text: "Schedule a direct consultation with Sarabjeet Rattan. 16+ years of technical experience." },
    ];

    const adOps = [{
      updateMask: "ad.responsive_search_ad.headlines,ad.responsive_search_ad.descriptions",
      update: {
        resourceName: `customers/${CUSTOMER_ID}/adGroupAds/${gdprAdGroup.adGroup.id}~${gdprAdId}`,
        ad: {
          responsiveSearchAd: {
            headlines: newHeadlines,
            descriptions: newDescriptions,
          }
        }
      }
    }];

    const adMutRes = await fetch(adMutateUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({ operations: adOps }),
    });

    if (adMutRes.ok) {
      console.log("✅ EU GDPR Compliance Ad Copy updated with 10 high-intent headlines & 4 descriptions!");
    } else {
      console.warn("⚠️ Ad copy update response:", await adMutRes.text());
    }
  }

  console.log("\n========================================================");
  console.log("🎉 All Live Google Ads Campaign Optimizations Completed!");
  console.log("========================================================\n");
}

executeOptimizations();
