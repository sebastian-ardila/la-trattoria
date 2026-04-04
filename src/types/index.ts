export interface MenuItem {
  id: string;
  categoryId: string;
  name: string;
  price: number;
  ingredientsEs: string;
  ingredientsEn: string;
  weight?: string;
  image?: string;
  isVegetarian: boolean;
  pastaOptions?: string[];
  sauceOptions?: string[];
  quantity?: string;
}

export interface MenuCategory {
  id: string;
  nameEs: string;
  nameIt?: string;
  nameEn: string;
  subtitleEs?: string;
  subtitleIt?: string;
  subtitleEn?: string;
  icon: string;
  items: MenuItem[];
  isCrossCategory?: boolean;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  selectedPasta?: string;
  selectedSauce?: string;
  cartId: string;
}

export interface BusinessHours {
  open: string;
  close: string;
}

export interface DaySchedule {
  regular: BusinessHours | null;
  holiday: BusinessHours | null;
}
