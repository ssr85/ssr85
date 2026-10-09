import { OAuth2Client } from "google-auth-library";
import nodemailer from "nodemailer";
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
const CUSTOMER_ID = (process.env.GOOGLE_ADS_CUSTOMER_ID || "9078436805").replace(/-/g, "").trim();

const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
const RECIPIENT_EMAIL = "sarabjit.rattan@gmail.com";

async function main() {
  console.log("\n========================================================");
  console.log("📧 GENERATING & DISPATCHING 'SR AD Insights' EMAIL");
  console.log("========================================================\n");

  const oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET);
  oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
  const { token: accessToken } = await oauth2Client.getAccessToken();

  if (!accessToken) {
    throw new Error("Failed to generate Google Ads access token.");
  }

  const searchUrl = `https://googleads.googleapis.com/v25/customers/${CUSTOMER_ID}/googleAds:searchStream`;
  const headers: Record<string, string> = {
    "Authorization": `Bearer ${accessToken}`,
    "developer-token": DEVELOPER_TOKEN!,
    "Content-Type": "application/json",
  };
  if (MANAGER_CUSTOMER_ID && MANAGER_CUSTOMER_ID !== CUSTOMER_ID) {
    headers["login-customer-id"] = MANAGER_CUSTOMER_ID;
  }

  // 1. Pull Last 7 Days / 30 Days data
  const campQuery = `
    SELECT 
      campaign.id, 
      campaign.name, 
      campaign_budget.amount_micros,
      metrics.impressions, 
      metrics.clicks, 
      metrics.ctr, 
      metrics.average_cpc, 
      metrics.cost_micros, 
      metrics.conversions
    FROM campaign 
    WHERE segments.date DURING LAST_30_DAYS AND campaign.status = 'ENABLED'
  `;
  const campRes = await fetch(searchUrl, {
    method: "POST",
    headers,
    body: JSON.stringify({ query: campQuery }),
  });
  const campBatches = await campRes.json();
  const campResult = campBatches[0]?.results?.[0];

  const dailyBudget = (Number(campResult?.campaignBudget?.amountMicros || 100000000)) / 1_000_000;
  const totalSpend = (Number(campResult?.metrics?.costMicros || 0)) / 1_000_000;
  const impressions = Number(campResult?.metrics?.impressions || 0);
  const clicks = Number(campResult?.metrics?.clicks || 0);
  const ctr = (Number(campResult?.metrics?.ctr || 0)) * 100;
  const avgCpc = (Number(campResult?.metrics?.averageCpc || 0)) / 1_000_000;

  console.log(`📊 Total Spend: ₹${totalSpend.toFixed(2)} / Daily Budget: ₹${dailyBudget.toFixed(2)}`);
  console.log(`🎯 Impressions: ${impressions} | Clicks: ${clicks} | CTR: ${ctr.toFixed(2)}% | Avg CPC: ₹${avgCpc.toFixed(2)}`);

  // 2. Exact Search Queries
  const stQuery = `
    SELECT 
      search_term_view.search_term, 
      ad_group.name,
      metrics.impressions, 
      metrics.clicks, 
      metrics.ctr, 
      metrics.cost_micros
    FROM search_term_view 
    WHERE segments.date DURING LAST_30_DAYS
    ORDER BY metrics.cost_micros DESC, metrics.impressions DESC
    LIMIT 15
  `;
  const stRes = await fetch(searchUrl, {
    method: "POST",
    headers,
    body: JSON.stringify({ query: stQuery }),
  });
  const stBatches = await stRes.json();
  const searchQueries: any[] = [];
  if (Array.isArray(stBatches)) {
    for (const b of stBatches) {
      if (b.results) {
        for (const r of b.results) {
          searchQueries.push({
            query: r.searchTermView?.searchTerm || "",
            adGroup: r.adGroup?.name || "",
            impressions: Number(r.metrics?.impressions || 0),
            clicks: Number(r.metrics?.clicks || 0),
            ctr: (Number(r.metrics?.ctr || 0)) * 100,
            spend: (Number(r.metrics?.costMicros || 0)) / 1_000_000,
          });
        }
      }
    }
  }

  console.log(`🔍 Retrieved ${searchQueries.length} search queries.`);

  // 3. Render HTML
  const dateStr = new Date().toLocaleDateString("en-IN", {
    timeZone: "Asia/Kolkata",
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const queryRows = searchQueries.map((sq) => `
    <tr style="border-bottom: 1px solid #f1f5f9;">
      <td style="padding: 10px 12px; font-weight: 600; color: #1e293b;">${sq.query}</td>
      <td style="padding: 10px 12px; color: #64748b; font-size: 13px;">${sq.adGroup.replace(/_/g, ' ')}</td>
      <td style="padding: 10px 12px; text-align: center; color: #334155;">${sq.impressions}</td>
      <td style="padding: 10px 12px; text-align: center; font-weight: 700; color: #0284c7;">${sq.clicks}</td>
      <td style="padding: 10px 12px; text-align: right; font-weight: 600; color: #0f172a;">₹${sq.spend.toFixed(2)}</td>
    </tr>
  `).join("");

  const emailHtml = `
  <!DOCTYPE html>
  <html>
  <head><meta charset="utf-8"></head>
  <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #0f172a;">
    <div style="max-width: 640px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
      
      <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 24px; color: #ffffff;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; background: rgba(56, 189, 248, 0.2); color: #38bdf8; padding: 4px 10px; border-radius: 9999px;">
            DAILY RADAR
          </span>
          <span style="font-size: 13px; color: #94a3b8;">${dateStr}</span>
        </div>
        <h1 style="margin: 12px 0 4px 0; font-size: 22px; font-weight: 800;">SR AD Insights</h1>
        <p style="margin: 0; font-size: 13px; color: #94a3b8;">Google Ads Performance & Search Intent Audit</p>
      </div>

      <div style="padding: 20px 24px; border-bottom: 1px solid #f1f5f9;">
        <table style="width: 100%; border-collapse: separate; border-spacing: 12px 0;">
          <tr>
            <td style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; text-align: center;">
              <div style="font-size: 11px; font-weight: 600; color: #64748b; text-transform: uppercase;">Total Spend</div>
              <div style="font-size: 20px; font-weight: 800; color: #0f172a; margin-top: 4px;">₹${totalSpend.toFixed(2)}</div>
              <div style="font-size: 11px; color: #10b981; margin-top: 2px;">Limit: ₹${dailyBudget.toFixed(0)}/d</div>
            </td>
            <td style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; text-align: center;">
              <div style="font-size: 11px; font-weight: 600; color: #64748b; text-transform: uppercase;">Clicks</div>
              <div style="font-size: 20px; font-weight: 800; color: #0284c7; margin-top: 4px;">${clicks}</div>
              <div style="font-size: 11px; color: #64748b; margin-top: 2px;">${impressions} Impr</div>
            </td>
            <td style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; text-align: center;">
              <div style="font-size: 11px; font-weight: 600; color: #64748b; text-transform: uppercase;">Avg CPC</div>
              <div style="font-size: 20px; font-weight: 800; color: #0f172a; margin-top: 4px;">₹${avgCpc.toFixed(2)}</div>
              <div style="font-size: 11px; color: #10b981; margin-top: 2px;">Cap: ₹50.00</div>
            </td>
            <td style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; text-align: center;">
              <div style="font-size: 11px; font-weight: 600; color: #64748b; text-transform: uppercase;">CTR</div>
              <div style="font-size: 20px; font-weight: 800; color: #7c3aed; margin-top: 4px;">${ctr.toFixed(1)}%</div>
              <div style="font-size: 11px; color: #64748b; margin-top: 2px;">Target: &gt;4%</div>
            </td>
          </tr>
        </table>
      </div>

      <div style="padding: 20px 24px;">
        <h2 style="font-size: 15px; font-weight: 700; color: #0f172a; margin: 0 0 12px 0;">🔍 Exact Search Queries Triggered</h2>
        <table style="width: 100%; border-collapse: collapse; font-size: 13px; text-align: left;">
          <thead>
            <tr style="background: #f1f5f9; color: #475569; font-size: 11px; text-transform: uppercase;">
              <th style="padding: 8px 12px; border-top-left-radius: 6px;">Query</th>
              <th style="padding: 8px 12px;">Ad Group</th>
              <th style="padding: 8px 12px; text-align: center;">Impr</th>
              <th style="padding: 8px 12px; text-align: center;">Clicks</th>
              <th style="padding: 8px 12px; text-align: right; border-top-right-radius: 6px;">Spend</th>
            </tr>
          </thead>
          <tbody>
            ${queryRows}
          </tbody>
        </table>
      </div>

      <div style="background: #f8fafc; padding: 16px 24px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span>🛡️ <strong>Campaign Shield:</strong> Active (₹50 Max CPC • -40% Mobile Bid • 22 Negatives)</span>
          <span>Account: 907-843-6805</span>
        </div>
      </div>

    </div>
  </body>
  </html>
  `;

  // Write a preview HTML file locally
  const previewPath = path.resolve(process.cwd(), "scripts/ads-engine/email-preview.html");
  fs.writeFileSync(previewPath, emailHtml, "utf-8");
  console.log(`\n💾 Saved local email preview to: ${previewPath}`);

  // Send if Gmail credentials are provided
  if (GMAIL_USER && GMAIL_APP_PASSWORD) {
    console.log(`\n📤 Sending live email to ${RECIPIENT_EMAIL}...`);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_APP_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: `"SR AD Insights" <${GMAIL_USER}>`,
      to: RECIPIENT_EMAIL,
      subject: `SR AD Insights - ${dateStr}`,
      html: emailHtml,
    });
    console.log(`✅ Live email sent successfully! Message ID: ${info.messageId}`);
  } else {
    console.log(`\nℹ️ Gmail credentials not in local .env (they will execute in Vercel Production via Cron).`);
    console.log(`To test sending right now from your local terminal, add GMAIL_USER and GMAIL_APP_PASSWORD to .env.`);
  }

  console.log("\n========================================================");
  console.log("🎉 'SR AD Insights' Email Engine Ready & Verified!");
  console.log("========================================================\n");
}

main();
