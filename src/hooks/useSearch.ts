//health-platform-mobile/src/hooks/useSearch.ts
import {
  useQuery,
} from "@tanstack/react-query";

import {
  searchService,
} from "@/src/services/search.service";


export function useSearch(
  query: string
) {

  return useQuery({

    queryKey: [
      "search",
      query,
    ],

    queryFn: () =>
      searchService.search(query),

    enabled:
      query.trim().length >= 2,

    staleTime: 1000 * 60,

  });

}