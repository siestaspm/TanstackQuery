import { QueryClient } from "@tanstack/react-query";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createMMKVPersistor } from "./mmkvPersistor";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 24 * 60 * 60 * 1000,
      staleTime: 5 * 60 * 1000,
    },
  },
});

persistQueryClient({
  queryClient,
  persistor: createMMKVPersistor(),
  maxAge: 24 * 60 * 60 * 1000,
});

export default queryClient;
