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
    const color = this.props.navigation.state.params.color;
    return (
      <View style={styles.container}>
        <View>
          <Text>Hello {navigation}!</Text>
        </View>
        <View>
          <Text>Your color selection: {color}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow'
  }
})
