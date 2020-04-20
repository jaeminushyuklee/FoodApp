import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Icon } from 'react-native-elements';

export default class CapPhotoPreview extends Component {
    render() {
        const data = this.props.navigation.getParam('data');
        console.log(data);

      return (

        <View style={{ flex: 1 }}>

          <Image source={{ uri: data.uri }} />

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