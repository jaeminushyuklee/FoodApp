import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CameraScreen from './Screens/Camera';
import JournalScreen from './Screens/Journal';
import StatisticsScreen from './Screens/Statistics';
import ProfileScreen from './Screens/Profile';
import LoginScreen from './Screens/Login'
import PhotoConfirmScreen from './Screens/PhotoConfirm';
import { createStackNavigator } from "react-navigation-stack";
import { createSwitchNavigator } from 'react-navigation';
import LoadingScreen from './Screens/Loading'
import LocalvScreen from './Screens/EnterLocalVariables'
const LoginStack = createStackNavigator(
    {
        Login: {
            screen: LoginScreen,
            navigationOptions: () => ({
                title: "Login"
            })
        }
    },
)

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

const TabStack = createMaterialBottomTabNavigator(
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

const MainStack = createSwitchNavigator(
    {
      Login: LoginStack,
      Loading: LoadingScreen,
      Localv: LocalvScreen,
      Tabs: TabStack
    },
    {
      initialRouteName: 'Loading'
    }
  );

export default createAppContainer(MainStack);