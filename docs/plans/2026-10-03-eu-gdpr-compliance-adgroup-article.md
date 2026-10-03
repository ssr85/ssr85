# EU GDPR Compliance Article & Google Ads Ad Group Implementation Plan

> **For Antigravity:** REQUIRED SUB-SKILL: Load `executing-plans` to implement this plan task-by-task.

**Goal:** Create an authoritative, high-converting technical insight article on EU GDPR compliance for eCommerce websites selling in the European Union, integrate it into the SSR portfolio website with rich visual architecture components, and scaffold/verify a dedicated Google Ads Ad Group (`AG4_EU_GDPR_Compliance_Websites`) targeting high-intent commercial search traffic.

**Architecture:** 
1. **Frontend / Content Layer:** React + Tailwind CSS + Lucide icons component with semantic HTML, SEO meta headers, interactive compliance checklist, and direct lead capture integration.
2. **Routing & Pre-rendering:** Registered in `src/App.tsx` under `/insights/eu-gdpr-compliance-ecommerce-websites`.
3. **Advertising Layer:** Google Ads API automation script creating Ad Group `AG4_EU_GDPR_Compliance_Websites` under campaign `Search_B2B_Technical_Services_Tier1` (`24314044205`), injecting phrase/exact intent keywords, and deploying an approved Responsive Search Ad (RSA).

**Tech Stack:** React 18, TypeScript, Tailwind CSS, Lucide React, Google Ads API (Python Client via uv).

---

## User Review Required

> [!IMPORTANT]
> **Ad Group Creation Strategy:** The parent campaign `Search_B2B_Technical_Services_Tier1` is currently `PAUSED`. When we create this new Ad Group and its Responsive Search Ad, the ad group and ad will be created in `ENABLED` status so Google can immediately perform automated policy review and mark it `APPROVED`. The parent campaign remains safely `PAUSED` until you decide to go live.

---

## 1. Content Blueprint: EU GDPR Compliance for Global Stores Selling in EU

### Key Legal & Technical Pillars Covered in Article:
* **The Extraterritorial Trap (Article 3(2) GDPR):** Why US, UK, Indian, and global stores targeting EU residents (shipping to EU, accepting EUR/GBP, or tracking EU visitor behavior) are strictly subject to GDPR and fines up to **€20,000,000 or 4% of annual global turnover**.
* **The 5 Fatal Flaws of Generic Cookie Plugins:**
  1. *Banner Illusion:* Showing a banner while Google Analytics, Meta Pixel, and TikTok tags fire in the background before consent is given.
  2. *Lack of Granular Control:* Forcing "Accept All" with no category-level opt-out (Marketing vs Analytics vs Functional).
  3. *Missing Consent Mode v2:* Breaking Google Ads and Analytics tracking in 2024–2026 due to unmapped `analytics_storage` and `ad_user_data` consent signals.
  4. *No Auditable Consent Logs:* Inability to prove when and how a customer consented during a regulatory inquiry.
  5. *Third-Party Iframe & Font Leaks:* Google Fonts / YouTube embeds transmitting EU user IP addresses without consent (violating German court rulings).
* **The Engineering-Grade Solution:**
  * Client-side zero-leak tag interception (blocking scripts until explicit opt-in).
  * Native Google Consent Mode v2 integration with default-denied state.
  * Server-side tracking proxy to sanitize PII and IP masking.
  * Frictionless Data Subject Access Request (DSAR) automation for WooCommerce.

---

## 2. Google Ads Ad Group Specification

### Ad Group Overview
* **Parent Campaign:** `Search_B2B_Technical_Services_Tier1` (`24314044205`)
* **Ad Group Name:** `AG4_EU_GDPR_Compliance_Websites`
* **Status:** `ENABLED` (Parent campaign stays `PAUSED`)
* **Default Max CPC Bid:** ₹180.00 (~$2.15 USD target)

