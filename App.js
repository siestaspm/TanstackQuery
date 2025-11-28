import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ViewPostScreen from "./src/screens/ViewPostScreen"
// React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Automatically retry failed requests 1 time
      retry: 1,
      // Cache data for 1 minute
      staleTime: 1000 * 60,
      // Don't refetch on window focus (optional)
      refetchOnWindowFocus: false,
    },
    mutations: {
      // Retry mutations once
      retry: 1,
    },
  },
});
export default function App() {
  return (
<SafeAreaProvider
  style={{
    backgroundColor: 'rgba(0, 0, 0, 1)',
  }}
>      <QueryClientProvider client={queryClient}>
        <ViewPostScreen />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
