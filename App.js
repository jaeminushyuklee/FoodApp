import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Icon } from 'react-native-elements';
import Navigator from './theTabs';
import {decode, encode} from 'base-64'
import server from './serverapp'

export default class App extends Component {
    constructor(props) {
        if (!global.btoa) {  global.btoa = encode }
        if (!global.atob) { global.atob = decode }
        super(props)
        this.state={
            isReady: false,
            
        };
    }

    
    
    render() {  
        return (
        <Navigator />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

