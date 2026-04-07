import { cn as sharedCn } from "@shared/ui";

/**
 * SSR_Website's 'cn' utility is now a wrapper for the shared @shared/ui/cn. 
 * This maintains existing imports while centralizing the logic.
 */
export const cn = sharedCn;
