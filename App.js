import React, { useEffect } from "react";
import { QueryClientProvider, focusManager } from "@tanstack/react-query";
import queryClient from "./src/hooks/queryClient";
import { AppState } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ViewPostScreen from "./src/screens/ViewPostScreen";

export default function App() {
  // React Query focus manager
  useEffect(() => {
    const sub = AppState.addEventListener("change", (state) => {
      focusManager.setFocused(state === "active");
    });
    return () => sub.remove();
  }, []);

  return (
    <SafeAreaProvider
      style={{
        backgroundColor: "rgba(0, 0, 0, 1)",
      }}
    >
      <QueryClientProvider client={queryClient}>
        <ViewPostScreen />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
