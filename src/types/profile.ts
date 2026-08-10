//health-platform-Mobile/src/types/profile.ts
export interface Profile {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  role: string;
  profile_image: string | null;
  gender: string | null;
  date_of_birth: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  stats: {
    bookings: number;
    favorites: number;
    family_members: number;
  };
}