import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import { appContext, Status } from '../../models';
import Item from './Item';

type ListProps = {
  display: Status;
};

const List: React.FC<ListProps> = ({ display }) => {
  const context = useContext(appContext);

  const data = Array.from(context.shows.items)
    .reverse()
    .filter((item) => {
      if (item[1].status === display) {
        return item;
      }
    });

  let bgColor;
  switch (display) {
    case 'ongoing': {
      bgColor = styles.ongoing;
      break;
    }
    case 'onhold': {
      bgColor = styles.onhold;
      break;
    }
    case 'done': {
      bgColor = styles.done;
      break;
    }
  }

  return (
    <View style={[styles.container, bgColor]}>
      {data.length ? (
        <FlatList
          style={[styles.list]}
          data={data}
          renderItem={({ item }) => {
            return <Item item={item[1]} />;
          }}
          keyExtractor={(item) => item[1].id}
        />
      ) : (
        <Text style={styles.emptyText}>
          Currently no shows under this category.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  list: {
    flex: 1,
  },
  ongoing: {
    backgroundColor: 'rgb(186, 215, 200)',
  },
  onhold: {
    backgroundColor: 'rgb(253, 228, 130)',
  },
  done: {
    backgroundColor: 'rgb(186, 186, 206)',
  },
  emptyText: {
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    textAlignVertical: 'center',
    fontSize: 15,
  },
});

export default observer(List);
