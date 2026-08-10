//types/address.ts
export interface Address {
  id: string;
  title: string;
  address_line: string;
  area: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  latitude: number | null;
  longitude: number | null;
  is_default: boolean;
}

export interface AddressInput {
  title: string;
  address_line: string;
  area: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  latitude: number | null;
  longitude: number | null;
  is_default: boolean;
}