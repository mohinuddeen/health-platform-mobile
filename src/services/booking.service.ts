//src/services/booking.service.ts old
import api from "@/src/lib/api"

export interface Booking {
  id: string;
  status: string;
  date: string;
  service_price: number;
  notes: string | null;

  services: {
    id: string;
    title: string;
    price: number;
    discount_price: number | null;
  } | null;

  packages: {
    id: string;
    title: string;
    price: number;
    discount_price: number | null;
  } | null;

  time_slots: {
    id: string;
    slot: string;
  } | null;

  family_members: {
    id: string;
    name: string;
    relation: string;
    age: number;
  } | null;

  addresses: {
    id: string;
    title: string;
    address_line: string;
    area: string;
    city: string;
  } | null;
}
export interface CreateBookingInput {
  service_id?: string;
  package_id?: string;
  family_member_id?: string;
  date: string;
  time_slot_id: string;
  address_id: string;
  notes?: string;
}

export const bookingService = {
  getBookings: async (): Promise<Booking[]> => {
    const response = await api.get("/bookings/");
    return response.data;
  },

  getBooking: async (id: string) => {
    const response = await api.get(`/bookings/${id}/`);
    return response.data;
  },

  createBooking: async (data: CreateBookingInput) => {
    const response = await api.post("/bookings/", data);
    return response.data;
  },

  cancelBooking: async (id: string) => {
    const response = await api.put(`/bookings/${id}/cancel/`);
    return response.data;
  },
};