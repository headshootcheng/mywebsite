import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    // Set initial value
    setMatches(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
    // Fallback for older browsers
    else {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, [query]);

  return matches;
}

// Predefined breakpoint hooks
export const useIsMobile = (): boolean => useMediaQuery("(max-width: 768px)");
export const useIsTablet = (): boolean =>
  useMediaQuery("(min-width: 769px) and (max-width: 1024px)");
export const useIsDesktop = (): boolean => useMediaQuery("(min-width: 1025px)");
export const useIsDarkMode = (): boolean =>
  useMediaQuery("(prefers-color-scheme: dark)");
export const usePrefersReducedMotion = (): boolean =>
  useMediaQuery("(prefers-reduced-motion: reduce)");

export default useMediaQuery;
