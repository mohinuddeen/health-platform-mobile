//health-platform-mobile/src/hooks/useTimeSlots.ts
import { useQuery } from "@tanstack/react-query";
import { timeSlotService } from "@/src/services/timeSlot.service";

export function useTimeSlots() {
  return useQuery({
    queryKey: ["time-slots"],
    queryFn: timeSlotService.getTimeSlots,
    staleTime: 5 * 60 * 1000,
  });
}