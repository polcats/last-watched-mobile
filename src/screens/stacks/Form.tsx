import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Text } from 'react-native';
import { appContext } from '../../models';

const Form: React.FC = () => {
  const context = useContext(appContext);
  return <Text>Form...</Text>;
};

export default observer(Form);
