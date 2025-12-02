import React, { useEffect } from 'react';
import { View, StyleSheet, AppState } from 'react-native';
import { QueryClient, QueryClientProvider, focusManager } from '@tanstack/react-query';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { persister } from './src/hooks/queryPersistor';

import ViewPostScreen from './src/screens/ViewPostScreen';
import CreatePostScreen from './src/screens/CreatePostScreen'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 24 * 60 * 60 * 1000,
      cacheTime: 24 * 60 * 60 * 1000,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
    },
  },
});

export default function App() {
  useEffect(() => {
    persistQueryClient({ queryClient, persister });

    const subscription = AppState.addEventListener('change', (state) => {
      focusManager.setFocused(state === 'active');
    });

    return () => subscription.remove();
  }, []);

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <QueryClientProvider client={queryClient}>
          <CreatePostScreen />
        </QueryClientProvider>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
});
