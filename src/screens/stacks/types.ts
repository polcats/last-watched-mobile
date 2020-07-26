import {
  createStackNavigator,
  StackScreenProps,
} from '@react-navigation/stack';
import { Status } from '../../models';

type RootStackParams = {
  Home: { tab: Status };
  Form: { isNew: boolean; title?: string };
};

type HomeScreenNavigation = StackScreenProps<RootStackParams, 'Home'>;
type FormScreenNavigation = StackScreenProps<RootStackParams, 'Form'>;
const Stack = createStackNavigator<RootStackParams>();

export type { HomeScreenNavigation, FormScreenNavigation };
export { Stack };
