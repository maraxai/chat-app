// component React from react library
import React from 'react';
// react components used in this file
import { StyleSheet, Text, View, Button, Navigator } from 'react-native';

// class component
export default class Chat extends React.Component {
  //navigation bar configuration
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.name 
    };
  }
  render() {
    const navigation = this.props.navigation.state.params.name;
    const color = this.props.navigation.state.params.color;
    return (
      <View style={{flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color}}
      >
      </View>
    )
  }
}

////////////
// styling section
///////////

const styles = StyleSheet.create({

})
