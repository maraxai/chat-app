// import component React from react library
import React from 'react';
// import react components that style the UI
import { StyleSheet, Text, View, Button, TextInput, ImageBackground, TouchableHighlight, TouchableOpacity } from 'react-native';

// react class component with constructor function containing the state of name and color
export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      color: '',
      border: false
    }
  }

/* react native styling components and their html equivalences
View - div
TouchableOpacity (and TouchableHighlight) - button
*/
changeColor = (value) => {
  this.setState({color: value});
}

toggleBorder(color) {
  this.setState({ border: !this.state.border})
}


  render() {
    return (
      <View style={styles.container}>
      <ImageBackground source={require('../assets/startscreen_bg.png')} style={styles.backgroundImage}>
        <View style={styles.innercontainer}>
          <Text style={styles.title}>Chat App</Text>
          <View style={styles.entries}>
            <TextInput
              style={styles.input}
              onChangeText={(name) => this.setState({ name })}
              value={this.state.name}
              placeholder='Your Name'
            />
            <Text style={styles.pickcolor}>Choose Background Color:</Text>
            <View style={styles.colors}>

              <TouchableOpacity
                onPress={this.changeColor}
                value={'#090C08'}
                style={styles.black} />

              <TouchableOpacity
                onPress={() => this.setState({color: '#474056'})}
                style={styles.lila} />

              <TouchableOpacity
                onPress={(color) => this.setState({color: '#8A95A5'})}
                style={styles.blue} />
              <TouchableOpacity
                onPress={this.toggleBorder}
                { border == false &&
                <View style={styles.grey2} ></View>
                }
                <View style={styles.grey1} ></View>
              </TouchableOpacity>
            </View>
            <TouchableHighlight style={styles.button}
              onPress={() => this.props.navigation.navigate('chat', { name: this.state.name }, { color: this.state.color })}>
              <Text style={styles.buttonlabel}>Start Chatting</Text>
            </TouchableHighlight>
          </View>
        </View>
        </ImageBackground>
      </View>
    )
  }
}

////////////////
// UI Styling section (equivalences to CSS)
///////////////

const styles = StyleSheet.create({
  // main container that holds all elements
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  // background image
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  // holds title and entries (input field, color selection and 'start chatting' button)
  innercontainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',

  },
  // app title
  title: {
    color: '#fff',
    fontSize: 45,
    fontWeight: '600',
    marginTop: 74
  },
  // text: 'Choose Background Color:'
  pickcolor: {
    color: '#757083',
    fontSize: 16,
    fontWeight: '300',
    margin: 20
  },
  // input field, color selection and 'start chatting' button
  entries: {
    width: '88%',
    height: '44%',
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingBottom: 25,
    marginBottom: 23
  },
  // input field
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
  // button
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#757083',
    width: '88%',
    height: 80,
    marginLeft: 18,
    marginTop: 40
  },
  // button lable 'Start Chatting'
  buttonlabel: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16
  },
  // container with colors
  colors: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '72%',
    marginLeft: 12
  },
  black: {
    backgroundColor: '#090C08',
    height: 40,
    width: 40,
    borderRadius: 80
  },
  lila: {
    backgroundColor: '#474056',
    height: 40,
    width: 40,
    borderRadius: 80
  },
  blue: {
    backgroundColor: '#8A95A5',
    height: 40,
    width: 40,
    borderRadius: 80
  },
  grey: {
    backgroundColor: '#B9C6AE',
    height: 40,
    width: 40,
    borderRadius: 80,
  },
  grey2: {
    backgroundColor: '#fff',
    height: 45,
    width: 45,
    borderRadius: 90,
    borderWidth:2,
    borderColor: '#B9C6AE'
  }
});
