import React from 'react';
import { SafeAreaView, SafeAreaProvider }  from 'react-native-safe-area-context';

import Routes from './src/routes';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex:1, paddingBottom: 0}}>
        <Routes/>
      </SafeAreaView> 
    </SafeAreaProvider>
  );
}