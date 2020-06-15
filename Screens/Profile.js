import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Icon } from 'react-native-elements';
import { Image } from 'react-native'
import { Accordion, List, Button } from '@ant-design/react-native';
import firebase from '../firebaseDb';

export default class Profile extends Component {
    render() {
        return (
            <View style = {styles.container}>
                <Button
                onPress = {() => {
                    firebase.auth().signOut();
                }}
                >Sign Out</Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sizer: {
        width: 50,
        height: 50,
    },
});