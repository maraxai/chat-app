// component React from react library
import React from 'react';
// react components used in this file
import { StyleSheet, Text, View, Button, Navigator, Platform, TouchableOpacity } from 'react-native';
// chat ui
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
// puts space between text line and keyboard
import KeyboardSpacer from 'react-native-keyboard-spacer';
// gets info from react about the current platform (Android/iOS)

// class component
export default class Chat extends React.Component {
  state = {
    message: []
  };

  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developeur',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        {
          _id: 2,
          text: 'This is a system message',
          createdAt: new Date(),
          system: true
        }
      ],
    })
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
        justifyContent: 'center',
        alignItems: 'center',
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
}

////////////
// styling section
///////////

const styles = StyleSheet.create({
  
})
