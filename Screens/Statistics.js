import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Icon } from 'react-native-elements';
import { Image } from 'react-native'
import { Accordion, List, Button, InputItem, Radio, PickerView } from '@ant-design/react-native';
import firebase from '../firebaseDb';
import * as tf from '@tensorflow/tfjs'
import { bundleResourceIO } from '@tensorflow/tfjs-react-native'

export default class Statistics extends Component {
  constructor(props){
    super(props)
    this.state = {
      isTfReady: false,
      model: false,
    }
  }

  async componentDidMount() {
    await tf.ready()
    this.setState({ isTfReady: true })

    const modelJSON = require('../assets/model/model.json');
    const modelWeights = require('../assets/model/group1-shard3of3.bin');
    const model = await tf.loadGraphModel(bundleResourceIO(modelJSON, modelWeights));
    model.summary();
    this.setState({ model })
  }

  render() {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Text>
          TF: {this.state.isTfReady ? "Ready" : "Waiting"}
        </Text>
        <Text>
          MODEL: {this.state.model ? "Ready" : "Waiting"}
        </Text>
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