import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Accordion, List, Button } from '@ant-design/react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Icon } from 'react-native-elements';
import { Image } from 'react-native'
import firebase from '../firebaseDb';
import * as Expo from 'expo'
import * as Google from 'expo-google-app-auth';

export default class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            userid: ''
        }
    }
    isUserEqual = (googleUser, firebaseUser) => {
        if (firebaseUser) {
          var providerData = firebaseUser.providerData;
          for (var i = 0; i < providerData.length; i++) {
            if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                providerData[i].uid === googleUser.getBasicProfile().getId()) {
              // We don't need to reauth the Firebase connection.
              return true;
            }
          }
        }
        return false;
      }
    onSignIn = (googleUser) => {
        var userid = '';
        console.log('Google Auth Response', googleUser);
        // We need to register an Observer on Firebase Auth to make sure auth is initialized.
        var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
          unsubscribe();
          // Check if we are already signed-in Firebase with the correct user.
          if (!this.isUserEqual(googleUser, firebaseUser)) {
            // Build Firebase credential with the Google ID token.
            var credential = firebase.auth.GoogleAuthProvider.credential(
                googleUser.idToken,
                googleUser.accessToken,
            );
            // Sign in with credential from the Google user.
            firebase.auth().signInWithCredential(credential).then(function(result) {
            }).catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
            });
          } else {
            console.log('User already signed-in Firebase.');
          }
        }.bind(this));
      }
    signInWithGoogleAsync =async()=> {
        try {
          const result = await Google.logInAsync({
            //androidClientId: YOUR_CLIENT_ID_HERE,
            iosClientId: '99262629604-ft84efcpj214b8mmgncvlsc2ako2014k.apps.googleusercontent.com',
            scopes: ['profile', 'email'],
          });
      
          if (result.type === 'success') {
            this.onSignIn(result);
            return result.accessToken;
          } else {
            return { cancelled: true };
          }
        } catch (e) {
          return { error: true };
        }
      }
    render() {
        return(
            <View style={styles.container}>
              <Button
              onPress = {() => {
                  this.signInWithGoogleAsync();
              }}
              >Sign in with google</Button>
          </View>
        );
      }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});