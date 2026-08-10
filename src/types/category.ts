//health-platform-mobile/src/types/category.ts
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  icon_url: string;
  sort_order: number;
  is_active: boolean;
}