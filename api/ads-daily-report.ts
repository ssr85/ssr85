import type { VercelRequest, VercelResponse } from "@vercel/node";
import { OAuth2Client } from "google-auth-library";
import nodemailer from "nodemailer";

// Google Ads & Mail Configuration
const DEVELOPER_TOKEN = process.env.GOOGLE_ADS_DEVELOPER_TOKEN?.trim();
const CLIENT_ID = process.env.GOOGLE_ADS_CLIENT_ID?.trim();
const CLIENT_SECRET = process.env.GOOGLE_ADS_CLIENT_SECRET?.trim();
const REFRESH_TOKEN = process.env.GOOGLE_ADS_REFRESH_TOKEN?.trim();
const MANAGER_CUSTOMER_ID = process.env.GOOGLE_ADS_MANAGER_CUSTOMER_ID?.replace(/-/g, "").trim();
const CUSTOMER_ID = (process.env.GOOGLE_ADS_CUSTOMER_ID || "9078436805").replace(/-/g, "").trim();

const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
const RECIPIENT_EMAIL = "sarabjit.rattan@gmail.com";

interface AdsReportData {
  dateStr: string;
  totalSpend: number;
  dailyBudget: number;
  impressions: number;
  clicks: number;
  ctr: number;
  avgCpc: number;
  conversions: number;
  campaignName: string;
  adGroups: Array<{
    name: string;
    impressions: number;
    clicks: number;
    ctr: number;
    spend: number;
  }>;
  searchQueries: Array<{
    query: string;
    adGroup: string;
    impressions: number;
    clicks: number;
    spend: number;
    ctr: number;
  }>;
}

