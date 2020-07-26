import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Text } from 'react-native';
import { appContext } from '../../models';

const OnHold: React.FC = () => {
  const context = useContext(appContext);
  return <Text>OnHold List..</Text>;
};

export default observer(OnHold);
