//health-platform-mobile/src/services/timeSlot.service.ts
import api from "@/src/lib/api"
import { TimeSlot } from "@/src/types/timeSlot";

export const timeSlotService = {
  getTimeSlots: async (): Promise<TimeSlot[]> => {
    const response = await api.get("/time-slots/");
    return response.data;
  },
};