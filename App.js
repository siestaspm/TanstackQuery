import React from "react";
import { View, StyleSheet } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ViewPostScreen from "./src/screens/ViewPostScreen";

const queryClient = new QueryClient();

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <QueryClientProvider client={queryClient}>
          <ViewPostScreen />
        </QueryClientProvider>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});
