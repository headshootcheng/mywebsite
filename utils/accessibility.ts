/**
 * Accessibility utility functions
 */

/**
 * Generates a unique ID for accessibility purposes
 */
export const generateA11yId = (prefix: string): string => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Creates proper ARIA attributes for buttons
 */
export const createButtonA11yProps = (
  label: string,
  isPressed?: boolean,
  isExpanded?: boolean
) => ({
  "aria-label": label,
  ...(isPressed !== undefined && { "aria-pressed": isPressed }),
  ...(isExpanded !== undefined && { "aria-expanded": isExpanded }),
  role: "button",
  tabIndex: 0,
});

/**
 * Creates proper ARIA attributes for navigation items
 */
export const createNavA11yProps = (
  label: string,
  isCurrent?: boolean,
  index?: number
) => ({
  "aria-label": label,
  ...(isCurrent && { "aria-current": "page" }),
  ...(index !== undefined && { "aria-posinset": index + 1 }),
  role: "navigation",
  tabIndex: 0,
});

/**
 * Creates proper ARIA attributes for images
 */
export const createImageA11yProps = (
  alt: string,
  isDecorative: boolean = false
) => ({
  alt: isDecorative ? "" : alt,
  ...(isDecorative && { "aria-hidden": "true" }),
  loading: "lazy" as const,
});

/**
 * Creates proper ARIA attributes for sections
 */
export const createSectionA11yProps = (title: string, headingId?: string) => ({
  role: "region",
  "aria-labelledby": headingId || generateA11yId("heading"),
});

/**
 * Focus management utilities
 */
export const focusElement = (selector: string): void => {
  const element = document.querySelector(selector) as HTMLElement;
  if (element) {
    element.focus();
  }
};

/**
 * Skip link helper
 */
export const createSkipLink = (targetId: string, text: string) => ({
  href: `#${targetId}`,
  className: "sr-only focus:not-sr-only",
  children: text,
});

/**
 * Screen reader only text utility
 */
export const srOnly = "sr-only";

/**
 * Focus visible utility for keyboard navigation
 */
export const focusVisible =
  "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2";
