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

async function upgradeGdprAd() {
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

  // 1. Find GDPR Ad Group ID
  const agQueryRes = await fetch(searchUrl, {
    method: "POST",
    headers,
    body: JSON.stringify({
      query: `SELECT ad_group.id, ad_group.name, ad_group.status FROM ad_group WHERE ad_group.status = 'ENABLED'`
    }),
  });
  const agData = await agQueryRes.json();
  const allAdGroups: any[] = [];
  if (Array.isArray(agData)) {
    for (const b of agData) {
      if (b.results) allAdGroups.push(...b.results);
    }
  }

  const gdprAdGroup = allAdGroups.find((r: any) => r.adGroup?.name?.toLowerCase().includes("gdpr"));
  if (!gdprAdGroup) {
    console.error("❌ GDPR Ad Group not found.");
    return;
  }

  const adGroupId = gdprAdGroup.adGroup.id;
  console.log(`🎯 GDPR Ad Group: ${gdprAdGroup.adGroup.name} (ID: ${adGroupId})`);

  // 2. Create the new High-Ad-Strength RSA
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
    { text: "Custom Privacy Engineering" },
    { text: "Fix Tracking & Analytics" },
  ];

  const newDescriptions = [
    { text: "Full technical EU GDPR & Google Consent Mode v2 implementation without breaking analytics." },
    { text: "Audit, cookie consent banner, data privacy architecture & sub-500ms speed. Built by SSR." },
    { text: "Avoid up to €20M regulatory fines. Guaranteed compliance for WordPress & custom web apps." },
    { text: "Schedule a direct consultation with Sarabjeet Rattan. 16+ years of technical experience." },
  ];

  const oldAdId = "826741801110";

  const adOps = [
    // Step A: Create new optimized RSA
    {
      create: {
        adGroup: `customers/${CUSTOMER_ID}/adGroups/${adGroupId}`,
        status: "ENABLED",
        ad: {
          finalUrls: ["https://sarabjeetrattan.com/insights/eu-gdpr-compliance-ecommerce-websites"],
          responsiveSearchAd: {
            headlines: newHeadlines,
            descriptions: newDescriptions,
          }
        }
      }
    },
    // Step B: Pause old weak RSA
    {
      updateMask: "status",
      update: {
        resourceName: `customers/${CUSTOMER_ID}/adGroupAds/${adGroupId}~${oldAdId}`,
        status: "PAUSED",
      }
    }
  ];

  const res = await fetch(adMutateUrl, {
    method: "POST",
    headers,
    body: JSON.stringify({ operations: adOps }),
  });

  if (!res.ok) {
    console.error("❌ RSA Creation Error:", await res.text());
  } else {
    const resData = await res.json();
    console.log("✅ New High-Strength EU GDPR RSA created successfully!");
    console.log("Created Ad Resource:", resData.results?.[0]?.resourceName);
    console.log("Old Ad Paused:", resData.results?.[1]?.resourceName);
  }
}

upgradeGdprAd();
