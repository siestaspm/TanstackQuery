# TanStack Query

A React Native project using TanStack Query, Zustand, MMKV Storage, and Environment Variables — providing a clean, powerful architecture for server-state management, global UI/local state, persistent storage, and configurable environments.

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## 📦 What’s Inside / Why This Stack

### 🟩 TanStack Query — Server-State Management

• Fetching, caching, and synchronizing API data

• Background updates, retry logic, stale time control

• Handles focus events, app state changes, and offline mode

• Perfect for async remote data
    👉 https://tanstack.com

### 🟦 Zustand — Local / UI State

• Lightweight global state (theme, toggles, filters, UI flags, etc.)
• Avoids using server-state for UI logic
• No boilerplate compared to Redux
    👉 https://github.com/pmndrs/zustand

### 🟨 MMKV — High-performance Persistent Storage

• Very fast (written in C++)
• Ideal for caching + persisting local data
• Used for persisting TanStack Query Cache + Zustand state
    👉 https://github.com/mrousavy/react-native-mmkv

### 🟪 Environment Variables (.env)

• Configure API URLs, keys, and environment-dependent configuration
• Clean Dev/Prod switching without hardcoding values
• Supports .env.development, .env.production, and custom ENVFILE

### 🎯 Benefits of This Architecture

• Clean separation of server-state vs local UI state
• Persistent offline-first caching using TanStack Query + MMKV
• Global state done simply with Zustand
• Dynamic environment configuration using .env

## ✅ Features

### Server Data 

• Fetch & cache API responses
• Stale-time control
• Automatic refetching
• Retry & error handling
• Background refresh

### Offline-First Support

• Cached data persists across restarts
• Uses MMKV + TanStack Query Persister

### Local State
• UI state & preferences using Zustand

### Environment Config
• .env.development
• .env.production
• Easily switches using ENVFILE

## 🔶 1. Setup TanStack Query
 In App.tsx:

```
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, 
      retry: 3,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* rest of your app */}
    </QueryClientProvider>
  );
}
```

Using a Query

```
import { MMKV } from 'react-native-mmkv';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';

const storage = new MMKV();

const persister = createSyncStoragePersister({
  storage: {
    setItem: (key, value) => storage.set(key, value),
    getItem: (key) => storage.getString(key) ?? null,
    removeItem: (key) => storage.delete(key),
  },
});
```

Wrap your app:

```
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';

<PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
  <App />
</PersistQueryClientProvider>
```

## 🔶 3. Zustand for Client / UI State

```
import { create } from 'zustand';

export const useStore = create((set) => ({
  theme: 'light',
  toggleTheme: () => set(s => ({
    theme: s.theme === 'light' ? 'dark' : 'light'
  })),
}));
```

Usage in components:

```
const theme = useStore((state) => state.theme);
```

## 🔶 3. Zustand for Client / UI State

Example .env.development:

```
API_BASE_URL=https://dev.api.yoursite.com
```

Example usage (depending on your setup):

```
import { API_BASE_URL } from '@env';

fetch(`${API_BASE_URL}/posts`);
```

### 🧩 When to Use What

Use Case                                    | Tool
------------------------------------------- | -------------
Remote API data, caching, refetching        | TanStack Query
UI state, selectors, toggles                | Zustand
Persist storage, offline cache              | MMKV
Environment config                          | .env




