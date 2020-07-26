import 'mobx-react-lite/batchingForReactDom';
import React, { useContext } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { observer } from 'mobx-react-lite';
import { NavigationContainer } from '@react-navigation/native';
import { Home, Form, Stack } from './stacks';
import { appContext } from '../models';

const Screen: React.FC = () => {
  const context = useContext(appContext);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={({ navigation }) => ({
            title: 'Watch List',
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.push('Form', { isNew: true })}
              >
                <Text>Create</Text>
              </TouchableOpacity>
            ),
          })}
          component={Home}
        />
        <Stack.Screen
          name="Form"
          options={({ route, navigation }) => ({
            title: `${route.params?.isNew ? 'Create' : 'Edit'} Show`,
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.pop()}>
                <Text>Save</Text>
              </TouchableOpacity>
            ),
          })}
          component={Form}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default observer(Screen);
