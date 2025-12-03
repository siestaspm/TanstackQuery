import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {useThemeStore} from '../store/useThemeStore';

import CreatePostScreen from '../screens/CreatePostScreen'
import ViewPostScreen from '../screens/ViewPostScreen'
import HomeScreen from '../screens/HomeScreen'

const Tab = createBottomTabNavigator();
export default function BottomTabs() {
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
      <Tab.Screen name="Home" component={HomeScreen} />
    </Tab.Navigator>
  );
}