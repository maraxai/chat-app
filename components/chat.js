// component React from react library
import React from 'react';
// react native components used in this file
import { StyleSheet, Text, View, Button, Navigator, Platform,
        TouchableOpacity, AsyncStorage, NetInfo, Image, Alert } from 'react-native';
//import getNetInfo from 'netinfo';
// chat ui
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
// puts space between text line and keyboard
import KeyboardSpacer from 'react-native-keyboard-spacer';
//button component in message bar for selection of actions (get location/pick image/shoot photo)
import CustomActions from './custom-actions';
//
import MapView from 'react-native-maps';
//
import * as ImagePicker from 'expo-image-picker';
//
import * as Permissions from 'expo-permissions';
//
import * as Location from 'expo-location';
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
      loggedInText: '...not in yet.',
      connection_Status: 'Offline',
      isConnected: false,
      image: null,
      location: null,
      uri: null
    };
  }

  //  once collection gets updated a snapshot is taken
  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      var data = doc.data();
    //  console.log('in onCollectionUpdate log data before messages.push: ', data);
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: data.user,
        uri: this.state.uri,
        location: {
          latitude: 47.9990,
          longitude: 7.8421,
        }
      });
      this.setState({
        messages
      });
      console.log(messages)
    });
  };

  // add the message to firestore, function 'fired' by onSend
  addMessage() {
    const message = this.state.messages[0];
    this.referenceMessages.add({
      _id: message._id,
      text: message.text,
      createdAt: message.createdAt,
      user: message.user,
  //    uri: message.uri,
  //      location: {
  //      latitude: message.location.latitude,
  //       longitude: message.location.longitude,
    //  }
    })
  }

  // will add new message to messages array
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }), () => {
      this.addMessage();
      this.saveMessages();
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
            backgroundColor: '#6495ED'
          }
        }}
      />
    )
  }

  renderInputToolbar(props) {
    if (this.state.connection_Status == 'Offline') {
    } else {
      return (
        <InputToolbar
          {...props}
        />
      );
    }
  }

  renderCustomView (props) {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{
            width: 150,
            height: 100,
            borderRadius: 13,
            margin: 3}}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.04
          }}
        />
      );
    }
    return null
  }

  // variable 'user' as used in component GiftedChat
  get user() {
    return {
      _id: this.state.uid,
      name: this.props.navigation.state.params.name,
      avatar: ''
    };
  }

  async getMessages() {
    console.log('getMessages() has been invoked')
    let messages = '';
    try {
      messages = await AsyncStorage.getItem('messages') || [];
      this.setState({
        messages: JSON.parse(messages)
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  async saveMessages() {
    console.log('saveMessages() has been invoked');
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
    } catch (error) {
      console.log(error.message);
    }
  }

  async deleteMessages() {
    console.log('you hit the delete-button ')
    try {
      await AsyncStorage.removeItem('messages');
    } catch (error) {
      console.log(error.message);
    }
  }

  renderCustomActions = (props) => {
    return <CustomActions {...props} />;
  };

  _handleConnectivityChange = (isConnected) => {
    if(isConnected == true) {
      console.log('online from change');
      this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          firebase.auth().signInAnonymously();
        }
        this.setState({
          uid: user.uid,
          isConnected: true,
          connection_Status : "Online"
        });
        this.unsubscribe = this.referenceMessages.orderBy('createdAt', 'desc').onSnapshot(this.onCollectionUpdate);
      });
    }
    else {
      console.log('offline from change');
      this.setState({
        isConnected: false,
        connection_Status : "Offline"
      });
    }
  };

  uploadImageFetch = async(uri, imageName) => {
    Alert.alert('you just uploaded a picture')
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = firebase
      .storage()
      .ref()
      .child("images" + imageName);
    const snapshot = await ref.put(blob);

    return await snapshot.ref.getDownloadURL();
  }

  render() {
    // user name as props for nav bar
    const navigation = this.props.navigation.state.params.name;
    // color as props for background
    const color = this.props.navigation.state.params.color;
    const connectionStatus = this.state.isConnected;
    return (
      <View style={{
        flex: 1,
        backgroundColor: color,
        marginBottom: 40
      }}
      >
        <Text style={styles.connectionStatus}>{this.state.loggedInText}</Text>
        <Text style={styles.appStatus}> You are { this.state.connection_Status } </Text>
        {this.state.uri &&
          <Image source={{ uri: this.state.uri }} style={styles.image} />
        }
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          renderInputToolbar={this.renderInputToolbar.bind(this)}
          renderCustomView={this.renderCustomView}
          renderActions={this.renderCustomActions}
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
      NetInfo.isConnected.addEventListener(
        'connectionChange',
        this._handleConnectivityChange
      );

      NetInfo.isConnected.fetch().then(isConnected => {
        if (isConnected == true) {
          console.log('online from fetch');
          this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
              firebase.auth().signInAnonymously();
            }
            this.setState({
              uid: user.uid,
              isConnected: true,
              connection_Status: 'Online',
              loggedInText: 'You entered the chat room.'
            });
            // listen for collection changes for chat room
            this.unsubscribe = this.referenceMessages.orderBy('createdAt', 'desc').onSnapshot(this.onCollectionUpdate);
          });
        }
        else {
          console.log('offline from change');
          this.setState({
            isConnected: false,
            connection_Status : "Offline"
          });
        }
      });
    }

    // lifecycle upon component will unmount
    componentWillUnmount() {
      this.unsubscribe();
      this.authUnsubscribe();
      NetInfo.isConnected.removeEventListener(
        'connectionChange',
        this._handleConnectivityChange
      )
    }
}

////////////
// styling section
///////////

const styles = StyleSheet.create({
  btnDelete: {
    textAlign: 'center',
    padding: 5,
    backgroundColor: 'red',
    color: 'white',
    width: '40%'
  },
  appStatus: {
    textAlign: 'center',
    fontSize: 16
  },
  connectionStatus: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 12
  }
})
