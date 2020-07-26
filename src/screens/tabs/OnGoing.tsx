import React from 'react';
import { observer } from 'mobx-react-lite';
import { Status } from '../../models';
import { List } from '../components/';

const OnGoing: React.FC = () => {
  return <List display={'ongoing' as Status.ongoing} />;
};

export default observer(OnGoing);
