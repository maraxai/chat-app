# Chat App
Chat App is a React Native application for mobile devices (Android and iOS) that features GiftedChat, a chat UI by Farid Safi. This communication app allows you to 
  - select images from your device's storage, 
  - take photos,
  - get current geo-location,
  - write text messages
 and send them.
 
### Setup Accounts
To be able to access and use the services for the development and setup of this app, the following acounts need to be set up. 
* [Expo] - building native iOS and Android apps using JavaScript and React
* [Firebase] - mobile development platform

### Development Environment
This app has been developed on a Windows 10 Home operating system and tested on a Huawei Mate 20 Pro Lite running on Android 9, as well as the emulated Android 9 virtual device controlled by Android Studio 3.4.2.  
Expo, a open-source tool-chain, is required for this setup. 
- installation of Expo through Google Play Store on the mobile phone
- installation of Expo on the computer (see further down, packages to install)

### Data Storage
For data storage and user authentication, the services of Firebase have been used.
  - Cloud Firestore database for storage of the messages  
  - Firebase Storage for storage of the images
  - Firebase Authentication with Anonymous Sign-In Provider

### Installation
This app has been created with Node v10.15.3 installed. 
Windows CMD and Gitbash CLI have served their purposes concurrently. In addition the Expo CLI needs to be installed. 
```sh
$ npm install expo-cli --global
```
The following npm packages are required, the versions are mentioned for compatibility issues that might arise.  

|package | version |
|--------|--------|
 |@react-native-community/async-storage:| 1.6.1|
 |cookies| 0.7.3|
 |eslint| 6.2.2|
 |expo|34.0.1|
 |firebase| 6.3.5|
 |netinfo|"0.1.3|
 |react| 16.8.3|
 |react-dom| 168.6|
 |react-native| 0.60|
 |react-native-gesture-handler| 1.3.0|
 |react-native-gifted-chat| 0.9.11|
 |react-native-keyboard-spacer| 0.4.1|
 |react-native-web| 0.11.4|
 |react-navigation| 3.11.1|
 |react-navigator| 0.0.0-0|

All packages have been installed locally
```sh
$ npm install -s [package name]
```

### Setup
- set up React Native app with Expo by running $ expo init [project name] in the Win CMD
- create basic file setup with start.js, chat.js and custom-actions.js
- enable navigation between screens through react-navigator
- setup and configure GiftedChat, incl. KeyBoardSpacer - use hardwired data
- setup of Firebase database 
- setup of Firebase authentication
- setup of AsyncStorage for offline data management
- implement NetInfo for online/offline switch
- implement mobile device's communication features, i.e. camera and geolocation

### Project Development
* [Trello] - get your agile Kanban on 


   [dill]: <https://github.com/joemccann/dillinger>
   [Expo]: <https://Expo.io>
   [Firebase]: <Firebase.google.com>
   [Trello]: <https://trello.com/b/KEun6kH5/a-v-testing-and-collaboration-webdevcf>
  
  
