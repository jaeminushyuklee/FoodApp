import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'react-native'
import { Accordion, List, Button } from '@ant-design/react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import firebase from 'firebase';
import {db} from '../babel.config'


export default class Journal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      activeSections: [0],
      currentdate: '',
      displaydate: '',
      indexofdate: 0,
      entirelog : [{
        "date": "22-5-2020",
        "meals": [{
            "id": 1,
            "name": "egg",
            "imageurl": "something",
            "protein": 1,
            "carbohydrate": 2,
            "fat": 3
          },
          {
            "id": 2,
            "name": "rice",
            "imageurl": "something",
            "protein": 11,
            "carbohydrate": 12,
            "fat": 2
          }
        ]
      },
      {
        "date": "23-5-2020",
        "meals": [{
            "id": 1,
            "name": "hamburger",
            "imageurl": "something",
            "protein": 111,
            "carbohydrate": 222,
            "fat": 8
          },
          {
            "id": 2,
            "name": "peanuts",
            "imageurl": "something",
            "protein": 333,
            "carbohydrate": 444,
            "fat": 2
          }
        ]
      },
      {
        "date": "24-5-2020",
        "meals": [{
            "id": 1,
            "name": "noodles",
            "imageurl": "something",
            "protein": 1111,
            "carbohydrate": 2222,
            "fat": 8
          },
          {
            "id": 2,
            "name": "drink",
            "imageurl": "something",
            "protein": 3333,
            "carbohydrate": 4444,
            "fat": 2
          }
        ]
      }
    ]
    
    };
    this.onChange = activeSections => {
      this.setState({ activeSections });
    };  
  }

  async renderIf(condition, content) {
    if (condition) {
      return content;
    } else {
      return null;
    }
  }


  async componentDidMount() {

    await Font.loadAsync(
      'antoutline',
      // eslint-disable-next-line
      require('@ant-design/icons-react-native/fonts/antoutline.ttf')
    );

    await Font.loadAsync(
      'antfill',
      // eslint-disable-next-line
      require('@ant-design/icons-react-native/fonts/antfill.ttf')
    );
    
    // eslint-disable-next-line
    this.setState({ isReady: true });
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var index = this.state.entirelog.findIndex(x => x.date === date + "-" + month + "-" +  year);
    this.setState({
      currentdate : date + "-" +  month + "-" + year,
      indexofdate : index,
    });
    var display = new DateConversion().dateconversion(this.state.currentdate)
    this.setState({
      displaydate: display
    });
  }
    

  
  
  renderAccordion() {
    return this.state.entirelog[this.state.indexofdate].meals.map((item) => {
      return(
        <Accordion

          onChange={this.onChange}
          activeSections={this.state.activeSections}
        >
          <Accordion.Panel header= {item.name}>
            <List>
              <List.Item>
                {item.imageurl}
              </List.Item>
              <List.Item>{item.protein}</List.Item>
              <List.Item>{item.carbohydrate}</List.Item>
            </List>
          </Accordion.Panel>
        </Accordion>
      );
    });
  }
  render() {
    if (!this.state.isReady && this.state.entirelog == []) {
      return <AppLoading />;
    }
    return(
      <View>
      <View style={{flexDirection: 'row', marginTop: 40, alignItems: 'center', justifyContent:'center'}}>
        <Button onPress = {() => {
              this.setState({
                displaydate: new DateConversion().dateconversion(this.state.entirelog[this.state.indexofdate - 1].date),
                indexofdate: this.state.indexofdate - 1,
              });
            }}
        >left</Button>
        <Text> {this.state.displaydate} </Text>
        <Button onPress = {() => {
              this.setState({
                displaydate: new DateConversion().dateconversion(this.state.entirelog[this.state.indexofdate + 1].date),
                indexofdate: this.state.indexofdate + 1,
              });
            }}
        >right</Button>
      </View>
      <View style={{marginTop: 40, marginBottom: 10 }}>
          {this.renderAccordion()}
      </View>
      </View>
      
       
  
    )
  }
  

  
}

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



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});