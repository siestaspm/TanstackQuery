import React from "react";
import { AppState, View, Text } from "react-native";
import { QueryClient, QueryClientProvider, focusManager } from "@tanstack/react-query";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { persister } from "./src/hooks/cache/queryPersistor";
import { useThemeStore } from "./src/store/useThemeStore";

import CreatePostScreen from "./src/screens/CreatePostScreen";
import ViewPostScreen from "./src/screens/ViewPostScreen";
import HomeScreen from "./src/screens/HomeScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const queryClient = new QueryClient();

function BottomTabs() {
  const { mode } = useThemeStore();
  const bgColor = mode === "light" ? "#FFF" : "#111";

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: bgColor, height: 70, paddingBottom: 10 },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#777",
      }}
    >
      <Tab.Screen name="CreatePost" component={CreatePostScreen} />
      <Tab.Screen name="ViewPost" component={ViewPostScreen} />
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  // persist query client
  React.useEffect(() => {
    persistQueryClient({ queryClient, persister });
    const subscription = AppState.addEventListener("change", (state) => {
      focusManager.setFocused(state === "active");
    });


    return () => subscription.remove();
  }, []);

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Tabs" component={BottomTabs} />
          </Stack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
