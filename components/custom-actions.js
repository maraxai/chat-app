import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Alert } from 'react-native';
import PropTypes from 'prop-types';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
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
        const imageUrl = await this.uploadImageFetch(result.uri);
        this.props.onSend({ image: imageUrl })
      }
      console.log('imageUrl in pickImage: ' + this.imageUrl)
      console.log(imageUrl)
      console.log('result.uri in pickImage in custom-actions: ' + result.uri)
    }
  }

  takePhoto = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status === 'granted') {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images
      }).catch(error => console.log(error));

      if (!result.cancelled) {
        const imageUrl = await this.uploadImageFetch(result.uri);
        this.props.onSend({ image: imageUrl })
      }
      console.log(imageUrl)
    }
  }

  getLocation = async () => {
    console.log('getLocation() has been invoked')
    try {
    //alert('Your current location should be: AT HOME! \n If your current location does not match AT HOME, contact your system administrator, i.e. your mother, immediately.');
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    console.log('status is: ' + status)
    if (status === 'granted') {
      let result = await Location.getCurrentPositionAsync({})
      .catch(error => console.log(error));
      const longitude = JSON.stringify(result.coords.longitude);
      const altitude = JSON.stringify(result.coords.latitude);
      console.log('longitude: ' + longitude + ' / '+ 'altitude: ' + altitude)

      if (result) {
        this.props.onSend({ location: {
          longitude: result.coords.longitude,
          latitude: result.coords.latitude
        }
      })
  }
  }
} catch (error) {
  console.log(error.message)
}
}

  uploadImageFetch = async (uri) => {
    try {
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
          resolve(xhr.response);
        };
        xhr.onerror = function(e) {
          console.log(e);
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
      });

      const imageNameBefore = uri.split("/");
      const imageName = imageNameBefore[imageNameBefore.length - 1];

      const ref = firebase
        .storage()
        .ref()
        .child("images/" + imageName);

      const snapshot = await ref.put(blob);
      blob.close();
      const imageUrl = await snapshot.ref.getDownloadURL();
      return imageUrl;
    } catch (error) {
      console.log(error.message);
    }
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
