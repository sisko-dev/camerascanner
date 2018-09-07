import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createSwitchNavigator, createStackNavigator, createTabNavigator } from 'react-navigation';

import LoginScreen from './src/screens/LoginScreen'
import HomeScreen from './src/screens/HomeScreen'
import CheckInScreen from './src/screens/CheckInScreen'
import CheckInListScreen from './src/screens/CheckInListScreen'

const HomeStackNavigator = createStackNavigator({
  Welcome: {
    screen: HomeScreen,
    navigationOptions: {
      header: null
    }
  },
  CheckIn: CheckInScreen,
  List: CheckInListScreen

})

export default createSwitchNavigator({
  Login: LoginScreen,
  Home: HomeStackNavigator
})



