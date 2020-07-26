import React from 'react';
import { observer } from 'mobx-react-lite';
import { Status } from '../../models';
import { List } from '../components/';

const OnHold: React.FC = () => {
  return <List display={'onhold' as Status.onhold} />;
};

export default observer(OnHold);
