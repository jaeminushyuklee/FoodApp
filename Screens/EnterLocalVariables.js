import React, {Component} from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Icon } from 'react-native-elements';
import { Image } from 'react-native'
import { Accordion, List, Button, InputItem, Radio, PickerView } from '@ant-design/react-native';
import firebase from '../firebaseDb';
const RadioItem = Radio.RadioItem;
export default class EnterLocalVariables extends Component {
    /*
    Weight Input + Dropdown
    Age Input
    Location Input
    Smoking MC
    Ethnicity Dropdown
    Gender MC
    #ofsteps Input
    Diabetes Input
    Occupation Dropdown
    Family history Dropdown
    */
   constructor(props){
       super(props);
       let user = firebase.auth().currentUser;
       this.state = {
           currentuserid: user.uid,
           weight: 0,
           age: 0,
           location: '',
           smoking: false,
           ethnicity: '',
           gender: '',
           steps: 0,
           diabetes: false,
           occupation: '',
           familyhistory: '',
           trueorfalse:[
             [
               {
                 label: 'Yes',
                 value: true
               },
               {
                 label: 'No',
                 value: false
               }
             ]
           ],
           ethnicitychoices : [
            [
              {
                label: 'American Indian or Alaska Native',
                value: 'American Indian or Alaska Native',
              },
              {
                label: 'Asian',
                value: 'Asian',
              },
              {
                label: 'Black or African American',
                value: 'Black or African American',
              },
              {
                label: 'Hispanic of Latino',
                value: 'BHispanic of Latino',
              },
              {
                label: 'Native Hawaiian or Other Pacific Islander',
                value: 'Native Hawaiian or Other Pacific Islander',
              },
              {
                label: 'White',
                value: 'White',
              },
            ]
            ],
            genderchoices:[
                [
                    {
                        label: 'Male',
                        value: 'Male',
                    },
                    {
                        label: 'Female',
                        value: 'Female',
                    }
                ]
              ]
       }
   }
    render() {
        return (
            <ScrollView style={{marginTop: 40}}>
              <List>
                <List.Item>
                <InputItem
                    clear
                    placeholder="Enter your weight"
                    onChange={value => {
                        this.setState({
                          weight: value,
                        });
                    }}
                >
                Weight
                </InputItem>
                </List.Item>
                <List.Item>
                <InputItem
                    clear
                    placeholder="Enter your weight"
                    onChange={value => {
                        this.setState({
                          age: value,
                        });
                    }}
                >
                Age
                </InputItem>
                </List.Item>
                <Text>smoking?</Text>
                <List.Item>
                <PickerView
                    onChange={value => {
                        this.setState({
                          smoking: value,
                        });
                    }}
                    value={this.state.smoking}
                    data={this.state.trueorfalse}
                    cascade={false}
                >
                Gender?
                </PickerView>
                </List.Item>
                <Text>ethnicity?</Text>
                <List.Item>
                <PickerView
                    onChange={value => {
                        this.setState({
                          ethnicity: value,
                        });
                    }}
                    value={this.state.ethnicity}
                    data={this.state.ethnicitychoices}
                    cascade={false}
                />
                </List.Item>
                <Text>gender?</Text>
                <List.Item>
                <PickerView
                    onChange={value => {
                        this.setState({
                          gender: value,
                        });
                    }}
                    value={this.state.gender}
                    data={this.state.genderchoices}
                    cascade={false}
                >
                Gender?
                </PickerView>
                </List.Item>
                <Text>do you have diabetes?</Text>
                <List.Item>
                <PickerView
                    onChange={value => {
                        this.setState({
                          diabetes: value,
                        });
                    }}
                    value={this.state.diabetes}
                    data={this.state.trueorfalse}
                    cascade={false}
                >
                Diabetes?
                </PickerView>
                </List.Item>
              </List>
              <Button
              onPress = {() => {
                var db = firebase.firestore();
                db.collection('users').doc(this.state.currentuserid).set({
                    weight: this.state.weight,
                    smoking: this.state.smoking,
                    ethnicity: this.state.ethnicity,
                    diabetes: this.state.diabetes
                });
                this.props.navigation.navigate('Tabs')
                console.log(this.state.weight);
                console.log(this.state.smoking);
                console.log(this.state.ethnicity);
                console.log(this.state.gender);
                console.log(this.state.diabetes);
              }}
              >
                Submit
              </Button>
            </ScrollView>
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