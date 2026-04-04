'use client';

import { useEffect, useRef, useCallback } from 'react';

export function useScrollSpy(
  categoryIds: string[],
  setActiveCategory: (id: string) => void,
  stickyContainerId: string,
) {
  const isProgrammaticScroll = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getOffset = useCallback(() => {
    const navbar = document.querySelector('nav');
    const stickyEl = document.getElementById(stickyContainerId);
    const navH = navbar ? navbar.offsetHeight : 64;
    const stickyH = stickyEl ? stickyEl.offsetHeight : 120;
    return navH + stickyH + 24;
  }, [stickyContainerId]);

  const scrollToCategory = useCallback((categoryId: string) => {
    const el = document.getElementById(`category-${categoryId}`);
    if (!el) return;

    isProgrammaticScroll.current = true;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    const offset = getOffset();
    const targetY = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: targetY, behavior: 'smooth' });

    setActiveCategory(categoryId);

    timeoutRef.current = setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 1000);
  }, [getOffset, setActiveCategory]);

  useEffect(() => {
    const sections = categoryIds.map(id => document.getElementById(`category-${id}`)).filter(Boolean) as HTMLElement[];
    if (sections.length === 0) return;

    const cartaEl = document.getElementById('carta');

    const observer = new IntersectionObserver(
      (entries) => {
        if (isProgrammaticScroll.current) return;

        // Check if carta section is visible
        const cartaRect = cartaEl?.getBoundingClientRect();
        const isInCarta = cartaRect && cartaRect.top < window.innerHeight && cartaRect.bottom > 0;

        if (!isInCarta) {
          setActiveCategory('');
          return;
        }

        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id.replace('category-', '');
            setActiveCategory(id);
          }
        }
      },
      {
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0,
      }
    );

    sections.forEach(s => observer.observe(s));

    return () => {
      observer.disconnect();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [categoryIds, setActiveCategory]);

  return { scrollToCategory, getOffset };
}
