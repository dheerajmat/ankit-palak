import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * useScrollReveal
 * High-performance IntersectionObserver hook for royal scroll entrance animations.
 * - Mobile (<= 768px): proactive trigger (rootMargin: '0px 0px -8px 0px', threshold: 0.03)
 * - Desktop: stately trigger (rootMargin: '0px 0px -60px 0px', threshold: 0.06)
 * - Respects prefers-reduced-motion
 * - Unobserves on reveal for zero ongoing CPU drain
 * - delay: optional ms delay before marking as revealed (for entrance staggering at section level)
 */
export function useScrollReveal(options = {}) {
  const ref = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Fallback for no IntersectionObserver support
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsRevealed(true);
      return;
    }

    // Respect reduced-motion preference
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsRevealed(true);
      return;
    }

    // Immediately reveal if element is already in viewport on mount
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    if (window.scrollY > 80 && rect.top < vh && rect.bottom > 0) {
      setIsRevealed(true);
      return;
    }

    const isMobile = window.innerWidth < 768;
    const defaultMargin = isMobile ? '0px 0px -8px 0px' : '0px 0px -60px 0px';
    const defaultThreshold = isMobile ? 0.03 : 0.06;
    const delay = options.delay || 0;

    const reveal = () => {
      if (delay > 0) {
        setTimeout(() => setIsRevealed(true), delay);
      } else {
        setIsRevealed(true);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: options.rootMargin || defaultMargin,
        threshold: options.threshold !== undefined ? options.threshold : defaultThreshold,
      }
    );

    observer.observe(el);

    // Passive scroll fallback for resilience
    const handleScrollCheck = () => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const currentVh = window.innerHeight || document.documentElement.clientHeight;
      const triggerOffset = isMobile ? 8 : 60;
      if (r.top < currentVh - triggerOffset && r.bottom > 0) {
        reveal();
        window.removeEventListener('scroll', handleScrollCheck);
      }
    };

    window.addEventListener('scroll', handleScrollCheck, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScrollCheck);
    };
  }, [options.rootMargin, options.threshold, options.delay]);

  return [ref, isRevealed];
}

/**
 * useStaggeredReveal
 * Observes a container and progressively reveals child elements with
 * configurable stagger delay. Returns [containerRef, revealedIndices].
 *
 * Options:
 *   - selector: CSS selector for children to observe (default: '.sv-stagger-child')
 *   - baseDelay: initial delay in ms (default: 0)
 *   - stagger: delay between each child in ms (default: 120)
 *   - threshold: IntersectionObserver threshold (default: 0.03)
 *   - rootMargin: IntersectionObserver rootMargin
 */
export function useStaggeredReveal(options = {}) {
  const containerRef = useRef(null);
  const [revealedCount, setRevealedCount] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return;
    }

    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Reveal all immediately
      const children = container.querySelectorAll(options.selector || '.sv-stagger-child');
      children.forEach(child => child.classList.add('sv-revealed'));
      return;
    }

    const {
      selector = '.sv-stagger-child',
      baseDelay = 0,
      stagger = 120,
      threshold = 0.03,
      rootMargin,
    } = options;

    const isMobile = window.innerWidth < 768;
    const defaultMargin = rootMargin || (isMobile ? '0px 0px -8px 0px' : '0px 0px -40px 0px');

    const children = Array.from(container.querySelectorAll(selector));
    if (!children.length) return;

    let sectionTriggered = false;

    const triggerStagger = () => {
      if (sectionTriggered) return;
      sectionTriggered = true;

      children.forEach((child, idx) => {
        const delay = baseDelay + idx * stagger;
        setTimeout(() => {
          child.classList.add('sv-revealed');
          setRevealedCount(c => c + 1);
        }, delay);
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          triggerStagger();
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: defaultMargin, threshold }
    );

    observer.observe(container);

    // Scroll fallback
    const handleScrollCheck = () => {
      if (!containerRef.current) return;
      const r = containerRef.current.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (r.top < vh - (isMobile ? 8 : 40) && r.bottom > 0) {
        triggerStagger();
        window.removeEventListener('scroll', handleScrollCheck);
      }
    };
    window.addEventListener('scroll', handleScrollCheck, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScrollCheck);
    };
  }, [options.selector, options.baseDelay, options.stagger, options.threshold, options.rootMargin]);

  return [containerRef, revealedCount];
}

/**
 * initScrollObserver
 * Lightweight utility to observe arbitrary elements with .sv-scroll-reveal class.
 * Useful for long streams of cards (e.g. ceremony cards or family cards).
 */
export function initScrollObserver(containerEl, selector = '.sv-scroll-reveal') {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window) || !containerEl) {
    return () => {};
  }

  const elements = containerEl.querySelectorAll(selector);
  if (!elements.length) return () => {};

  const isMobile = window.innerWidth < 768;
  const defaultMargin = isMobile ? '0px 0px -8px 0px' : '0px 0px -40px 0px';
  const defaultThreshold = isMobile ? 0.03 : 0.06;

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
