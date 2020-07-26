import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Text, View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Show } from '../../models';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { appContext } from '../../models';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

type ItemProps = {
  item: Show;
};

const Item: React.FC<ItemProps> = ({ item }) => {
  const context = useContext(appContext);
  const navigation = useNavigation();

  const editItem = () => {
    context.setMode('edit');
    context.shows.setTargetItem(item.id);
    navigation.navigate('Form', { isNew: false });
  };

  const confirmDelete = () => {
    Alert.alert(
      'Delete',
      `Are you sure you want to delete ${item.name}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            context.shows.deleteItem(item.id);
          },
        },
      ],
      { cancelable: false },
    );
  };

  if (item.isNew) {
    return <></>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.arrows}>
        <TouchableOpacity
          onPress={() => {
            item.incrementEpisode();
            context.shows.save();
          }}
        >
          <AntDesign
            style={[styles.icon, styles.placeCenter]}
            name="upcircle"
            size={24}
            color="skyblue"
          />
        </TouchableOpacity>

        <Text style={styles.episodeText}>{item.lastEpisode}</Text>

        <TouchableOpacity
          onPress={() => {
            item.decrementEpisode();
            context.shows.save();
          }}
        >
          <AntDesign
            style={[styles.icon, styles.placeCenter]}
            name="downcircle"
            size={24}
            color="skyblue"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.details}>
        <Text numberOfLines={2} style={styles.titleText}>
          {item.name}
        </Text>
        <Text style={styles.dateText}>
          Last watched {moment(item.date, 'YYYYMMDD').fromNow()}
        </Text>
      </View>

      <View style={[styles.modifiers]}>
        <TouchableOpacity onPress={editItem}>
          <MaterialCommunityIcons
            style={[styles.icon, styles.placeCenter]}
            name="circle-edit-outline"
            size={24}
            color="black"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={confirmDelete}>
          <MaterialCommunityIcons
            style={[styles.icon, styles.placeCenter]}
            name="delete-circle"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  'container:last-child': {
    margin: 200,
  },
  details: {
    flex: 5,
    height: '100%',
    justifyContent: 'center',
    borderRightColor: '#eee',
    borderRightWidth: 2,
    borderLeftColor: '#eee',
    borderLeftWidth: 2,
  },
  arrows: {
    flex: 1,
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  modifiers: {
    flex: 1,
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  icon: {
    margin: 5,
  },
  placeCenter: {
    alignSelf: 'center',
  },
  dateText: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
  },
  episodeText: {
    fontSize: 20,
    textAlign: 'center',
  },
  titleText: {
    fontSize: 20,
    textAlign: 'center',
    paddingLeft: 5,
    paddingRight: 5,
  },
});

export default observer(Item);
