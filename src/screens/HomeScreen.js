import { View, Text, FlatList, Image, TextInput, TouchableOpacity, ActivityIndicator, RefreshControl, Keyboard, ScrollView } from "react-native";
import { mainStyles } from "../styles/mainStyle";
import {useThemeStore} from "../store/useThemeStore";
import {lightColors, darkColors} from '../styles/theme/colors'
export default function HomeScreen() {
  // dark mode ligth mode
const { mode, toggleTheme } = useThemeStore();

 const colors = mode === "light" ? lightColors : darkColors;

  const styles = mainStyles(colors)


  return (
    <ScrollView style={styles.container}>
      <View style={styles.postCard}>
        <View style={styles.header}>
            <TouchableOpacity
              onPress={toggleTheme}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#FFF", fontWeight: "bold" }}>
                {mode === "dark" ? "🌙" : "☀️"}
              </Text>
            </TouchableOpacity>
        </View>
      
      </View>
    </ScrollView>
  );
}
