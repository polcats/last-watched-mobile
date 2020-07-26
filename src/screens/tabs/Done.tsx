import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Text } from 'react-native';
import { appContext } from '../../models';

const Done: React.FC = () => {
  const context = useContext(appContext);
  return <Text>Done List..</Text>;
};

export default observer(Done);
