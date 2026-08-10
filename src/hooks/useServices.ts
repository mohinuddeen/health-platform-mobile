//health-platform-mobile/src/hooks/useServices.ts
import { useQuery } from "@tanstack/react-query";
import {
  servicesService,
  GetPublicServicesParams,
} from "@/src/services/services.service";

export function usePublicServices(
  params?: GetPublicServicesParams
) {
  return useQuery({
    queryKey: ["public-services", params],
    queryFn: () =>
      servicesService.getPublicServices(params),
  });
}


export function usePublicService(id: string) {
  return useQuery({
    queryKey: ["public-service", id],
    queryFn: () =>
      servicesService.getPublicService(id),
    enabled: !!id,
  });
}