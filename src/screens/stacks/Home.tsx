import React from 'react';
import { observer } from 'mobx-react-lite';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { appContext } from '../../models';
import { HomeScreenNavigation } from './types';
import { Tab, OnGoing, OnHold, Done } from '../tabs';

const Home: React.FC<HomeScreenNavigation> = ({ navigation }) => {
  const context = React.useContext(appContext);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Watch List',
      headerTitleStyle: {
        fontFamily: 'Ubuntu',
      },
      headerTitleAlign: 'center',
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            context.setMode('create');
            navigation.push('Form', { isNew: true });
            context.shows.createItem();
          }}
        >
          <Ionicons
            style={styles.iconRight}
            name="ios-add-circle"
            size={30}
            color="skyblue"
          />
        </TouchableOpacity>
      ),
    });
  });

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

const styles = StyleSheet.create({
  iconRight: {
    marginRight: 20,
  },
});

export default observer(Home);
