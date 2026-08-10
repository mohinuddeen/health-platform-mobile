//health-platform-mobile/src/types/timeSlot.ts
export interface TimeSlot {
  id: string;
  slot: string;
  capacity: number;
  is_active: boolean;
  created_at: string;
}