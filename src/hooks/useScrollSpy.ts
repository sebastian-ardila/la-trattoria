'use client';

import { useEffect, useRef, useCallback } from 'react';

export function useScrollSpy(
  categoryIds: string[],
  setActiveCategory: (id: string) => void,
  stickyContainerId: string,
) {
  const isProgrammaticScroll = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const setActiveCategoryRef = useRef(setActiveCategory);
  const categoryIdsRef = useRef(categoryIds);
  setActiveCategoryRef.current = setActiveCategory;
  categoryIdsRef.current = categoryIds;

  const getOffset = useCallback(() => {
    const navbar = document.querySelector('nav');
    const stickyEl = document.getElementById(stickyContainerId);
    const navH = navbar ? navbar.offsetHeight : 64;
    const stickyH = stickyEl ? stickyEl.offsetHeight : 120;
    return navH + stickyH + 24;
  }, [stickyContainerId]);

  const detectActiveCategory = useCallback(() => {
    const offset = getOffset();
    const cartaEl = document.getElementById('carta');
    const cartaRect = cartaEl?.getBoundingClientRect();
    const isInCarta = cartaRect && cartaRect.top < window.innerHeight && cartaRect.bottom > 0;

    if (!isInCarta) {
      setActiveCategoryRef.current('');
      return;
    }

    // Find the last section whose top has scrolled past the offset line.
    // That's the section currently visible under the sticky header.
    let active: string | null = null;
    for (const id of categoryIdsRef.current) {
      const el = document.getElementById(`category-${id}`);
      if (!el) continue;
      const top = el.getBoundingClientRect().top - offset;
      if (top <= 50) {
        active = id;
      }
    }
    if (active) setActiveCategoryRef.current(active);
  }, [getOffset]);

  const scrollToCategory = useCallback((categoryId: string) => {
    const el = document.getElementById(`category-${categoryId}`);
    if (!el) return;

    isProgrammaticScroll.current = true;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    const offset = getOffset();
    const targetY = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: targetY, behavior: 'smooth' });

    setActiveCategoryRef.current(categoryId);

    timeoutRef.current = setTimeout(() => {
      isProgrammaticScroll.current = false;
      detectActiveCategory();
    }, 1000);
  }, [getOffset, detectActiveCategory]);

  // Scroll listener — uses refs to avoid dependency changes destroying the listener
  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (isProgrammaticScroll.current) return;
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        detectActiveCategory();
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    detectActiveCategory();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [detectActiveCategory]);

  return { scrollToCategory, getOffset };
}
