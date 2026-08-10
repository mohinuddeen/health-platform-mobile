//health-platform-mobile/src/types/booking.ts
import { Service } from "./service";


export type BookingStatus =
  | "pending"
  | "confirmed"
  | "completed"
  | "cancelled";


export interface Booking {
  id: string;
  status: BookingStatus;
  service: Service;
}