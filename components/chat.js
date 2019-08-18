// component React from react library
import React from 'react';
// react native components used in this file
import { StyleSheet, Text, View, Button, Navigator, Platform, TouchableOpacity } from 'react-native';
// chat ui
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
// puts space between text line and keyboard
import KeyboardSpacer from 'react-native-keyboard-spacer';

// import db firestore from firebase
const firebase = require('firebase');
require('firebase/firestore');

// class component
export default class Chat extends React.Component {
  constructor() {
    super();

    // firestore credentials for chat-app db
    var firebaseConfig = {
      apiKey: "AIzaSyDAopaFuNd6lMgaAqpuN9YWHD0TSJgZPbA",
      authDomain: "chat-app-21fd9.firebaseapp.com",
      databaseURL: "https://chat-app-21fd9.firebaseio.com",
      projectId: "chat-app-21fd9",
      storageBucket: "chat-app-21fd9.appspot.com",
      messagingSenderId: "94521123634",
      appId: "1:94521123634:web:18053b98f6cf6c2e"
    };

    // app initialization
    if (!firebase.apps.length) { //avoid re-initializing
      firebase.initializeApp(firebaseConfig)
    }

    //reference to firstore collection 'messages' where chat messages are stored
    this.referenceMessages = firebase.firestore().collection('messages');

    this.state = {
      messages: [],
      uid: 0,
      loggedInText: 'We are currently struggling to log you in!'
    };
  }

  //  once collection gets updated a snapshot is taken
  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      var data = doc.data();
      console.log('in onCollectionUpdate log data before messages.push: ', data);
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toString(),
        user: data.user
      });
      this.setState({
        messages
      });
    });
  };

  // add the message to firestore, function 'fired' by onSend
  addMessage() {
    const message = this.state.messages[0];
    this.referenceMessages.add({
      _id: message._id,
      text: message.text,
      createdAt: message.createdAt.toString(),
      user: message.user
    })
  }

  // will add new message to messages array
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }), () => {
      this.addMessage();
    });
    }
  //navigation bar configuration, add user name nav bar
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.name
    };
  }

  // message boxes, placed left and right
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#123458'
          },
          left: {
            backgroundColor: '#006600'
          }
        }}
      />
    )
  }

  // variable 'user' as used in component GiftedChat
  get user() {
    return {
      _id: this.state.uid,
      name: this.props.navigation.state.params.name,
      avatar: ''
    };
  }

  render() {
    // user name as props for nav bar
    const navigation = this.props.navigation.state.params.name;
    // color as props for background
    const color = this.props.navigation.state.params.color;
    return (
      <View style={{
        flex: 1,
        backgroundColor: color,
        marginBottom: 40
      }}
      >
        <Text style={{
          textAlign: 'center',
          fontSize: 20,
        }}
        >{this.state.loggedInText}</Text>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={this.user}
        />
        { Platform.OS === 'android' ? <KeyboardSpacer /> : null }
      </View>
    )
  }
    // lifecycle upon component mount
    componentDidMount() {
      this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          firebase.auth().signInAnonymously();
        }
        this.setState({
        uid: user.uid,
        loggedInText: 'We made it! Be happy! You\'re in! \n Welcome!'
        })
        // listen for collection changes for chat room
        this.unsubscribeUser = this.referenceMessages.onSnapshot(this.onCollectionUpdate);
      })
    }

    // lifecycle upon component will unmount
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
