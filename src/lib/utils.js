import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines clsx and tailwind-merge for conditional class merging.
 * This is the standard shadcn/ui utility function.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
