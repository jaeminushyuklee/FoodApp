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
      currentdate: '',
      indexofdate: 0,
      entirelog : [
        {
          date: "1552020",
          meals: [
            {
              id: 1,
              name: 'egg',
              imageurl: "something",
              protein: 5,
              carbohydrate: 7,
              fat: 8,
            },
            {
              id: 2,
              name: 'rice',
              imageurl: "something",
              protein: 14,
              carbohydrate: 65,
              fat: 2,
            }
          ]
        },
        {
          date: "1652020",
          meals: [
            {
              id: 1,
              name: 'hamburger',
              imageurl: "something",
              protein: 5,
              carbohydrate: 7,
              fat: 8,
            },
            {
              id: 2,
              name: 'peanuts',
              imageurl: "something",
              protein: 14,
              carbohydrate: 65,
              fat: 2,
            }
          ]
        },
        {
          date: "1752020",
          meals: [
            {
              id: 1,
              name: 'noodles',
              imageurl: "something",
              protein: 5,
              carbohydrate: 7,
              fat: 8,
            },
            {
              id: 2,
              name: 'drink',
              imageurl: "something",
              protein: 14,
              carbohydrate: 65,
              fat: 2,
            }
          ]
        }
      ]
    }  
  }
  componentDidMount() {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    this.setState({
      currentdate : date.toString() + month.toString() + year.toString(),
      indexofdate : this.state.entirelog.findIndex(std => std.date === this.state.currendate)
    });
    
  }
  

  renderButtons() {
    return this.state.entirelog[0].meals.map((item) => {
      return(
        <Button>
          {item.name}
        </Button>
      );
    });
  }
  render() {
    return(
      <View style = {styles.container}>
          {this.renderButtons()}
          <Text>{this.state.indexofdate}</Text>
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