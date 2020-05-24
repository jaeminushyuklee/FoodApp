import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Icon } from 'react-native-elements';

class DateConversion extends Component {
    constructor(props) {
        super(props);
        this.dateconversion == this.dateconversion.bind(this);
    }
    dateconversion(string) {
        var arr = string.split("-");
        switch(arr[1]) {
            case '1': 
                arr[1] = 'January';
                break;
            case '2': 
                arr[1] = 'February';
                break;
            case '3': 
                arr[1] = 'March';
                break;
            case '4': 
                arr[1] = 'April';
                break;
            case '5': 
                arr[1] = 'May';
                break;
            case '6': 
                arr[1] = 'June';
                break;
            case '7': 
                arr[1] = 'July';
                break;
            case '8': 
                arr[1] = 'August';
                break;
            case '9': 
                arr[1] = 'September';
                break;
            case '10': 
                arr[1] = 'October';
                break;
            case '11': 
                arr[1] = 'November';
                break;
            case '12': 
                arr[1] = 'December';
                break;
            default:
                arr[1] = 'Nani?';    
        }
        return arr[0] + ' ' + arr[1] + ' ' + arr[2];
    }
}
