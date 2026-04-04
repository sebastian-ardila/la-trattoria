'use client';

import { useState, useCallback } from 'react';
import { useLang } from '@/context/LanguageContext';
import { allCategories } from '@/data/menu';
import { CategorySelector } from '@/components/menu/CategorySelector';
import { CategorySection } from '@/components/menu/CategorySection';
import { ProductModal } from '@/components/menu/ProductModal';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import type { MenuItem } from '@/types';

export function MenuSection() {
  const { t } = useLang();
  const [activeCategory, setActiveCategory] = useState('');
  const [modalItem, setModalItem] = useState<MenuItem | null>(null);
  const categoryIds = allCategories.map(c => c.id);

  const { scrollToCategory } = useScrollSpy(categoryIds, setActiveCategory, 'category-selector');

  const handleSelect = useCallback((id: string) => {
    scrollToCategory(id);
  }, [scrollToCategory]);

  return (
    <section id="carta" className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-2">
          {t('Nuestra Carta', 'Il Nostro Menu', 'Our Menu')}
        </h2>
        <p className="text-white/50 text-center mb-8">{t('Descubre nuestros platos', 'Scopri i nostri piatti', 'Discover our dishes')}</p>
      </div>

      <CategorySelector
        categories={allCategories}
        activeCategory={activeCategory}
        onSelect={handleSelect}
      />

      <div className="max-w-7xl mx-auto px-4 mt-8">
        {allCategories.map(cat => (
          <CategorySection key={cat.id} category={cat} onViewDish={setModalItem} />
        ))}
      </div>

      {modalItem && <ProductModal item={modalItem} onClose={() => setModalItem(null)} />}
    </section>
  );
}
