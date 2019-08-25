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

  render() {
    const color = this.state.color;
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
            <View style={{flex: 1, justifyContent: 'space-around', alignItems: 'flex-start'}}>
              <Text style={styles.pickcolor}>Choose Background Color:</Text>
              <View style={styles.colors}>

              <TouchableOpacity
                onPress={() => this.setState({color: '#090C08'})}
                style={styles.black}
              >
                { (this.state.color == '#090C08') ?
                  (
                    <View style={{position: 'absolute', left: -5, top: -5}}>
                      <View style={[styles.black2]} ><View style={[styles.black]} ></View></View>
                      </View>
                  )
                  : (<View style={styles.black} ></View>)
                }
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.setState({color: '#474056'})}
                style={styles.lila}
              >
                { (this.state.color == '#474056') ?
                  (
                    <View style={{position: 'absolute', left: -5, top: -5}}>
                      <View style={[styles.lila2]} ><View style={[styles.lila]} ></View></View>
                      </View>
                  )
                  : (<View style={styles.lila} ></View>)
                }
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.setState({color: '#8A95A5'})}
                style={styles.blue}
              >
                { (this.state.color == '#8A95A5') ?
                  (
                    <View style={{position: 'absolute', left: -5, top: -5}}>
                      <View style={[styles.blue2]} ><View style={[styles.blue]} ></View></View>
                      </View>
                  )
                  : (<View style={styles.blue} ></View>)
                }
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.setState({color: '#B9C6AE'})}
                style={styles.grey}
              >
                { (this.state.color == '#B9C6AE') ?
                  (
                    <View style={{position: 'absolute', left: -5, top: -5}}>
                      <View style={[styles.grey2]} ><View style={[styles.grey]} ></View></View>
                      </View>
                  )
                  : (<View style={styles.grey} ></View>)
                }
              </TouchableOpacity>

              </View>
            </View>
            <TouchableOpacity style={styles.button}
              onPress={() => this.props.navigation.navigate('chat', { name: this.state.name, color: this.state.color })}>
              <Text style={styles.buttonlabel}>Start Chatting</Text>
            </TouchableOpacity>
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
    paddingBottom: 10
  },
  // input field, color selection and 'start chatting' button
  entries: {
    width: '88%',
    height: '44%',
    backgroundColor: '#fff',
    alignItems: 'center',
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
    borderWidth: 1,
    borderColor: 'grey',
    margin: 20,
    width: '88%',
    height: 60,
    padding: 20
  },
  // button
  button: {
    backgroundColor: '#757083',
    width: '88%',
    height: 60,
    padding: 20
  },
  // button lable 'Start Chatting'
  buttonlabel: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '600',
    fontSize: 16
  },
  // container with colors
  colors: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '74%'
  },
  full: {
    height: 40,
    width: 40,
    borderRadius: 80
  },
  black: {
    backgroundColor: '#090C08',
    height: 35,
    width: 35,
    borderRadius: 70
  },
  black2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 44,
    width: 44,
    borderRadius: 22,
    borderWidth:2,
    borderColor: '#090C08'
  },
  lila: {
    backgroundColor: '#474056',
    height: 35,
    width: 35,
    borderRadius: 70
  },
  lila2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 44,
    width: 44,
    borderRadius: 22,
    borderWidth:2,
    borderColor: '#474056',
    opacity: 1
  },
  blue: {
    backgroundColor: '#8A95A5',
    height: 35,
    width: 35,
    borderRadius: 70
  },
  blue2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 44,
    width: 44,
    borderRadius: 22,
    borderWidth:2,
    borderColor: '#8A95A5'
  },
  grey: {
    backgroundColor: '#B9C6AE',
    height: 35,
    width: 35,
    borderRadius: 70
  },
  grey2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 44,
    width: 44,
    borderRadius: 22,
    borderWidth:2,
    borderColor: '#B9C6AE'
  }
});
