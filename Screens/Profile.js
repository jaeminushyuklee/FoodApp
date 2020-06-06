import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Icon } from 'react-native-elements';
import { Image } from 'react-native'
import firebase from '../firebaseDb';

export default class Profile extends Component {
    constructor(props){
        super(props)
        this.state = { 
        }
    }
    async render() {
        const ref = firebase.storage().ref('05e63e76-41a9-46ec-98c2-b175267992ec');
        const url = await ref.getDownloadURL();
        return (
            <View style = {styles.container}>
                <Image
                    style = {styles.sizer   }
                    source = {{uri: url}}
                >
                </Image>
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