import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { FlatList, StyleSheet } from 'react-native';
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
    <FlatList
      style={[styles.list, bgColor]}
      data={data}
      renderItem={({ item }) => {
        return <Item item={item[1]} />;
      }}
      keyExtractor={(item) => item[1].id}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    alignContent: 'center',
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
});

export default observer(List);
