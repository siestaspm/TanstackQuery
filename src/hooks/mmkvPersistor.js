
import { MMKV } from "react-native-mmkv";

export const storage = new MMKV();
export const createMMKVPersistor = () => {
  return {
    persistClient: async (client) => {
      try {
        storage.set("reactQuery", JSON.stringify(client));
      } catch (e) {
        console.log("Persist error:", e);
      }
    },

    restoreClient: async () => {
      try {
        const value = storage.getString("reactQuery");
        return value ? JSON.parse(value) : undefined;
      } catch (e) {
        console.log("Restore error:", e);
        return undefined;
      }
    },

    removeClient: async () => {
      try {
        storage.delete("reactQuery");
      } catch (e) {
        console.log("Remove error:", e);
      }
    },
  };
}
