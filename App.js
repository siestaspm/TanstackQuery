import React from "react";
import { AppState } from "react-native";
import {
  QueryClientProvider,
  focusManager,
} from "@tanstack/react-query";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { persister } from "./src/hooks/cache/queryPersistor";

import {queryClient } from './src/hooks/query/queryClient'

import BottomTabs from './src/components/BottomTabs'


const Stack = createNativeStackNavigator();

export default function App() {
  React.useEffect(() => {
    const unsubscribe = AppState.addEventListener("change", (state) => {
      focusManager.setFocused(state === "active");
    });

    return () => unsubscribe.remove();
  }, []);

  React.useEffect(() => {
    persistQueryClient({
      queryClient,
      persister,
    });
  }, []);

  return (
  <QueryClientProvider client={queryClient} contextSharing={true}>
    <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Tabs" component={BottomTabs} />
          </Stack.Navigator>
        </NavigationContainer>
    </SafeAreaProvider>
  </QueryClientProvider>
  );
}
