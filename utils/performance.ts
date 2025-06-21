/**
 * Performance monitoring and optimization utilities
 */

// Type definition for Memory API
interface MemoryInfo {
  usedJSHeapSize: number;
  totalJSHeapSize: number;
  jsHeapSizeLimit: number;
}

/**
 * Debounce function for performance optimization
 */
export const debounce = <T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Throttle function for performance optimization
 */
export const throttle = <T extends (...args: unknown[]) => void>(
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

/**
 * Lazy loading utility for images
 */
export const createImageLoader = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

/**
 * Intersection Observer utility for lazy loading
 */
export const createIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
): IntersectionObserver => {
  return new IntersectionObserver(callback, {
    rootMargin: "0px",
    threshold: 0.1,
    ...options,
  });
};

/**
 * Web Vitals measurement
 */
export const measureWebVitals = () => {
  if (typeof window !== "undefined" && "performance" in window) {
    // Measure First Contentful Paint
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.log(`${entry.name}: ${entry.startTime}`);
      }
    });

    try {
      observer.observe({ entryTypes: ["paint", "largest-contentful-paint"] });
    } catch (e) {
      // Fallback for older browsers
      console.warn("Performance Observer not supported");
    }
  }
};

/**
 * Memory usage monitoring
 */
export const getMemoryUsage = (): MemoryInfo | null => {
  if (typeof window !== "undefined" && "performance" in window) {
    return (performance as Performance & { memory?: MemoryInfo }).memory || null;
  }
  return null;
};

/**
 * Bundle analyzer helper
 */
export const logBundleSize = (componentName: string) => {
  if (process.env.NODE_ENV === "development") {
    console.log(`Component loaded: ${componentName}`);
  }
};

/**
 * Preload critical resources
 */
export const preloadResource = (href: string, as: string): void => {
  if (typeof document !== "undefined") {
    const link = document.createElement("link");
    link.rel = "preload";
    link.href = href;
    link.as = as;
    document.head.appendChild(link);
  }
};

/**
 * Service Worker registration utility
 */
export const registerServiceWorker = async (): Promise<void> => {
  if (typeof window !== "undefined" && "serviceWorker" in navigator) {
    try {
      await navigator.serviceWorker.register("/sw.js");
      console.log("Service Worker registered successfully");
    } catch (error) {
      console.error("Service Worker registration failed:", error);
    }
  }
};