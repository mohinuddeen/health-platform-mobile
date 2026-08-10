//health-platform-mobile/src/hooks/useHome.ts
import { useQuery } from "@tanstack/react-query";
import { homeService } from "@/src/services/home.service";

export function useHomeData() {
  return useQuery({
    queryKey: ["home-data"],
    queryFn: homeService.getHomeData,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}