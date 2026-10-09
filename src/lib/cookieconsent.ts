import * as CookieConsent from "vanilla-cookieconsent";
import "vanilla-cookieconsent/dist/cookieconsent.css";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    initGA?: () => void;
  }
}

/**
 * Sync Google Consent Mode v2 state based on user's granted categories.
 */
function syncConsentWithGtag() {
  if (typeof window === "undefined") return;

  const isAnalytics = CookieConsent.acceptedCategory("analytics");
  const isMarketing = CookieConsent.acceptedCategory("marketing");

  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      analytics_storage: isAnalytics ? "granted" : "denied",
      ad_storage: isMarketing ? "granted" : "denied",
      ad_user_data: isMarketing ? "granted" : "denied",
      ad_personalization: isMarketing ? "granted" : "denied",
    });
  }

  // If user accepted analytics or marketing, initialize GA/Ads tags if not loaded yet
  if (isAnalytics || isMarketing) {
    if (typeof window.initGA === "function") {
      window.initGA();
    }
  }
}

/**
 * Initialize vanilla-cookieconsent with EU GDPR and Google Consent Mode v2 compliance.
 */
export function initCookieConsent() {
  if (typeof window === "undefined") return;

  CookieConsent.run({
    guiOptions: {
      consentModal: {
        layout: "bar inline",
        position: "bottom",
        equalWeightButtons: false,
        flipButtons: false,
      },
      preferencesModal: {
        layout: "box",
        position: "right",
        equalWeightButtons: true,
        flipButtons: false,
      },
    },

    categories: {
      necessary: {
        readOnly: true,
        enabled: true,
      },
      analytics: {
        autoClear: {
          cookies: [
            {
              name: /^_ga/,
            },
            {
              name: "_gid",
            },
            {
              name: /^_gat/,
            },
          ],
        },
      },
      marketing: {
        autoClear: {
          cookies: [
            {
              name: /^_gcl/,
            },
            {
              name: "_fbp",
            },
          ],
        },
      },
    },

    language: {
      default: "en",
      translations: {
        en: {
          consentModal: {
            description:
              "We use cookies to remember preferences, secure operations, and measure performance in accordance with EU GDPR.",
            acceptAllBtn: "ACCEPT",
            acceptNecessaryBtn: "REJECT",
            showPreferencesBtn: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="cc-gear-icon" aria-hidden="true"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>',
          },
          preferencesModal: {
            title: "Cookie & Data Privacy Preferences",
            acceptAllBtn: "Accept All",
            acceptNecessaryBtn: "Reject Non-Essential",
            savePreferencesBtn: "Save Preferences",
            closeIconLabel: "Close modal",
            serviceCounterLabel: "Service|Services",
            sections: [
              {
                title: "Your Privacy & GDPR Rights",
                description:
                  "In compliance with EU Regulation 2016/679 (GDPR), non-essential cookies and analytics signals are disabled by default until you grant affirmative consent. You can modify or withdraw your preferences at any time.",
              },
              {
                title: "Strictly Necessary Cookies",
                description:
                  "Essential for security, session persistence, routing, and saving your consent preferences. These cookies cannot be disabled.",
                linkedCategory: "necessary",
              },
              {
                title: "Performance & Analytics",
                description:
                  "Aggregated and anonymized visitor interaction metrics (Google Analytics 4 & Vercel Telemetry) to optimize website performance and latency.",
                linkedCategory: "analytics",
                cookieTable: {
                  caption: "Analytics Cookies",
                  headers: {
                    name: "Cookie",
                    domain: "Domain",
                    desc: "Description",
                    exp: "Expiration",
                  },
                  body: [
                    {
                      name: "_ga, _gid, _gat",
                      domain: window.location.hostname,
                      desc: "Google Analytics anonymized telemetry identifier.",
                      exp: "2 years / 24 hours",
                    },
                  ],
                },
              },
              {
                title: "Marketing & Advertising",
                description:
                  "Enables measurement of Google Ads campaign conversion tracking and attribution without invasive personal data profiling.",
                linkedCategory: "marketing",
                cookieTable: {
                  caption: "Marketing Cookies",
                  headers: {
                    name: "Cookie",
                    domain: "Domain",
                    desc: "Description",
                    exp: "Expiration",
                  },
                  body: [
                    {
                      name: "_gcl_au, _gcl_aw",
                      domain: window.location.hostname,
                      desc: "Google Ads campaign conversion linker.",
                      exp: "90 days",
                    },
                  ],
                },
              },
              {
                title: "Compliance Contact",
                description:
                  'For inquiries on data protection or to exercise your GDPR data access rights, read our <a class="cc-link" href="/insights/eu-gdpr-compliance-ecommerce-websites">EU GDPR Compliance Guide</a> or contact <a class="cc-link" href="mailto:ssrrattan@gmail.com">ssrrattan@gmail.com</a>.',
              },
            ],
          },
        },
      },
    },

    onConsent: () => {
      syncConsentWithGtag();
    },

    onChange: () => {
      syncConsentWithGtag();
    },
  });

  // Sync initial state on load if consent was already recorded previously
  syncConsentWithGtag();
}

/**
 * Programmatically open the Cookie & Privacy Preferences dialog.
 */
export function showCookiePreferences() {
  if (typeof window !== "undefined") {
    CookieConsent.showPreferences();
  }
}
