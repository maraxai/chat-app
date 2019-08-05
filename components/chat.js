// component React from react library
import React from 'react';
// react components used in this file
import { StyleSheet, Text, View, Button, Navigator } from 'react-native';

// class component
export default class Chat extends React.Component {
  //navigation bar configuration
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.name + '\'s favorite color is: ' + navigation.state.params.color
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

////////////
// styling section
///////////

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow'
  }
})
