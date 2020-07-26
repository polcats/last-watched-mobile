import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Text } from 'react-native';
import { appContext } from '../../models';

const Home: React.FC = () => {
  const context = useContext(appContext);
  return <Text>Root...</Text>;
};

export default observer(Home);
