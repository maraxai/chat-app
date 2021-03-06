/**
* @description chat.js manages the communication screen
*/

import React from 'react';
import { StyleSheet, Text, View, Button, Navigator, Platform,
         TouchableOpacity, AsyncStorage, NetInfo, Image, Alert } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import CustomActions from './custom-actions';
import MapView from 'react-native-maps';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import * as firebase from 'firebase';
import 'firebase/firestore';

/**
* @class Chat
* @requires React
* @requires React-Native
* @requires Keyboard Spacer
* @requires Custom Actions
* @requires React Native Maps
* @requires Expo Image Picker
* @requires Expo Permissions
* @requires Expo Location
* @requires Firebase
* @requires Firestore
*/

export default class Chat extends React.Component {
  constructor() {
    super();

    /**
    * firestore credentials for chat-app db
    */
    let firebaseConfig = {
      apiKey: "AIzaSyDAopaFuNd6lMgaAqpuN9YWHD0TSJgZPbA",
      authDomain: "chat-app-21fd9.firebaseapp.com",
      databaseURL: "https://chat-app-21fd9.firebaseio.com",
      projectId: "chat-app-21fd9",
      storageBucket: "chat-app-21fd9.appspot.com",
      messagingSenderId: "94521123634",
      appId: "1:94521123634:web:18053b98f6cf6c2e"
    };
    /**
    * @param {object} firebaseConfig database credentials
    * @param {string} apiKey
    * @param {string} authDomain
    * @param {string} databaseURL
    * @param {string} projectID
    * @param {string} storageBucket
    * @param {string} messagingSenderId
    * @param {string} appId
    */

    /** app initialization, line initializeApp prevents re-initialisation */
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig)
    }

    /**reference to firstore collection 'messages' where chat messages are stored*/
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

  /**
  * once collection gets updated a snapshot is taken
  */
  onCollectionUpdate = (querySnapshot) => {
    /**
    * @function onCollectionUpdate
    * @example UI data
    * @param {string} _id message object id
    * @param {string} text text message
    * @param {number} created.At date and time
    * @param {object} user id, avatar and name
    * @param {string} user._id user id
    * @param {string} user.avatar image href
    * @param {string} user.name user name
    * @param {string} image downloadUrl
    * @param {object} location longitude and latitude
    * @param {number} location.longitude longitude coordinate of current location
    * @param {number} location.latitude latitude coordinate of current location
    */

    const messages = [];
    /**
    * array of messages
    */
    try {
      /** go through each document */
      querySnapshot.forEach((doc) => {
        /* get the QueryDocumentSnapshot's data */
        let data = doc.data();
        /**
        * messages.push object contains data that is displayed on the device
        */
        messages.push({
          _id: data._id,
          text: data.text || '',
          createdAt: data.createdAt.toDate(),
          user: data.user,
          image: data.image || '',
          location: data.location || null
        });
        this.setState({
          messages
        });
      });
    }
    catch (error) {
      console.log(error.message)
    }
  };

  /**
  * these entries will be send to firestore, function 'fired' by onSend()
  */
  addMessage() {
    /**
    * @function addMessage
    * @example message data send to firebase
    * @param {string} _id message object id
    * @param {string} text text message
    * @param {number} created.At date and time
    * @param {object} user id, avatar and name
    * @param {string} user._id user id
    * @param {string} user.avatar image href
    * @param {string} user.name user name
    * @param {string} image downloadUrl
    * @param {object} location longitude and latitude
    * @param {number} location.longitude longitude coordinate of current location
    * @param {number} location.latitude latitude coordinate of current location
    */
    const message = this.state.messages[0];
    try {
        this.referenceMessages.add({
          _id: message._id,
          text: message.text || '',
          createdAt: message.createdAt,
          user: message.user,
          image: message.image || '',
          location: message.location || null
        })
    }
    catch (error) {
      console.log(error.message)
    }
  }

  /** will add new message to messages array */
  onSend(messages = []) {
    try {
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }), () => {
        this.saveMessages();
        this.addMessage();
      });
    }
    catch (error) {
      console.log(error)
    }
  }
  /**navigation bar configuration, add user name nav bar */
  static navigationOptions = ({ navigation }) => {
    try {
      return {
        title: navigation.state.params.name
      };
    }
    catch (error) {
      console.log(error.message)
    }
  }

  /** message boxes, placed left and right */
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

  /** renders text input bar with integrated custom action button */
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

  /** displays the location map */
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

  /** variable 'user' as used in component GiftedChat */
  get user() {
    return {
      _id: this.state.uid,
      name: this.props.navigation.state.params.name,
      avatar: ''
    };
  }

    /** get data from AsyncStorage */
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

  /** puyt data into AsyncStorage */
  async saveMessages() {
    console.log('saveMessages() has been invoked');
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
    } catch (error) {
      console.log(error.message);
    }
  }

  /** delete data from AsyncStorage */
  async deleteMessages() {
    console.log('you hit the delete-button ')
    try {
      await AsyncStorage.removeItem('messages');
    } catch (error) {
      console.log(error.message);
    }
  }

  /** renders the custom action button in the text input field */
  renderCustomActions = (props) => {
    return <CustomActions {...props} />;
  };

  /** defines what happens upon change of connectivity */
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
        connection_Status : "Offline",
        messages: []
      });
      this.getMessages();
    }
  };


  /** react component render function includes GiftedChat */
  render() {
    /** user name as props for nav bar */
    const navigation = this.props.navigation.state.params.name;
    /** color as props for background */
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

    /** lifecycle upon component mount */
    componentDidMount() {

      NetInfo.isConnected.addEventListener(
        'connectionChange',
        this._handleConnectivityChange
      );

      /**    */
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
            /** listen for collection changes for chat room */
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

    /** lifecycle upon component will unmount */
    componentWillUnmount() {
      this.unsubscribe();
      this.authUnsubscribe();
      NetInfo.isConnected.removeEventListener(
        'connectionChange',
        this._handleConnectivityChange
      )
    }
}

/** styling section */
const styles = StyleSheet.create({
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
