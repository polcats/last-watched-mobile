import React from 'react';
import { observer } from 'mobx-react-lite';
import { HomeScreenNavigation } from './types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tab, OnGoing, OnHold, Done } from '../tabs';

const Home: React.FC<HomeScreenNavigation> = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, focused, size }) => {
          let iconName = '';

          switch (route.name) {
            case 'OnGoing': {
              iconName = focused ? 'play-circle' : 'play-circle-outline';
              color = focused ? 'rgb(186, 215, 200)' : color;
              break;
            }
            case 'OnHold': {
              iconName = focused ? 'pause-circle' : 'pause-circle-outline';
              color = focused ? 'rgb(253, 228, 130)' : color;
              break;
            }
            case 'Done': {
              iconName = focused ? 'check-circle' : 'check-circle-outline';
              color = focused ? 'rgb(186, 186, 206)' : color;
              break;
            }
          }

          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: 'black',
        inactiveTintColor: '#999',
        labelStyle: {
          fontFamily: 'Ubuntu',
        },
      }}
    >
      <Tab.Screen
        name="OnGoing"
        options={() => ({
          title: 'On Going',
        })}
        component={OnGoing}
      />
      <Tab.Screen
        name="OnHold"
        options={() => ({
          title: 'On Hold',
        })}
        component={OnHold}
      />
      <Tab.Screen
        name="Done"
        options={() => ({
          title: 'Finished',
        })}
        component={Done}
      />
    </Tab.Navigator>
  );
};

export default observer(Home);
