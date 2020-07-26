import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Text } from 'react-native';
import { appContext } from '../../models';
import { FormScreenNavigation } from './types';

const Form: React.FC<FormScreenNavigation> = ({ route, navigation }) => {
  const context = useContext(appContext);
  return <Text>Form...</Text>;
};

export default observer(Form);
