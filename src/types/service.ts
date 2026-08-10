//health-platform-web/src/types/service.ts

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  icon_url: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ServiceImage {
  id: string;
  service_id: string;
  image_url: string;
  is_primary: boolean;
  sort_order: number;
  created_at: string;
}

export interface ServiceReview {
  id: string;
  user_id: string;
  service_id: string;
  booking_id: string;
  rating: number;
  comment: string;
  created_at: string;
  updated_at: string;
  profiles: {
    full_name: string;
  };
}

export interface Service {
  id: string;
  title: string;
  short_description: string | null;
  description: string;
  price: number;
  discount_price: number | null;
  duration: string | null;
  preparation: string | null;
  includes: string | null;
  category_id: string | null;
  is_featured: boolean;
  is_trending: boolean;
  is_new: boolean;
  rating: number;
  review_count: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  // Extended fields for single service response
  categories?: Category | null;
  images?: ServiceImage[];
  reviews?: ServiceReview[];
  related_services?: Service[];
}

export interface ServicesResponse {
  page: number;
  limit: number;
  total: number;
  results: Service[];
}