import React from 'react';
import { StyleSheet, Text, View, Button, Navigator } from 'react-native';

export default class Chat extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.name + '\'s Profile'
    };
  }
  render() {
    const navigation = this.props.navigation.state.params.name;
    return (
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
    <Text>Hello {this.props.navigation.state.params.name}!!</Text>
    </View>
    )
  }
}
