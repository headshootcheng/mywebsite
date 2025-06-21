import { useEffect, useRef, useState } from "react";

interface ScrollPosition {
  x: number;
  y: number;
}

export function useScrollThrottle(delay: number = 100): ScrollPosition {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    x: 0,
    y: 0,
  });
  const throttleRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (throttleRef.current) {
        clearTimeout(throttleRef.current);
      }

      throttleRef.current = setTimeout(() => {
        setScrollPosition({
          x: window.scrollX,
          y: window.scrollY,
        });
      }, delay);
    };

    // Set initial position
    setScrollPosition({
      x: window.scrollX,
      y: window.scrollY,
    });

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (throttleRef.current) {
        clearTimeout(throttleRef.current);
      }
    };
  }, [delay]);

  return scrollPosition;
}

export default useScrollThrottle;
