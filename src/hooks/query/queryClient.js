import { QueryClient } from "@tanstack/react-query";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { persister } from "../cache/queryPersistor";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 24 * 60 * 60 * 1000, // 24h
      cacheTime: 10000, // 24h
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
    },
  },
});

// persist React Query cache in MMKV
persistQueryClient({
  queryClient,
  persister,
});