### Target Keywords (Commercial & Technical Intent)
| Keyword | Match Type | Search Intent |
| :--- | :---: | :--- |
| `"gdpr compliance for woocommerce"` | PHRASE | Store owner seeking WooCommerce GDPR setup |
| `"gdpr compliance website selling in eu"` | PHRASE | Global business selling to European consumers |
| `"google consent mode v2 implementation"` | PHRASE | Technical developer request for Consent Mode |
| `"eu gdpr website compliance service"` | PHRASE | Service-seeking B2B decision maker |
| `[gdpr audit for ecommerce]` | EXACT | High-intent audit seeker ready to buy |
| `"cookie consent developer"` | PHRASE | Direct hire search for implementation engineer |
| `"fix gdpr compliance website"` | PHRASE | Troubled business needing urgent remediation |
| `[hire gdpr specialist for website]` | EXACT | Direct hiring intent |

### Negative Keywords (Filter Out Job Seekers & Freebie Traffic)
* `free`, `jobs`, `internship`, `salary`, `wikipedia`, `course`, `tutorial`, `pdf download`, `legal advice free`

### Responsive Search Ad (RSA) Creative Specification
* **Final URL:** `https://sarabjeetrattan.com/insights/eu-gdpr-compliance-ecommerce-websites`
* **Display Path:** `/gdpr/compliance`
* **Headlines (8 / 15):**
  1. `EU GDPR Compliance Dev` *(Pinned: Position 1)*
  2. `Sell in EU Without Fines`
  3. `Google Consent Mode v2`
  4. `GDPR Audit for eCommerce`
  5. `Zero-Leak Cookie Consent`
  6. `GDPR Dev | 16+ Yrs Exp`
  7. `Fix Non-Compliant Stores`
  8. `Fixed-Scope GDPR Setup`
* **Descriptions (4 / 4):**
  1. `Selling to EU customers? Ensure 100% legal compliance with bulletproof cookie & data architecture.`
  2. `Google Consent Mode v2 & zero-leak script blocking for WooCommerce & React stores. Get a quote.`
  3. `Avoid €20M penalties. We engineer audit-proof GDPR consent layers and data privacy pipelines.`
  4. `Fixed-scope implementation in 48 to 72 hours. Protect your store and maintain tracking accuracy.`

---

## Proposed Tasks

### Task 1: Create the Insight Article Component
**Files:**
- Create: `src/pages/insights/EuGdprCompliance.tsx`
- Modify: `src/App.tsx`

**Step 1: Write `src/pages/insights/EuGdprCompliance.tsx`**
* Comprehensive technical and legal guide with visual diagrams, comparison tables, code snippets, interactive checklist, and lead modal integration.

**Step 2: Register Route in `src/App.tsx`**
* Add lazy import and route `/insights/eu-gdpr-compliance-ecommerce-websites`.

---

### Task 2: Build Verification & Local Preview
**Files:**
- Run: `pnpm build`
- Verify: Bundle size and chunking compliance.

---

### Task 3: Deploy Ad Group & Creative via Google Ads API
**Files:**
- Create: `scratch/create_gdpr_ad_group.py`
- Run: `uv run --with google-ads python3 scratch/create_gdpr_ad_group.py`

**Expected Output:**
* Ad Group `AG4_EU_GDPR_Compliance_Websites` created under Campaign `24314044205`.
* 8 Keywords created and attached.
* Responsive Search Ad created and submitted for Google Ads policy review.

---

### Task 4: Verify Eligibility & Status
* Query Google Ads API to verify policy review status, ad group eligibility, and criteria approval.

---

## Verification Plan

### Automated Tests & Typecheck:
* `pnpm build` to guarantee zero compilation or bundle errors.

### Manual Verification:
* Open local browser view of [`/insights/eu-gdpr-compliance-ecommerce-websites`](http://localhost:5173/insights/eu-gdpr-compliance-ecommerce-websites) and verify layout, dark mode contrast, interactive components, and lead capture modal.
* Confirm Ad Group, Keywords, and RSA status directly from the Google Ads API live feed.
