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

const BID_CAP_INR = 50; // ₹50.00 (within ₹45-₹60 range)
const BID_CAP_MICROS = BID_CAP_INR * 1_000_000;

async function updateBidCap() {
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

  // 1. Fetch current campaign details
  const query = `
    SELECT 
      campaign.id, 
      campaign.name, 
      campaign.bidding_strategy_type,
      campaign.target_spend.cpc_bid_ceiling_micros
    FROM campaign 
    WHERE campaign.status = 'ENABLED'
  `;
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

  const c = campaigns[0].campaign;
  console.log(`\n🎯 Campaign: ${c.name} (ID: ${c.id})`);
  console.log(`Current Bidding Strategy: ${c.biddingStrategyType}`);
  console.log(`Current Bid Ceiling: ${c.targetSpend?.cpcBidCeilingMicros ? `₹${c.targetSpend.cpcBidCeilingMicros / 1_000_000}` : "None (Unlimited / Automatic)"}`);

  // 2. Mutate Campaign to set Max CPC Bid Cap
  const operations = [
    {
      updateMask: "target_spend.cpc_bid_ceiling_micros",
      update: {
        resourceName: `customers/${CUSTOMER_ID}/campaigns/${c.id}`,
        targetSpend: {
          cpcBidCeilingMicros: BID_CAP_MICROS.toString(),
        },
      },
    },
  ];

  const mutateUrl = `https://googleads.googleapis.com/v25/customers/${CUSTOMER_ID}/campaigns:mutate`;
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
    console.log(`\n✅ Successfully updated Max CPC Bid Cap to ₹${BID_CAP_INR}.00 on Maximize Clicks!`);
    console.log("Mutated Resource:", mutateData.results?.[0]?.resourceName);
  }
}

updateBidCap();
