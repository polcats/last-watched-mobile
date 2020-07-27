import React from 'react';
import { Screen } from './src/screens/';
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';

export default function App() {
  let [fontsLoaded] = useFonts({
    Ubuntu: require('./assets/fonts/Ubuntu-L.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return <Screen />;
  }
}
