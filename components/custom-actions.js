import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Alert } from 'react-native';
import PropTypes from 'prop-types';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
const firebase = require('firebase');
require('firebase/firestore');

export default class CustomActions extends React.Component {

  pickImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (status === 'granted') {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images
      }).catch(error => console.log('There is an error'));

      if (!result.cancelled) {
  
        this.uploadImageFetch(result.uri, 'pickImage')
        this.setState({
          image: result
        })
      }
      console.log(result)
    }
  }

  takePhoto = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status === 'granted') {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: 'Images'
      }).catch(error => console.log(error));

      if (!result.cancelled) {
        this.uploadImageFetch(result.uri, 'takePhoto')
        this.setState({
          image: result.uri
        });
      }
      console.log(result)
    }
  }


  getLocation = async () => {
    //alert('Your current location should be: AT HOME! \n If your current location does not match AT HOME, contact your system administrator, i.e. your mother, immediately.');
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status === 'granted') {
      let result = await Location.getCurrentPositionAsync({})
        .catch(error => console.log(error));

      if (result) {
        this.setState({
          location: result
        });
      }
    }
  }

  uploadImageFetch = async(uri, imageName) => {
    Alert.alert('Would you like to upload this picture?');
    const response = await fetch(uri, imageName);
    const blob = await response.blob();
    const ref = firebase
    .storage()
    .ref()
    .child("images/" + imageName);
    const snapshot = await ref.put(blob);

    return await snapshot.ref.getDownloadURL();
  }

  onActionPress = () => {
    const options = ['Choose From Library', 'Take Picture', 'Send Location', 'Cancel'];
    const cancelButtonIndex = options.length -1;
    this.context.actionSheet().showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex
      },
      async (buttonIndex) => {

        // why does this switch have no breaks?
        switch (buttonIndex) {
          case 0:
            console.log('user wants to pick an image');
            return this.pickImage();
          case 1:
            console.log('user wants to take a photo');
            return this.takePhoto();
          case 2:
            console.log('user wants to get their location');
            return this.getLocation();
        }
      },
    );
  };


  render () {
    return (
      <TouchableOpacity style={[styles.container]} onPress={this.onActionPress}>
        <View style={[styles.wrapper, this.props.wrapperStyle]}>
          <Text style={[styles.iconText, this.props.iconTextStyle]}>+</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10
  },
  wrapper: {
    flex: 1,
    borderRadius: 13,
    borderColor: '#b2b2b2',
    borderWidth: 2,
  },
  iconText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#b2b2b2',
    backgroundColor: 'transparent'
  }
});

CustomActions.contextTypes = {
  actionSheet: PropTypes.func
};
