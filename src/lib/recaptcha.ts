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
    if (!window.grecaptcha) {
      console.error("reCAPTCHA not loaded");
      resolve(null);
      return;
    }
    window.grecaptcha.ready(async () => {
      try {
        const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action });
        resolve(token);
      } catch (err) {
        console.error("reCAPTCHA execution error:", err);
        resolve(null);
      }
    });
  });
};
