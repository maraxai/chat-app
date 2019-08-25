// import react component from react library
import React from 'react';
// import Start component from start.js
import Start from './components/start';
import Chat from './components/chat';
// StackNavigator manages the included screens, i.e. components, AppContainer wraps those together
import { createStackNavigator, createAppContainer } from 'react-navigation';
// elements that are used
import { StyleSheet, Text, View } from 'react-native';
// const navigator is the stack of screens/components
const navigator = createStackNavigator({
  start: { screen: Start },
  chat: { screen: Chat }
});


// navigationContainer is the main container that holds the state of the different components/screens
const navigatorContainer = createAppContainer(navigator);

export default navigatorContainer;
