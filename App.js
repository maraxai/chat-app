import React from 'react';
import Start from './components/start';
import Chat from './components/chat';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { StyleSheet, Text, View } from 'react-native';

const navigator = createStackNavigator({
  start: { screen: Start },
  chat: { screen: Chat }
});

const navigatorContainer = createAppContainer(navigator);

export default navigatorContainer;
