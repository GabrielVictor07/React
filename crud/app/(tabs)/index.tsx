import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppTab from '../AppTab'; // ou o caminho relativo correto do seu AppTab

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <AppTab />
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
};

export default App;
