/** @format */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';

import createSwitchNavigator from './App'

AppRegistry.registerComponent(appName, () => createSwitchNavigator);
