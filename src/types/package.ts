//health-platform-mobile/src/types/package.ts
export interface PackageService {
  id: string;
  service_id: string;
  services: {
    id: string;
    title: string;
    short_description: string;
    description?: string;
    price: number;
    discount_price: number | null;
    duration: string;
    preparation?: string;
    includes?: string;
  };
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
  package_services: PackageService[];
}