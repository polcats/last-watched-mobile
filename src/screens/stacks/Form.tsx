import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { getSnapshot } from 'mobx-keystone';
import {
  Text,
  TextInput,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  Picker,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Show, appContext } from '../../models';
import { FormScreenNavigation } from './types';

const Form: React.FC<FormScreenNavigation> = ({ route, navigation }) => {
  const context = useContext(appContext);
  const item = context.shows.getTargetItem();
  const itemBackup = context.mode === 'edit' ? getSnapshot(item) : undefined;

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        if (!item) {
          return;
        }

        // Back button scenario
        if (context.dontSave) {
          if (context.mode === 'create') {
            context.shows.deleteTargetItem();
          } else if (context.mode === 'edit') {
            if (itemBackup) {
              context.shows.resetTargetItem(itemBackup as Show);
            }
          }
        } else {
          if (context.mode === 'create') {
            item.setOld();
            showMessage({
              message: `${item.name} has been created.`,
              type: 'success',
            });
          } else if (context.mode === 'edit' && !context.dontSave) {
            item.updateDate();
          }
        }

        context.setDontSave(true);
        context.setError(false, false);
      };
    }, []),
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: `${route.params?.isNew ? 'Create' : 'Edit'} Show`,
      headerTitleStyle: {
        fontFamily: 'Ubuntu',
      },
      headerTitleAlign: 'center',
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            context.setDontSave(false);

            // Success scenario
            if (context.shows.getTargetItem()?.isValid && !context.dontSave) {
              navigation.pop();
              context.shows.save();

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
            style={styles.iconRight}
            name="check"
            size={30}
            color="green"
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <TouchableWithoutFeedback
      style={styles.touchable}
      onPress={() => Keyboard.dismiss()}
    >
      <View style={styles.inner}>
        <>
          <Text style={styles.label}>Title</Text>
          {!!context.errors.name && (
            <Text style={styles.inputError}>Title is required..</Text>
          )}
          <TextInput
            defaultValue={route.params.isNew ? '' : item?.name}
            autoFocus={true}
            autoCapitalize="words"
            style={styles.inputView}
            placeholder="Enter a show's title"
            onChangeText={(text) => {
              item?.setName(text);
            }}
          ></TextInput>

          <Text style={styles.label}>Episode</Text>
          {!!context.errors.episode && (
            <Text style={styles.inputError}>Enter a valid episode (eg. 1)</Text>
          )}
          <TextInput
            style={styles.inputView}
            keyboardType="numeric"
            placeholder="Last watched episode"
            defaultValue={`${route.params.isNew ? 1 : item?.lastEpisode}`}
            onChangeText={(text) => {
              if (text) {
                item?.setEpisode(parseInt(text, 10));
              }
            }}
          ></TextInput>

          <Text style={styles.label}>Status</Text>
          <Picker
            style={styles.inputView}
            selectedValue={item?.status}
            onValueChange={(itemValue, itemIndex) => item?.setStatus(itemValue)}
          >
            <Picker.Item label="Actively watching" value="ongoing" />
            <Picker.Item label="Taking a break" value="onhold" />
            <Picker.Item label="Finished" value="done" />
          </Picker>
        </>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: '#eee',
  },
  inner: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 20,
  },
  touchable: {
    height: '100%',
  },
  label: {
    fontSize: 20,
    marginTop: 20,
    fontFamily: 'Ubuntu',
  },
  inputView: {
    backgroundColor: '#fff',
    marginTop: 5,
    borderRadius: 0,
    padding: 10,
    fontFamily: 'Ubuntu',
  },
  inputError: {
    color: 'red',
    fontSize: 12,
  },
  highlightError: {
    borderColor: 'red',
    borderWidth: 1,
  },
  iconRight: {
    marginRight: 20,
  },
});

export default observer(Form);
