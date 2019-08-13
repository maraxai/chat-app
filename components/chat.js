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

    //this.referenceShoppinglistUser = null;
    this.referenceMessages = firebase.firestore().collection('messages');

    this.state = {
      messages: [],
      uid: 0
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      var data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt,
        'user._id': data.user._id,
        'user.name': data.user.name,
        'user.avatar': data.user.avatar
      });
      this.setState({
        messages
      });
    //console.log(this.state)
    });
  };

  addMessage() {
    this.referenceMessages.add({
      _id: 11,
      text: 'test',
      createdAt: '1565646504638',
      user: {
        _id: 11,
        name: 'B.',
        avatar: 'https://placeimg.com/140/140/any'
      }
    });
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
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
            backgroundColor: '#000'
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
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
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
        uid: user._id,
      })
      // create a reference to the active user's documents
      //this.referenceMessage = firebase.firestore().collection('messages').where('uid', '==', this.state._id)
      // listen for collection changes for current user
      //this.unsubscribeMessageAuthor = this.referenceMessage.onSnapshot(this.onCollectionUpdate);
    })
    }

    componentWillUnmount() {
      this.unsubscribeMessageAuthor();
      this.authUnsubscribe()
    }
}

////////////
// styling section
///////////

const styles = StyleSheet.create({

})
