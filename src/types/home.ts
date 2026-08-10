//health-platform-mobile/src/types/home.ts
import { Service } from "./service";

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image_url: string;
  is_active: boolean;
  sort_order: number;
  start_date: string | null;
  end_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface HomeCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  icon_url: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Package {
  id: string;
  title: string;
  description: string;
  price: number;
  discount_price: number | null;
  image_url: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface HomeData {
  banners: Banner[];
  categories: HomeCategory[];
  featured_services: Service[];
  trending_services: Service[];
  new_services: Service[];
  packages: Package[];
}