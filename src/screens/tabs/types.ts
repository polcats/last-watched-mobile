import {
  createBottomTabNavigator,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import { Status } from '../../models';

type TabParams = {
  OnGoing: { status: Status };
  OnHold: { status: Status };
  Done: { status: Status };
};

type OnGoingTabNavigation = BottomTabScreenProps<TabParams, 'OnGoing'>;
type OnHoldTabNavigation = BottomTabScreenProps<TabParams, 'OnHold'>;
type DoneTabNavigation = BottomTabScreenProps<TabParams, 'Done'>;

const Tab = createBottomTabNavigator<TabParams>();

export type { OnGoingTabNavigation, OnHoldTabNavigation, DoneTabNavigation };
export { Tab };
