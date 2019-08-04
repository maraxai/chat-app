import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, ImageBackground, TouchableHighlight } from 'react-native';

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      color: ''
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Chat App</Text>

        <View style={styles.entries}>
          <TextInput style={styles.input} placeholder='Your Name'/>
          <Text style={styles.pickcolor}>Choose Background Color:</Text>
          <View style={styles.colors}>

            <View style={styles.black}></View>
            <View style={styles.lila}></View>
            <View style={styles.blue}></View>
            <View style={styles.grey}></View>
          </View>
          <TouchableHighlight style={styles.button}
            onChangeText={(name) => this.setState({name})}
            value={this.state.name}
            onPress={() => this.props.navigation.navigate('chat', { name: this.state.name })}>
            <Text style={styles.buttonlabel}>Start Chatting</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}
/*  <ImageBackground source={'./assets/startscreen_bg.png'} style={{width: 400, height: 200}}>
<Text>x</Text>
</ImageBackground>
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#999',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 30
  },
  title: {
    color: '#fff',
    fontSize: 45,
    fontWeight: '600',
  },
  pickcolor: {
    color: '#757083',
    fontSize: 16,
    fontWeight: '300',
    margin: 20
  },
  entries: {
    width: '88%',
    height: '44%',
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingBottom: 20
  },
  input: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'grey',
    margin: 20,
    width: '88%',
    height: 60,
    padding: 20
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#757083',
    width: '88%',
    height: 60,
    marginLeft: 18
  },
  buttonlabel: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16
  },
  colors: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '88%'
  },
  black: {
    backgroundColor: '#090C08',
    height: 50,
    width: 50,
    borderRadius: 100,
  },
  lila: {
    backgroundColor: '#474056',
    height: 50,
    width: 50,
    borderRadius: 100
  },
  blue: {
    backgroundColor: '#8A95A5',
    height: 50,
    width: 50,
    borderRadius: 100
  },
  grey: {
    backgroundColor: '#B9C6AE',
    height: 50,
    width: 50,
    borderRadius: 100
  }
});
