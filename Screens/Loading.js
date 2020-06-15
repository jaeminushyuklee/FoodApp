import React, {Component} from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { Accordion, List, Button } from '@ant-design/react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Icon } from 'react-native-elements';
import { Image } from 'react-native'
import firebase from '../firebaseDb'


export default class Loading extends Component {

componentDidMount(){
    this.checkifLoggedin();
}

checkifLoggedin = () => {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            this.props.navigation.navigate('Tabs');
        } else {
            this.props.navigation.navigate('Login');
        }
    }.bind(this));
};
render() {
     return(
         <View style={styles.container}>
              <ActivityIndicator size = 'large'/>
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