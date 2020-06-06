import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CameraScreen from './Screens/Camera';
import JournalScreen from './Screens/Journal';
import StatisticsScreen from './Screens/Statistics';
import ProfileScreen from './Screens/Profile';
import PhotoConfirmScreen from './Screens/PhotoConfirm';
import { createStackNavigator } from "react-navigation-stack";

const CameraStack = createStackNavigator(
    {
    Camera: {
      screen: CameraScreen,
      navigationOptions: () => ({
        title: "Camera"
      })
    },
    PhotoConfirm: {
      screen: PhotoConfirmScreen,
      navigationOptions: () => ({
        title: "PhotoConfirm"
      })
    }
    },
    {
        initialRouteName: "Camera"
    }
  );

const TabNavigator = createMaterialBottomTabNavigator(
    {
       Camera: {
           screen: CameraStack,
           navigationOptions: {
               tabBarIcon: ({ tintColor }) => (
                   <View>
                       <MaterialIcons stlye={[{color: tintColor}]} size={25} name={'camera'}/>
                   </View>
               ),
            }
       },
       Journal: {
           screen: JournalScreen,
           navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <View>
                    <MaterialIcons stlye={[{color: tintColor}]} size={25} name={'book'}/>
                </View>
            ),
         }

       },
       Statistics: {
           screen: StatisticsScreen,
           navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <View>
                    <MaterialIcons stlye={[{color: tintColor}]} size={25} name={'assessment'}/>
                </View>
            ),
         }

       },
       Profile: {
           screen: ProfileScreen ,
           navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <View>
                    <MaterialIcons stlye={[{color: tintColor}]} size={25} name={'person'}/>
                </View>
            ),
         }

       },
    },
    {
        initialRouteName: 'Camera',
        activeColor: '#f0edf6',
        inactiveColor: '#3e2465',
        barstlye: {backgroundColor: '#694fad'},
    }
);

export default createAppContainer(TabNavigator);