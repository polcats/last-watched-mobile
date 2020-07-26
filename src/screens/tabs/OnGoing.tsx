import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Text } from 'react-native';
import { appContext } from '../../models';

const OnGoing: React.FC = () => {
  const context = useContext(appContext);
  return <Text>OnGoing List..</Text>;
};

export default observer(OnGoing);
