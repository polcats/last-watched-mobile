import React, { useContext } from 'react';
import { Screen } from './src/screens/';
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';
import { AsyncStorage } from 'react-native';
import { appContext } from './src/models';

export default function App() {
  const context = useContext(appContext);

  (async () => {
    try {
      const data = await AsyncStorage.getItem('lastWatchedData');
      const items = data ? JSON.parse(data) : undefined;
      if (items) {
        items.forEach((value: any) => {
          context.shows.addItem(value[1].$);
        });
      }
    } catch (error) {}
  })();

  let [fontsLoaded] = useFonts({
    Ubuntu: require('./assets/fonts/Ubuntu-L.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return <Screen />;
  }
}
