//src/hooks/useBookings.ts 
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { bookingService } from "@/src/services/booking.service";


export function useBookings() {
  return useQuery({
    queryKey: ["bookings"],
    queryFn: bookingService.getBookings,
  });
}


export function useBooking(id: string) {
  return useQuery({
    queryKey: ["booking", id],
    queryFn: () => bookingService.getBooking(id),
    enabled: !!id,
  });
}


export function useCreateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bookingService.createBooking,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
  });
}


export function useCancelBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bookingService.cancelBooking,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
  });
}