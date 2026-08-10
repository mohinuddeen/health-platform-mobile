//health-platform-mobile/src/hooks/usePackages.ts
import { useQuery } from "@tanstack/react-query";
import { packagesService } from "@/src/services/packages.service";


export function usePackages() {

  return useQuery({
    queryKey: ["packages"],
    queryFn: packagesService.getPackages,
  });

}


export function usePackage(id: string) {

  return useQuery({
    queryKey: ["package", id],
    queryFn: () => packagesService.getPackage(id),
    enabled: !!id,
  });

}