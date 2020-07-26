import 'mobx-react-lite/batchingForReactDom';
import React, { useContext } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { observer } from 'mobx-react-lite';
import { NavigationContainer } from '@react-navigation/native';
import { Home, Form, Stack } from './stacks';
import { appContext } from '../models';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FlashMessage from 'react-native-flash-message';

const Screen: React.FC = () => {
  const context = useContext(appContext);

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            options={({ navigation }) => ({
              title: 'Watch List',
              headerTitleAlign: 'center',
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => {
                    context.setMode('create');
                    context.shows.createItem();
                    navigation.push('Form', { isNew: true });
                  }}
                >
                  <Ionicons name="ios-add-circle" size={30} color="skyblue" />
                </TouchableOpacity>
              ),
            })}
            component={Home}
          />
          <Stack.Screen
            name="Form"
            options={({ route, navigation }) => ({
              headerTitleAlign: 'center',
              title: `${route.params?.isNew ? 'Create' : 'Edit'} Show`,
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => {
                    context.setDontSave(false);

                    // Success scenario
                    if (
                      context.shows.getTargetItem()?.isValid &&
                      !context.dontSave
                    ) {
                      navigation.pop();

                      // For consecutive additions
                      if (context.mode === 'create') {
                        context.shows.createItem();
                        navigation.push('Form', { isNew: true });
                      }

                      return;
                    }

                    // For error scenario
                    context.setDontSave(true);
                    const item = context.shows.getTargetItem();
                    if (item) {
                      context.setError(!item.isValidName, !item.isValidEpisode);
                    }
                  }}
                >
                  <MaterialCommunityIcons
                    name="check"
                    size={30}
                    color="green"
                  />
                </TouchableOpacity>
              ),
            })}
            component={Form}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <FlashMessage position="top" />
    </>
  );
};

export default observer(Screen);
