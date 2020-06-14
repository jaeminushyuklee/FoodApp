import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Accordion, List, Button } from '@ant-design/react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Icon } from 'react-native-elements';
import { Image } from 'react-native'
import firebase from '../firebaseDb';
import * as Google from 'expo-google-app-auth';

export default class Login extends Component {
    signInWithGoogleAsync = async() => {
        try {
          const result = await Google.logInAsync({
            //androidClientId: YOUR_CLIENT_ID_HERE,
            behavior: 'web',
            iosClientId: '99262629604-ft84efcpj214b8mmgncvlsc2ako2014k.apps.googleusercontent.com',
            scopes: ['profile', 'email'],
          });
      
          if (result.type === 'success') {
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
            <View>
                <Button
                onPress = {() => {
                    this.props.navigation.navigate('Tabs');
                    //this.signInWithGoogleAsync(); 
                }}
                >Sign up with google</Button>
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