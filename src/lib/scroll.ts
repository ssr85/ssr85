/**
 * Smoothly scrolls to an element accounting for a fixed header offset.
 * @param selector - CSS selector or element ID (with `#` prefix)
 * @param offset - pixels to subtract from the top (default: 80 for header height)
 */
export const scrollToSection = (selector: string, offset: number = 80): void => {
  const element = document.querySelector(selector);
  if (!element) return;

  const bodyRect = document.body.getBoundingClientRect().top;
  const elementRect = element.getBoundingClientRect().top;
  const offsetPosition = elementRect - bodyRect - offset;

  window.scrollTo({ top: offsetPosition, behavior: "smooth" });
};
