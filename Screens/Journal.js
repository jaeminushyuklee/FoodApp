import React, {Component} from 'react';
import { StyleSheet, Text, View, ScrollView, NavigationEvents } from 'react-native';
import { Image } from 'react-native'
import { Accordion, List, Button } from '@ant-design/react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import firebase from '../firebaseDb';


export default class Journal extends Component {
  constructor(props) {
    super(props);
    let user = firebase.auth().currentUser;
    this.state = {
      isReady: false,
      firsttime: true,
      activeSections: [0],
      currentdate: '',
      displaydate: '',
      displaydatestringversion: '',
      idofdate: '',
      entirelog: [],
      accordionarr: [],
      urlarray: [],
      dimageurl: '',
      currentuserid: user.uid,
    
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
    var db = firebase.firestore();
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    db.collection('users').doc(this.state.currentuserid).collection('entirelog').where('date','==', year + "-" + month + "-" + date)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.setState({
            idofdate: doc.id,
            displaydatestringversion: doc.get('date'),
            displaydate: new DateConversion().dateconversion(doc.get('date')),
          });
          db.collection('users').doc(this.state.currentuserid).collection('entirelog').doc(this.state.idofdate).collection('meals').get().then(querySnapshot => {
            const yourDocuments = querySnapshot.docs.map((doc) => doc.data());
            this.setState({
              accordionarr: yourDocuments
            });
          })
          .catch(err => {
            alert(err);
          });
        });
      })
      .catch(error => {
        console.log("Error getting documents: ", error);
    });
  }
  
  componentDidUpdate(prevProps, prevState) {
    if (this.state.displaydatestringversion!==prevState.displaydatestringversion) {

    var db = firebase.firestore();
    db.collection('users').doc(this.state.currentuserid).collection('entirelog').where('date','==', this.state.displaydatestringversion)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.setState({
            idofdate: doc.id,
            displaydatestringversion: doc.get('date'),
            displaydate: new DateConversion().dateconversion(doc.get('date')),
          });
          db.collection('users').doc(this.state.currentuserid).collection('entirelog').doc(this.state.idofdate).collection('meals').get().then(querySnapshot => {
            const yourDocuments = querySnapshot.docs.map((doc) => doc.data());
            this.setState({
              accordionarr: yourDocuments
            });
          })
          .catch(err => {
            alert(err);
          });
        });
      })
      .catch(error => {
        console.log("Error getting documents: ", error);
    });
    }
    }
    
  renderAccordion() {
    return this.state.accordionarr.map((item,index) => {
      return(
        <View key = {index}>
          <Accordion
            onChange={this.onChange}    
            activeSections={this.state.activeSections}
            >
            <Accordion.Panel header= {item.foodname}>
              <List>
              <List.Item>
                  <Image
                  style = {styles.sizer}
                  source = {{uri: item.durl}}
                  />
                </List.Item>
                <List.Item>{item.protein}</List.Item>
                <List.Item>{item.carbohydrate}</List.Item>
              </List>
            </Accordion.Panel>
          </Accordion>          
        </View>
      );
    });
  }

  renderButtons() {
    return (
      <View style={{flexDirection: 'row', marginTop: 40, alignItems: 'center', justifyContent:'center'}}>
        <Button onPress = {() => {
              let datearr = this.state.displaydatestringversion.split("-");
              let present = new Date(datearr[0], datearr[1] - 1, datearr[2])
              let yesterdayinmilli = present.getTime() - 86400000;
              let yesterday = new Date(yesterdayinmilli);
              let yyear = yesterday.getFullYear();
              let ymonth = yesterday.getMonth() + 1;
              let ydate = yesterday.getDate(); 
              this.setState({
                displaydatestringversion: yyear + "-" + ymonth + "-" + ydate,
              });
              console.log('subtracted', this.state.displaydatestringversion)
              console.log(this.state.accordionarr)
            }}
        >left</Button>
        <Text> {this.state.displaydate} </Text>
        <Button onPress = {() => {
              let datearr = this.state.displaydatestringversion.split("-");
              let present = new Date(datearr[0], datearr[1] - 1, datearr[2])
              let yesterdayinmilli = present.getTime() + 86400000;
              let yesterday = new Date(yesterdayinmilli);
              let yyear = yesterday.getFullYear();
              let ymonth = yesterday.getMonth() + 1;
              let ydate = yesterday.getDate(); 
              this.setState({
                displaydatestringversion: yyear + "-" + ymonth + "-" + ydate,
              });
              console.log('added', this.state.displaydatestringversion)
            }}
        >right</Button>
      </View>
    );
  }

  render() {

    

    if (!this.state.isReady) {
      return <AppLoading />;
    }
    return(
      <ScrollView>

      <View>
        {this.renderButtons()}
      </View>
  
      <View style={{marginTop: 40, marginBottom: 10 }}>
        {this.renderAccordion()}
      </View>
      
      </ScrollView>
      
      
      
      
       
  
    );
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
    },
    sizer: {
      width: 50,
      height: 50,
    },
});