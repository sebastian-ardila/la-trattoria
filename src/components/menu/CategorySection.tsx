'use client';

import { useLang } from '@/context/LanguageContext';
import { ProductCard } from './ProductCard';
import { categoryIconMap } from './categoryIcons';
import type { MenuCategory, MenuItem } from '@/types';

interface CategorySectionProps {
  category: MenuCategory;
  onViewDish: (item: MenuItem) => void;
}

export function CategorySection({ category, onViewDish }: CategorySectionProps) {
  const { t } = useLang();
  const IconComp = categoryIconMap[category.icon];

  return (
    <section id={`category-${category.id}`} className="mb-10">
      <div className="flex items-center gap-3 mb-1">
        {IconComp && <IconComp size={24} className="text-gold" />}
        <h2 className="font-display text-2xl md:text-3xl font-semibold">{t(category.nameEs, category.nameIt || category.nameEs, category.nameEn)}</h2>
      </div>
      {(category.subtitleEs || category.subtitleEn) && (
        <p className="text-white/40 text-sm mb-4 ml-9">{t(category.subtitleEs || '', category.subtitleIt || category.subtitleEs || '', category.subtitleEn || '')}</p>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {category.items.map(item => (
          <ProductCard key={item.id} item={item} onViewDish={onViewDish} />
        ))}
      </div>
    </section>
  );
}
