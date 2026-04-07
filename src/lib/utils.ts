import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * SSR_Website's 'cn' utility - now fully standalone.
 * This ensures the project doesn't depend on workspace-linked UI assets.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

