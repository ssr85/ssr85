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

const NEGATIVE_KEYWORDS_TO_ADD = [
  "makeyourwp",
  "generatepress",
  "avada",
  "divi",
  "breakdance",
  "snapwp",
  "frontity",
  "elementor pro",
  "shopify",
  "animation",
  "free",
  "tutorial",
  "course",
  "job",
  "jobs",
  "salary",
  "resume",
  "fiverr",
  "upwork",
  "cracked",
  "nulled",
  "cheap"
];

async function addNegativeKeywords() {
  const { token: accessToken } = await oauth2Client.getAccessToken();

  // 1. Get Active Campaign ID
  const searchUrl = `https://googleads.googleapis.com/v25/customers/${CUSTOMER_ID}/googleAds:searchStream`;
  const headers: Record<string, string> = {
    "Authorization": `Bearer ${accessToken}`,
    "developer-token": DEVELOPER_TOKEN!,
    "Content-Type": "application/json",
  };
  if (MANAGER_CUSTOMER_ID && MANAGER_CUSTOMER_ID !== CUSTOMER_ID) {
    headers["login-customer-id"] = MANAGER_CUSTOMER_ID;
  }

  const query = `SELECT campaign.id, campaign.name FROM campaign WHERE campaign.status = 'ENABLED'`;
  const res = await fetch(searchUrl, {
    method: "POST",
    headers,
    body: JSON.stringify({ query }),
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch campaigns: ${await res.text()}`);
  }

  const batches = await res.json();
  const campaigns: any[] = [];
  for (const b of batches) {
    if (b.results) campaigns.push(...b.results);
  }

  if (campaigns.length === 0) {
    console.error("❌ No enabled campaigns found.");
    return;
  }

  const campaign = campaigns[0].campaign;
  console.log(`\n🎯 Target Campaign: ${campaign.name} (ID: ${campaign.id})`);
  console.log(`➕ Adding ${NEGATIVE_KEYWORDS_TO_ADD.length} Negative Keywords...`);

  // 2. Build Campaign Criterion Mutate Operations
  const operations = NEGATIVE_KEYWORDS_TO_ADD.map((kw) => ({
    create: {
      campaign: `customers/${CUSTOMER_ID}/campaigns/${campaign.id}`,
      negative: true,
      keyword: {
        text: kw,
        matchType: "BROAD",
      },
    },
  }));

  const mutateUrl = `https://googleads.googleapis.com/v25/customers/${CUSTOMER_ID}/campaignCriteria:mutate`;
  const mutateRes = await fetch(mutateUrl, {
    method: "POST",
    headers,
    body: JSON.stringify({ operations }),
  });

  if (!mutateRes.ok) {
    const err = await mutateRes.text();
    console.error(`\n❌ Mutation error: ${err}`);
  } else {
    const mutateData = await mutateRes.json();
    console.log(`\n✅ Successfully added ${mutateData.results?.length || NEGATIVE_KEYWORDS_TO_ADD.length} negative keywords directly to Google Ads!`);
    console.log("Negative Keywords Applied:");
    console.log(NEGATIVE_KEYWORDS_TO_ADD.map(k => ` • "${k}"`).join("\n"));
  }
}

addNegativeKeywords();