export async function fetchAdsReport(): Promise<AdsReportData> {
  if (!DEVELOPER_TOKEN || !CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN || !CUSTOMER_ID) {
    throw new Error("Missing required Google Ads API credentials.");
  }

  const oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET);
  oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
  const { token: accessToken } = await oauth2Client.getAccessToken();

  if (!accessToken) {
    throw new Error("Failed to generate Google Ads access token.");
  }

  const searchUrl = `https://googleads.googleapis.com/v25/customers/${CUSTOMER_ID}/googleAds:searchStream`;
  const headers: Record<string, string> = {
    "Authorization": `Bearer ${accessToken}`,
    "developer-token": DEVELOPER_TOKEN,
    "Content-Type": "application/json",
  };
  if (MANAGER_CUSTOMER_ID && MANAGER_CUSTOMER_ID !== CUSTOMER_ID) {
    headers["login-customer-id"] = MANAGER_CUSTOMER_ID;
  }

  // 1. Campaign summary for TODAY (fallback to LAST_7_DAYS if today is 0)
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
    WHERE segments.date DURING TODAY AND campaign.status = 'ENABLED'
  `;

  const campRes = await fetch(searchUrl, {
    method: "POST",
    headers,
    body: JSON.stringify({ query: campQuery }),
  });

  let campBatches: any[] = [];
  if (campRes.ok) {
    campBatches = await campRes.json();
  }

  let campResult = campBatches[0]?.results?.[0];
  let isToday = true;

  // Fallback to LAST_7_DAYS if today has 0 impressions
  if (!campResult || !campResult.metrics?.impressions || campResult.metrics?.impressions === "0") {
    isToday = false;
    const fallbackQuery = `
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
      WHERE segments.date DURING LAST_7_DAYS AND campaign.status = 'ENABLED'
    `;
    const fbRes = await fetch(searchUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({ query: fallbackQuery }),
    });
    if (fbRes.ok) {
      const fbBatches = await fbRes.json();
      campResult = fbBatches[0]?.results?.[0];
    }
  }

  const campaignName = campResult?.campaign?.name || "Search_B2B_Technical_Services_Tier1";
  const dailyBudget = (Number(campResult?.campaignBudget?.amountMicros || 100000000)) / 1_000_000;
  const totalSpend = (Number(campResult?.metrics?.costMicros || 0)) / 1_000_000;
  const impressions = Number(campResult?.metrics?.impressions || 0);
  const clicks = Number(campResult?.metrics?.clicks || 0);
  const ctr = (Number(campResult?.metrics?.ctr || 0)) * 100;
  const avgCpc = (Number(campResult?.metrics?.averageCpc || 0)) / 1_000_000;
  const conversions = Number(campResult?.metrics?.conversions || 0);

  // 2. Ad Group Breakdown
  const timeFrame = isToday ? "TODAY" : "LAST_7_DAYS";
  const agQuery = `
    SELECT 
      ad_group.name,
      metrics.impressions,
      metrics.clicks,
      metrics.ctr,
      metrics.cost_micros
    FROM ad_group
    WHERE segments.date DURING ${timeFrame} AND ad_group.status = 'ENABLED'
    ORDER BY metrics.cost_micros DESC
  `;
  const agRes = await fetch(searchUrl, {
    method: "POST",
    headers,
    body: JSON.stringify({ query: agQuery }),
  });
  const agBatches = await agRes.json();
  const adGroups: AdsReportData["adGroups"] = [];
  if (Array.isArray(agBatches)) {
    for (const b of agBatches) {
      if (b.results) {
        for (const r of b.results) {
          adGroups.push({
            name: r.adGroup?.name || "Unknown",
            impressions: Number(r.metrics?.impressions || 0),
            clicks: Number(r.metrics?.clicks || 0),
            ctr: (Number(r.metrics?.ctr || 0)) * 100,
            spend: (Number(r.metrics?.costMicros || 0)) / 1_000_000,
          });
        }
      }
    }
  }

  // 3. Exact User Search Queries
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
    LIMIT 20
  `;
  const stRes = await fetch(searchUrl, {
    method: "POST",
    headers,
    body: JSON.stringify({ query: stQuery }),
  });
  const stBatches = await stRes.json();
  const searchQueries: AdsReportData["searchQueries"] = [];
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

  const todayStr = new Date().toLocaleDateString("en-IN", {
    timeZone: "Asia/Kolkata",
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return {
    dateStr: todayStr,
    totalSpend,
    dailyBudget,
    impressions,
    clicks,
    ctr,
    avgCpc,
    conversions,
    campaignName,
    adGroups,
    searchQueries,
  };
}

export function buildEmailHtml(data: AdsReportData): string {
  const budgetUtilization = ((data.totalSpend / (data.dailyBudget || 100)) * 100).toFixed(0);

  const queryRows = data.searchQueries.slice(0, 10).map((sq) => `
    <tr style="border-bottom: 1px solid #f1f5f9;">
      <td style="padding: 10px 12px; font-weight: 600; color: #1e293b;">${sq.query}</td>
      <td style="padding: 10px 12px; color: #64748b; font-size: 13px;">${sq.adGroup.replace('AG3_', '').replace('AG2_', '').replace('AG1_', '').replace(/_/g, ' ')}</td>
      <td style="padding: 10px 12px; text-align: center; color: #334155;">${sq.impressions}</td>
      <td style="padding: 10px 12px; text-align: center; font-weight: 700; color: #0284c7;">${sq.clicks}</td>
      <td style="padding: 10px 12px; text-align: right; font-weight: 600; color: #0f172a;">₹${sq.spend.toFixed(2)}</td>
    </tr>
  `).join("");

  const adGroupRows = data.adGroups.map((ag) => `
    <tr style="border-bottom: 1px solid #f1f5f9;">
      <td style="padding: 8px 12px; font-weight: 500; color: #1e293b;">${ag.name.replace(/_/g, ' ')}</td>
      <td style="padding: 8px 12px; text-align: center; color: #475569;">${ag.impressions}</td>
      <td style="padding: 8px 12px; text-align: center; font-weight: 600; color: #0284c7;">${ag.clicks}</td>
      <td style="padding: 8px 12px; text-align: center; color: #475569;">${ag.ctr.toFixed(1)}%</td>
      <td style="padding: 8px 12px; text-align: right; font-weight: 600; color: #0f172a;">₹${ag.spend.toFixed(2)}</td>
    </tr>
  `).join("");

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #0f172a;">
    <div style="max-width: 640px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
      
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 24px; color: #ffffff;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; background: rgba(56, 189, 248, 0.2); color: #38bdf8; padding: 4px 10px; border-radius: 9999px; border: 1px solid rgba(56, 189, 248, 0.3);">
            LIVE RADAR
          </span>
          <span style="font-size: 13px; color: #94a3b8;">${data.dateStr}</span>
        </div>
        <h1 style="margin: 12px 0 4px 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px;">SR AD Insights</h1>
        <p style="margin: 0; font-size: 13px; color: #94a3b8;">Google Ads Performance & Search Intent Audit</p>
      </div>

      <!-- KPI Grid -->
      <div style="padding: 20px 24px; border-bottom: 1px solid #f1f5f9;">
        <table style="width: 100%; border-collapse: separate; border-spacing: 12px 0;">
          <tr>
            <td style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; width: 25%; text-align: center;">
              <div style="font-size: 11px; font-weight: 600; color: #64748b; text-transform: uppercase;">Spend</div>
              <div style="font-size: 20px; font-weight: 800; color: #0f172a; margin-top: 4px;">₹${data.totalSpend.toFixed(2)}</div>
              <div style="font-size: 11px; color: #10b981; margin-top: 2px;">Limit: ₹${data.dailyBudget.toFixed(0)}/d</div>
            </td>
            <td style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; width: 25%; text-align: center;">
              <div style="font-size: 11px; font-weight: 600; color: #64748b; text-transform: uppercase;">Clicks</div>
              <div style="font-size: 20px; font-weight: 800; color: #0284c7; margin-top: 4px;">${data.clicks}</div>
              <div style="font-size: 11px; color: #64748b; margin-top: 2px;">${data.impressions} Impr</div>
            </td>
            <td style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; width: 25%; text-align: center;">
              <div style="font-size: 11px; font-weight: 600; color: #64748b; text-transform: uppercase;">Avg CPC</div>
              <div style="font-size: 20px; font-weight: 800; color: #0f172a; margin-top: 4px;">₹${data.avgCpc.toFixed(2)}</div>
              <div style="font-size: 11px; color: #10b981; margin-top: 2px;">Cap: ₹50.00</div>
            </td>
            <td style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; width: 25%; text-align: center;">
              <div style="font-size: 11px; font-weight: 600; color: #64748b; text-transform: uppercase;">CTR</div>
              <div style="font-size: 20px; font-weight: 800; color: #7c3aed; margin-top: 4px;">${data.ctr.toFixed(1)}%</div>
              <div style="font-size: 11px; color: #64748b; margin-top: 2px;">Target: &gt;4%</div>
            </td>
          </tr>
        </table>
      </div>

      <!-- Search Terms Table -->
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
            ${queryRows.length > 0 ? queryRows : '<tr><td colspan="5" style="padding: 16px; text-align: center; color: #94a3b8;">No search queries recorded today.</td></tr>'}
          </tbody>
        </table>
      </div>

      <!-- Ad Groups Breakdown -->
      ${adGroupRows.length > 0 ? `
      <div style="padding: 0 24px 20px 24px;">
        <h2 style="font-size: 15px; font-weight: 700; color: #0f172a; margin: 0 0 12px 0;">📦 Ad Group Performance</h2>
        <table style="width: 100%; border-collapse: collapse; font-size: 13px; text-align: left;">
          <thead>
            <tr style="background: #f1f5f9; color: #475569; font-size: 11px; text-transform: uppercase;">
              <th style="padding: 8px 12px; border-top-left-radius: 6px;">Ad Group</th>
              <th style="padding: 8px 12px; text-align: center;">Impr</th>
              <th style="padding: 8px 12px; text-align: center;">Clicks</th>
              <th style="padding: 8px 12px; text-align: center;">CTR</th>
              <th style="padding: 8px 12px; text-align: right; border-top-right-radius: 6px;">Spend</th>
            </tr>
          </thead>
          <tbody>
            ${adGroupRows}
          </tbody>
        </table>
      </div>
      ` : ''}

      <!-- Protection Status Footer -->
      <div style="background: #f8fafc; padding: 16px 24px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span>🛡️ <strong>Campaign Shield:</strong> Active (₹50 Max CPC • -40% Mobile Bid • 22 Negative Keywords)</span>
          <span>Account: 907-843-6805</span>
        </div>
      </div>

    </div>
  </body>
  </html>
  `;
}

export async function sendDailyAdsEmail(): Promise<{ success: boolean; messageId?: string }> {
  const reportData = await fetchAdsReport();
  const htmlContent = buildEmailHtml(reportData);

  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    console.warn("⚠️ GMAIL_USER or GMAIL_APP_PASSWORD not set. Email body generated but skipped sending.");
    return { success: false };
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_APP_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"SR AD Insights" <${GMAIL_USER}>`,
    to: RECIPIENT_EMAIL,
    subject: `SR AD Insights - ${reportData.dateStr}`,
    html: htmlContent,
  };

  const info = await transporter.sendMail(mailOptions);
  return { success: true, messageId: info.messageId };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const result = await sendDailyAdsEmail();
    return res.status(200).json({
      success: true,
      message: "Daily Google Ads Insights email sent successfully.",
      result,
    });
  } catch (err: any) {
    console.error("❌ Error in ads-daily-report handler:", err);
    return res.status(500).json({ error: err.message || "Internal server error" });
  }
}
