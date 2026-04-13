declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

export const executeRecaptcha = (action: string): Promise<string | null> => {
  return new Promise((resolve) => {
    if (!VITE_RECAPTCHA_SITE_KEY) {
      console.warn("reCAPTCHA Site Key is missing. Please add VITE_RECAPTCHA_SITE_KEY to your environment variables.");
      resolve(null);
      return;
    }
    if (!window.grecaptcha) {
      console.error("reCAPTCHA not loaded");
      resolve(null);
      return;
    }
    window.grecaptcha.ready(async () => {
      try {
        const token = await window.grecaptcha.execute(VITE_RECAPTCHA_SITE_KEY, { action });
        resolve(token);
      } catch (err) {
        console.error("reCAPTCHA execution error:", err);
        resolve(null);
      }
    });
  });
};
