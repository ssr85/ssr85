import { createClient } from "@supabase/supabase-js";
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

const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!url || !key) {
  console.log("No Supabase URL or Key found");
  process.exit(0);
}

const supabase = createClient(url, key);

async function checkLeads() {
  console.log("=== Checking service_leads ===");
  const { data: serviceLeads, error: slErr } = await supabase
    .from("service_leads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(10);

  if (slErr) console.error("service_leads err:", slErr);
  else console.log("service_leads:", JSON.stringify(serviceLeads, null, 2));

  console.log("\n=== Checking enquiries ===");
  const { data: enquiries, error: enqErr } = await supabase
    .from("enquiries")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(10);

  if (enqErr) console.error("enquiries err:", enqErr);
  else console.log("enquiries:", JSON.stringify(enquiries, null, 2));
}

checkLeads();
