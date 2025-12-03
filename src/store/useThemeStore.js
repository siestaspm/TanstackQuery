import { create } from "zustand";
import { MMKV } from "react-native-mmkv";

// Create an MMKV instance
const storage = new MMKV({ id: "theme-storage" });

// Helper functions
const getStoredTheme = () => storage.getString("theme") || "light";
const saveTheme = (theme) => storage.set("theme", theme);

export const useThemeStore = create((set, get) => ({
  mode: getStoredTheme(), // initialize from MMKV

  toggleTheme: () => {
    const newMode = get().mode === "light" ? "dark" : "light";
    set({ mode: newMode });
    saveTheme(newMode); // save to MMKV
  },

  setTheme: (theme) => {
    set({ mode: theme });
    saveTheme(theme); // also save manually
  },
}));
