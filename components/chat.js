// component React from react library
import React from 'react';
// react components used in this file
import { StyleSheet, Text, View, Button, Navigator, Platform, TouchableOpacity } from 'react-native';
// chat ui
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
// puts space between text line and keyboard
import KeyboardSpacer from 'react-native-keyboard-spacer';
// gets info from react about the current platform (Android/iOS)

const firebase = require('firebase');
require('firebase/firestore');

// class component
export default class Chat extends React.Component {
  constructor() {
    super();

    var firebaseConfig = {
      apiKey: "AIzaSyDAopaFuNd6lMgaAqpuN9YWHD0TSJgZPbA",
      authDomain: "chat-app-21fd9.firebaseapp.com",
      databaseURL: "https://chat-app-21fd9.firebaseio.com",
      projectId: "chat-app-21fd9",
      storageBucket: "chat-app-21fd9.appspot.com",
      messagingSenderId: "94521123634",
      appId: "1:94521123634:web:18053b98f6cf6c2e"
    };

    if (!firebase.apps.length) { //avoid re-initializing
      firebase.initializeApp(firebaseConfig)
    }

    this.referenceUser = null;
    this.referenceMessages = firebase.firestore().collection('messages');

    this.state = {
      messages: [],
      uid: 0,
      loggedInText: 'We are currently struggling to log you in!'
    };
    console.log('log initial state: 1: messages / 2: uid / 3: loggedInText || 1: ' + this.state.messages + ' / 2: ' + this.state.uid + ' / 3: ' + this.state.loggedInText )
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    console.log('in onCollectionUpdate log data', messages)
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      var data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt,
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: data.user.avatar
        }
      });
      this.setState({
        messages
      });
      console.log('in onCollectionUpdate log this.state.messages:', this.state.messages)
    });
  };

  addMessage() {
    this.referenceMessages.add({
    messages: this.state.messages
    })
    console.log('log messages state in addMessage', this.state.messages)
    //console.log('log id: _id state in addMessage', _id)
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }), () => {
      this.addMessage()
      })
    }
  //navigation bar configuration
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.name
    };
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#123458'
          }
        }}
      />
    )
  }

  render() {
    const navigation = this.props.navigation.state.params.name;
    const color = this.props.navigation.state.params.color;
    return (
      <View style={{flex: 1,
        backgroundColor: color,
        marginBottom: 40
      }}
      >
        <Text style={{flex: 1,
          textAlign: 'center',
          fontSize: 20,
          marginTop: 20
        }}
        >{this.state.loggedInText}</Text>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: this.state.uid,
            name: navigation,
            avatar: ''
          }}
        />
        { Platform.OS === 'android' ? <KeyboardSpacer /> : null }
      </View>
    )
  }

    componentDidMount() {
      this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          firebase.auth().signInAnonymously();
        }
      this.setState({
      uid: this.state.uid,
      loggedInText: 'We made it! Be happy! You\'re in! \n Welcome!'
      })
      // create a reference to the active user's documents
      this.referenceUser = firebase.firestore().collection('messages').where('uid', '==', this.state.uid)
      // listen for collection changes for current user
      this.unsubscribeUser = this.referenceUser.onSnapshot(this.onCollectionUpdate);
    })
    }

    componentWillUnmount() {
      this.unsubscribeUser();
      this.authUnsubscribe()
    }
}

////////////
// styling section
///////////

const styles = StyleSheet.create({

})
