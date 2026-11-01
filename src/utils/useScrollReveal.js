import { useEffect, useRef, useState } from 'react';

/**
 * useScrollReveal
 * High-performance IntersectionObserver hook for subtle, royal scroll entrance.
 * - Responsive triggers: on mobile (<= 768px), triggers proactively (rootMargin: '0px 0px -15px 0px', threshold: 0.04)
 *   so thumb-scrolling users immediately see elements start their smooth entrance without delay
 * - On desktop, triggers with stately threshold (rootMargin: '0px 0px -40px 0px', threshold: 0.08)
 * - Only reveals elements below the fold when user actually scrolls to them
 * - Unobserves once revealed for zero ongoing CPU/battery drain
 */
export function useScrollReveal(options = {}) {
  const ref = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Fallback if IntersectionObserver is not supported or reduced motion is preferred
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsRevealed(true);
      return;
    }

    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsRevealed(true);
      return;
    }

    // Check if element is already in viewport on mount (e.g. hero section or page reload with scrollY > 0)
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    
    // Only reveal immediately if page is already scrolled down and element is in viewport
    if (window.scrollY > 80 && rect.top < vh && rect.bottom > 0) {
      setIsRevealed(true);
      return;
    }

    const isMobile = window.innerWidth < 768;
    const defaultMargin = isMobile ? '0px 0px -15px 0px' : '0px 0px -40px 0px';
    const defaultThreshold = isMobile ? 0.04 : 0.08;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: options.rootMargin || defaultMargin,
        threshold: options.threshold !== undefined ? options.threshold : defaultThreshold,
      }
    );

    observer.observe(el);

    // Passive scroll check as a resilient fallback in case IntersectionObserver is delayed
    const handleScrollCheck = () => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const currentVh = window.innerHeight || document.documentElement.clientHeight;
      const triggerOffset = isMobile ? 15 : 40;
      if (r.top < currentVh - triggerOffset && r.bottom > 0) {
        setIsRevealed(true);
        window.removeEventListener('scroll', handleScrollCheck);
      }
    };

    window.addEventListener('scroll', handleScrollCheck, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScrollCheck);
    };
  }, [options.rootMargin, options.threshold]);

  return [ref, isRevealed];
}

/**
 * initScrollObserver
 * Lightweight utility to observe arbitrary elements with .sv-scroll-reveal
 * Useful for long streams of cards (e.g. ceremony cards or family cards)
 */
export function initScrollObserver(containerEl, selector = '.sv-scroll-reveal') {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window) || !containerEl) {
    return () => {};
  }

  const elements = containerEl.querySelectorAll(selector);
  if (!elements.length) return () => {};

  const isMobile = window.innerWidth < 768;
  const defaultMargin = isMobile ? '0px 0px -15px 0px' : '0px 0px -40px 0px';
  const defaultThreshold = isMobile ? 0.04 : 0.08;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: defaultMargin,
      threshold: defaultThreshold,
    }
  );

  elements.forEach((el) => observer.observe(el));

  return () => observer.disconnect();
}

export default useScrollReveal;
