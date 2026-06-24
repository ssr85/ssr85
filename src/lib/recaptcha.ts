declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

const loadRecaptchaScript = (): Promise<void> => {
  return new Promise((resolve) => {
    if (window.grecaptcha) {
      resolve();
      return;
    }
    const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
    if (!siteKey) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    document.head.appendChild(script);
  });
};

export const executeRecaptcha = async (action: string): Promise<string | null> => {
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
  if (!siteKey) {
    console.warn("reCAPTCHA Site Key is missing.");
    return null;
  }
  await loadRecaptchaScript();
  try {
    const token = await new Promise<string>((resolve, reject) => {
      window.grecaptcha.ready(() => {
        window.grecaptcha.execute(siteKey, { action }).then(resolve).catch(reject);
      });
    });
    return token;
  } catch (err) {
    console.error("reCAPTCHA execution error:", err);
    return null;
  }
};
