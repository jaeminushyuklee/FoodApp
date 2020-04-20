import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Icon } from 'react-native-elements';
import { Image } from 'react-native'

export default class Journal extends Component {
    render() {
        const data = this.props.navigation.getParam('data');
        console.log(data);

      return (

        <View style={{ flex: 1 }}>

          <Image
            source={{uri: data.uri, isStatic:true}}
            style={{width: 100, height: 100}}
        />

        </View>
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