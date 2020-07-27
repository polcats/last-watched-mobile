import React from 'react';
import { observer } from 'mobx-react-lite';
import { HomeScreenNavigation } from './types';
import { OnGoing, OnHold, Done } from '../tabs';
import { Tab } from '../tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Home: React.FC<HomeScreenNavigation> = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = '';

          switch (route.name) {
            case 'OnGoing': {
              iconName = focused ? 'play-circle' : 'play-circle-outline';
              break;
            }
            case 'OnHold': {
              iconName = focused ? 'pause-circle' : 'pause-circle-outline';
              break;
            }
            case 'Done': {
              iconName = focused ? 'check-circle' : 'check-circle-outline';
              break;
            }
          }

          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
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
