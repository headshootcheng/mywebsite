import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

interface UseIntersectionObserverResult {
  isIntersecting: boolean;
  entry: IntersectionObserverEntry | undefined;
}

const useIntersectionObserver = (
  options: UseIntersectionObserverOptions = {}
): [React.RefObject<HTMLElement>, UseIntersectionObserverResult] => {
  const elementRef = useRef<HTMLElement>(null);
  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  const [isIntersecting, setIsIntersecting] = useState(false);

  const { threshold = 0, root = null, rootMargin = '0%', freezeOnceVisible = false } = options;

  const frozen = entry?.isIntersecting && freezeOnceVisible;

  useEffect(() => {
    const element = elementRef.current;
    const hasIOSupport = !!window.IntersectionObserver;

    if (!hasIOSupport || frozen || !element) return;

    const observerParams = { threshold, root, rootMargin };
    const observer = new IntersectionObserver(([entry]) => {
      setEntry(entry);
      setIsIntersecting(entry.isIntersecting);
    }, observerParams);

    observer.observe(element);

    return () => observer.unobserve(element);
  }, [elementRef, JSON.stringify(threshold), root, rootMargin, frozen]);

  return [elementRef, { isIntersecting, entry }];
};

export default useIntersectionObserver;