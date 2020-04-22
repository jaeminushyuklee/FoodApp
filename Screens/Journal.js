import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'react-native'
import { Accordion, List } from '@ant-design/react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo'

export default class Journal extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      activeSections: [2, 0],
      isReady: false
    };
    this.onChange = activeSections => {
      this.setState({ activeSections });
    };
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
          <Accordion.Panel header="Title 1">
            <List>
              <List.Item><Image
                source={{uri: data.uri, isStatic:true}}
                style={{width: 100, height: 100}}
              /></List.Item>
              <List.Item>Content 2</List.Item>
              <List.Item>Content 3</List.Item>
            </List>
          </Accordion.Panel>
          <Accordion.Panel header="Title 2">
            this is panel content2 or other
          </Accordion.Panel>
          <Accordion.Panel header="Title 3">
            Text text text text text text text text text text text text text
            text text
          </Accordion.Panel>
        </Accordion>
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