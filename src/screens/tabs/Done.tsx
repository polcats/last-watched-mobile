import React from 'react';
import { observer } from 'mobx-react-lite';
import { Status } from '../../models';
import { List } from '../components/';

const Done: React.FC = () => {
  return <List display={'done' as Status.done} />;
};

export default observer(Done);
