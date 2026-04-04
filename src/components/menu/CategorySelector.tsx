'use client';

import { useEffect, useRef, useMemo } from 'react';
import { useLang } from '@/context/LanguageContext';
import { categoryIconMap } from './categoryIcons';
import type { MenuCategory } from '@/types';

interface CategorySelectorProps {
  categories: MenuCategory[];
  activeCategory: string;
  onSelect: (id: string) => void;
}

function splitIntoRows<T>(arr: T[], numRows: number): T[][] {
  const rows: T[][] = Array.from({ length: numRows }, () => []);
  arr.forEach((item, i) => {
    rows[i % numRows].push(item);
  });
  return rows;
}

export function CategorySelector({ categories, activeCategory, onSelect }: CategorySelectorProps) {
  const { t } = useLang();
  const desktopRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);

  // Scroll active button into view in both containers
  useEffect(() => {
    if (!activeCategory) return;

    [desktopRef.current, mobileRef.current].forEach(container => {
      if (!container) return;
      const btn = container.querySelector(`[data-cat-id="${activeCategory}"]`) as HTMLElement;
      if (!btn) return;

      const containerRect = container.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();

      // Check if button is already fully visible
      if (btnRect.left >= containerRect.left && btnRect.right <= containerRect.right) return;

      // Scroll to center the button
      const btnCenterX = btnRect.left + btnRect.width / 2;
      const containerCenterX = containerRect.left + containerRect.width / 2;
      container.scrollBy({ left: btnCenterX - containerCenterX, behavior: 'smooth' });
    });
  }, [activeCategory]);

  const desktopRows = useMemo(() => splitIntoRows(categories, 2), [categories]);
  const mobileRows = useMemo(() => splitIntoRows(categories, 3), [categories]);

  const renderButton = (cat: MenuCategory) => {
    const IconComp = categoryIconMap[cat.icon];
    const isActive = activeCategory === cat.id;
    return (
      <button
        key={cat.id}
        data-cat-id={cat.id}
        onClick={() => onSelect(cat.id)}
        className={`shrink-0 inline-flex items-center gap-1 px-2 py-1 md:px-2.5 md:py-1.5 text-[10px] md:text-xs whitespace-nowrap transition-all rounded-md ${
          isActive
            ? 'text-white bg-white/10 font-medium'
            : 'text-white/50 hover:text-white/80 hover:bg-white/5'
        }`}
      >
        {IconComp && <IconComp size={13} className={`md:!w-[15px] md:!h-[15px] ${isActive ? 'text-gold' : ''}`} weight={isActive ? 'fill' : 'regular'} />}
        <span>{t(cat.nameEs, cat.nameIt || cat.nameEs, cat.nameEn)}</span>
      </button>
    );
  };

  return (
    <div id="category-selector" className="sticky top-16 z-30 bg-dark/95 backdrop-blur-sm border-b border-dark-border py-2">
      <div className="max-w-7xl mx-auto px-3">
        {/* Desktop: 2 rows */}
        <div ref={desktopRef} className="hidden md:flex flex-col gap-1.5 overflow-x-auto scrollbar-hide">
          {desktopRows.map((row, i) => (
            <div key={i} className="flex gap-1">
              {row.map(renderButton)}
            </div>
          ))}
        </div>
        {/* Mobile: 3 rows */}
        <div ref={mobileRef} className="flex md:hidden flex-col gap-1 overflow-x-auto scrollbar-hide">
          {mobileRows.map((row, i) => (
            <div key={i} className="flex gap-1">
              {row.map(renderButton)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
