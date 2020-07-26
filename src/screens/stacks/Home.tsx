import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { appContext } from '../../models';
import { HomeScreenNavigation } from './types';
import { OnGoing, OnHold, Done } from '../tabs';
import { Tab } from '../tabs';

const Home: React.FC<HomeScreenNavigation> = ({ route, navigation }) => {
  const context = useContext(appContext);
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="OnGoing"
        options={({ navigation }) => ({
          title: 'On Going',
        })}
        component={OnGoing}
      />
      <Tab.Screen
        name="OnHold"
        options={({ navigation }) => ({
          title: 'On Hold',
        })}
        component={OnHold}
      />
      <Tab.Screen
        name="Done"
        options={({ navigation }) => ({
          title: 'Finished',
        })}
        component={Done}
      />
    </Tab.Navigator>
  );
};

export default observer(Home);
