import { MMKV } from "react-native-mmkv";
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';

export const storage = new MMKV({ id: "reactQueryCache" });

export const persister = createSyncStoragePersister({
  storage: {
    getItem: (key) => {
        console.log('ehllo')
      const value = storage.getString(key);
      return value ?? null;
    },
    setItem: (key, value) => {
        console.log('setted')
      storage.set(key, value);
    },
    removeItem: (key) => {
        console.log('revmoe item')
      storage.delete(key);
    },
  },
});
