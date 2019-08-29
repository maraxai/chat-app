//** this code uses ES6 syntax and functionality */
/** component react from react library */
import React from 'react';
/**  */
import { StyleSheet, TouchableOpacity, Text, View, Alert } from 'react-native';
/**  */
import PropTypes from 'prop-types';
/** component ImagePicker from expo-library enables to select an image from the device */
import * as ImagePicker from 'expo-image-picker';
/** component Permissions from expo-library requests user permission for selectable tasks*/
import * as Permissions from 'expo-permissions';
/** component Location from expo-library  */
import * as Location from 'expo-location';
/** import all components from firebase and specify firestore */
import * as firebase from 'firebase';
import 'firebase/firestore';
//const firebase = require('firebase');
//require('firebase/firestore');

/** react component class that manages  */
export default class CustomActions extends React.Component {

  /** pick an image from the device's storage and send it to firestore*/
  pickImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    try {
      if (status === 'granted') {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images
        }).catch(error => console.log('There is an error'));

        if (!result.cancelled) {
          const imageUrl = await this.uploadImageFetch(result.uri);
          this.props.onSend({ image: imageUrl })
        }
      }
    }
    catch (error) {
      console.log(error.message)
    }
  }

  /** take a photo with the device's camera  and send it to firestore */
  takePhoto = async () => {
    try {
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
    catch (error) {
      console.log(error.message)
    }
  }

  /** get the coordinates (longitude and latitude) of your position */
  getLocation = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
      //alert('Dear daughter, Your current location should be: AT HOME! \n If your current location does not match, contact your system administrator, i.e. your mother, immediately.');
    try {
      if (status === 'granted') {
        let result = await Location.getCurrentPositionAsync({})
        .catch(error => console.log(error));
        const longitude = JSON.stringify(result.coords.longitude);
        const altitude = JSON.stringify(result.coords.latitude);
        if (result) {
          this.props.onSend({
            location: {
              longitude: result.coords.longitude,
              latitude: result.coords.latitude
            }
          })
        }
      }
    }
    catch (error) {
      console.log(error.message)
    }
  }

  /** upload the image to firebase storage */
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
      /** splits the filename string into an array containing the slash-separated string parts, and sets the last index as the filename */
      const imageNameBefore = uri.split("/");
      const imageName = imageNameBefore[imageNameBefore.length - 1];

      /** @const ref sets the reference to the storage location of the images */
      const ref = firebase
        .storage()
        .ref()
        .child(`images/ ${imageName}`);

      /** */
      const snapshot = await ref.put(blob);
      blob.close();
      const imageUrl = await snapshot.ref.getDownloadURL();
      return imageUrl;
    }
    catch (error) {
      console.log(error.message);
    }
  }

  /** manages the options of the custom button which is located in the text input bar  */
  onActionPress = () => {
    const options = ['Choose From Library', 'Take Picture', 'Send Location', 'Cancel'];
    const cancelButtonIndex = options.length -1;
    this.context.actionSheet().showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex
      },
      async (buttonIndex) => {
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

  /** react render function */
  render () {
    return (
      /**  */
      <TouchableOpacity style={[styles.container]} onPress={this.onActionPress}>
        <View style={[styles.wrapper, this.props.wrapperStyle]}>
          <Text style={[styles.iconText, this.props.iconTextStyle]}>+</Text>
        </View>
      </TouchableOpacity>
    )
  }
}


/** UI styling */
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

/** PropTypes validates the properties' types */
CustomActions.contextTypes = {
  actionSheet: PropTypes.func
};
