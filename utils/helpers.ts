import { SCROLL_BEHAVIOR } from './constants';

// Debounce function for performance optimization
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle function for scroll events
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Enhanced smooth scroll with accessibility
export const smoothScrollTo = (
  element: HTMLElement | null,
  behavior: ScrollBehavior = 'smooth'
): void => {
  if (!element) return;
  
  const offset = element.offsetTop - SCROLL_BEHAVIOR.OFFSET;
  
  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  window.scrollTo({
    top: offset,
    behavior: prefersReducedMotion ? 'auto' : behavior,
  });
};

// Get element position with better accuracy
export const getElementPosition = (element: HTMLElement | null): number => {
  if (!element) return 0;
  
  const rect = element.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return rect.top + scrollTop;
};

// Check if element is in viewport
export const isInViewport = (element: HTMLElement | null): boolean => {
  if (!element) return false;
  
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

// Format text for accessibility
export const getAriaLabel = (text: string): string => {
  return text.replace(/[^\w\s]/gi, '').trim();
};

// Generate unique ID for accessibility
export const generateId = (prefix = 'id'): string => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

// Lazy load image with fallback
export const createImageLoader = (src: string, alt: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
    img.alt = alt;
  });
};