import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'react-native'
import { Accordion, List, Button } from '@ant-design/react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo'

export default class Journal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      activeSections: [0],
      currentdate: '',
      dnumber: 0,
      mnumber:0,
      ynumber: 0,
      indexofdate: 0,
      entirelog : [
        {
          date: "1752020",
          meals: [
            {
              id: 1,
              name: 'egg',
              imageurl: "something",
              protein: 1,
              carbohydrate: 2,
              fat: 3,
            },
            {
              id: 2,
              name: 'rice',
              imageurl: "something",
              protein: 11,
              carbohydrate: 12,
              fat: 2,
            }
          ]
        },
        {
          date: "1852020",
          meals: [
            {
              id: 1,
              name: 'hamburger',
              imageurl: "something",
              protein: 111,
              carbohydrate: 222,
              fat: 8,
            },
            {
              id: 2,
              name: 'peanuts',
              imageurl: "something",
              protein: 333,
              carbohydrate: 444,
              fat: 2,
            }
          ]
        },
        {
          date: "1952020",
          meals: [
            {
              id: 1,
              name: 'noodles',
              imageurl: "something",
              protein: 1111,
              carbohydrate: 2222,
              fat: 8,
            },
            {
              id: 2,
              name: 'drink',
              imageurl: "something",
              protein: 3333,
              carbohydrate: 4444,
              fat: 2,
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
    var index = this.state.entirelog.findIndex(x => x.date === date.toString() + month.toString() + year.toString());
    this.setState({
      currentdate : date.toString() + month.toString() + year.toString(),
      indexofdate : index,
      dnumber: date,
      mnumber: month,
      ynumber: year,
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
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    return(
      <View>
      <View style={{flexDirection: 'row', marginTop: 40, alignItems: 'center', justifyContent:'center'}}>
        <Button onPress = {() => {
              this.setState({
                indexofdate: this.state.indexofdate - 1,
              });
            }}
        >left</Button>
        <Text> Today </Text>
        <Button onPress = {() => {
              this.setState({
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


/*
export default class Journal extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      activeSections: [0],
      activemeal: 0,
      isReady: false
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
  }

    render() {
      const data = this.props.navigation.getParam('data');
        console.log(data);
        if (!this.state.isReady) {
          return <AppLoading />;
        }
        return (

        <View style={{ marginTop: 80, marginBottom: 10 }}>
        <Accordion
          onChange={this.onChange}
          activeSections={this.state.activeSections}
        >
          <Accordion.Panel header="Thursday 4/23">
            <List>
              <List.Item>
                <Image source={{uri: data.uri, isStatic:true}} style={{width: 100, height: 100}}/>
                <Button
                  onPress={() => this.props.navigation.navigate('Camera')}>
                Retake</Button>
              </List.Item>
              <List.Item>Protein: Xg</List.Item>
              <List.Item>Carbohydrates: Yg</List.Item>
              <List.Item>Less sugar on your next meal!</List.Item>
            </List>
          </Accordion.Panel>
          <Accordion.Panel header="Friday 4/24">
          <List>
              <List.Item>
              </List.Item>
              <List.Item>Content 3</List.Item>
          </List>
          </Accordion.Panel>
          <Accordion.Panel header="Saturday 4/25">
          <List>
              <List.Item>Content 2</List.Item>
              <List.Item>Content 3</List.Item>
          </List>
          </Accordion.Panel>
        </Accordion>
      </View>

        
      );
    }
}
*/

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});