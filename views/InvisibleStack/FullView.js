import React, { Component } from 'react';
import { Image, StatusBar } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Title, Right } from 'native-base';
import {Font, AppLoading} from 'expo';


export default class CardShowcaseExample extends Component {
  static navigationOption = {
    header:null,
    headerMode: 'none',
    headerVisible: false
}

  constructor(props){
    super(props);
    this.state={
      isReady:false
    }
  }
  async componentWillMount() {
    await Font.loadAsync({
        'Roboto': require('native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({ isReady: true })
}
  render() {
    if(this.state.isReady){
    return (
      <Container>
        <StatusBar backgroundColor='#9368e9' barStyle='light-content' />
        <Header style={{backgroundColor:'#9368e9'}}>
          <Left>
            <Button transparent>
              <Icon name='arrow-back' style={{color:'#fff'}}/>
            </Button>
          </Left>
          <Right>
            <Button transparent>
              <Icon name='menu' style={{color:'#fff'}}/>
            </Button>
          </Right>
        </Header>
        <Content>
          <Card style={{flex: 0}}>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: 'Image URL'}} />
                <Body>
                  <Text>NativeBase</Text>
                  <Text note>April 15, 2016</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Image source={{uri: 'Image URL'}} style={{height: 200, width: 200, flex: 1}}/>
                <Text>
                  //Your text here
                </Text>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent textStyle={{color: '#87838B'}}>
                  <Icon name="logo-github" />
                  <Text>1,926 stars</Text>
                </Button>
              </Left>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
  else{
    return(
      <AppLoading />
    )
  }
}
}