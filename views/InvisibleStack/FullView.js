import React, { Component } from 'react';
import { Image, StatusBar, AsyncStorage, Alert, View, Dimensions, RefreshControl } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Title, Right } from 'native-base';
import { Font, AppLoading } from 'expo';
import Fetch from '../../helper/Fetch';
import { Rating, AirbnbRating } from 'react-native-ratings';


export default class CardShowcaseExample extends Component {
  static navigationOption = {
    header: null,
    headerMode: 'none',
    headerVisible: false,
    token:'',
    post_id:null,
    alreadyInCart:false
  }
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      getPostDetailsRoute: 'post/get-single',
      postDetails: { member: { full_name: '' }, title: '', file: '', description: '' }
    }
  }
  _onRefresh = () => {
    this.setState({refreshing: true});
    this.getToken();
    this.setState({refreshing: false});
  }
  ratingCompleted=(rating) =>{
    Alert.alert(
      'Rating!!',
      `Are you sure to give ${rating} rating to this book ??`,
      [
        { text: 'No', onPress: () => { }, style: 'cancel' },
        {
          text: 'Yes', onPress: () => {
            Fetch.post('post/save-rating/', { post_id: this.state.post_id, post_rating:rating }, this.state.token).then(res => {
              Alert.alert(res.msg)
            })
          }
        },
      ],
      { cancelable: false }
    )
  }
  getToken = async () => {
    const token = await AsyncStorage.getItem('token');
    this.setState({
      token:token,
    })
    this.getPostDetails(token);
    this.getCartItems(token);
  }
  getCartItems = (token)=>{
    Fetch.post('cart/is-added', { post_id: this.props.navigation.state.params.post_id }, token).then(res => {
      if(res.response){
        this.setState({
          alreadyInCart:res.is_added
        })
      }
      else{
        Alert.alert(msg)
      }
    })
  }
  getPostDetails = (token) => {
    this.setState({
      post_id: this.props.navigation.state.params.post_id
    })
    Fetch.post(this.state.getPostDetailsRoute, { post_id: this.props.navigation.state.params.post_id }, token).then(res => {
      if (res.response) {
        this.setState({
          postDetails: res.post
        })
      }
      else {
        Alert.alert("Something went wrong please try again later")
      }
    })
  }
  async componentWillMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({ isReady: true })
  }
  toggleCart=()=>{
    Fetch.post('cart/toggle', { post_id: this.props.navigation.state.params.post_id }, this.state.token).then(res => {
      if(res.response){
        if(res.added_item !==undefined){
          this.setState({
            alreadyInCart:true
          })
        }
        else{
          this.setState({
            alreadyInCart:false
          })
        }
      }
      else{
        Alert.alert("Something went wrong "+res.msg)
      }
    })
  }
  componentDidMount() {
    this.getToken();
  }
  render() {
    if (this.state.isReady) {
      return (
        <Container>
          <Header style={{ backgroundColor: '#9368e9' }}>
            <StatusBar hidden={false} backgroundColor="#9368e9" barStyle='light-content' />
            <Left>
            <View style={{flexDirection:'row'}}>
            <Button transparent>
              <Icon name='md-paper' style={{color:'#fff'}}/>
            </Button>
            <Text style={{fontSize:20, color:"#fff", alignSelf:'center',fontWeight:'bold'}}>Details</Text>
            </View>
          </Left>
            <Right>
              <Button transparent onPress={(e)=>{this.props.navigation.navigate('DashboardEnthusiast')}}>
                <Icon name='menu' style={{ color: '#fff' }} />
              </Button>
            </Right>
          </Header>
          <Content
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }
          >
            <Card style={{ flex: 0 }}>
              <CardItem>
                <Left>
                  <View style={{backgroundColor:'#eee', height:40, width:40, borderRadius:40}}>
                    <Text style={{ fontSize:30, alignSelf:'center', justifyContent: 'center', marginLeft:0}}>{this.state.postDetails.member.full_name.substr(0,1)}</Text>
                  </View>
                  <Body>
                    <Text>{this.state.postDetails.title}</Text>
                    <Text note>By: {this.state.postDetails.member.full_name}</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem>
                <Body >

                  <Image source={{ uri: 'http://192.168.43.67:3002/' + this.state.postDetails.file }} style={{ height: 200, alignSelf: 'center', flex: 1, width: Dimensions.get('window').width-20 }} />
                  <Text style={{ marginTop: 8,color:'rgb(113,117,128)' }}>
                    Avg Rating: {this.state.postDetails.average_rating}
                  </Text>
                  <View style={{ flex: 1, flexDirection: 'row', marginTop: 7, }}>
                    <Text style={{ alignSelf: 'center', fontSize: 20, }}>Swipe to rate:  </Text>
                    <Rating
                      type='star'
                      style={{ marginLeft: 8, }}
                      ratingCount={5}
                      imageSize={28}
                      fractions={1}
                      onFinishRating={this.ratingCompleted}
                    />
                  </View>

                </Body>
              </CardItem>
              <CardItem>
                <Body>
                  <Button style={{ alignSelf:'center', marginTop:20, width:Dimensions.get('window').width-20, alignItems:'center', justifyContent: 'center',backgroundColor:'#8055e3', flexDirection:'row'}} onPress={()=>{this.toggleCart()}}>{this.state.alreadyInCart?(<Text style={{alignSelf:'center', color:'#fff'}}> Remove From Cart </Text>):(<Text style={{alignSelf:'center', color:'#fff'}}> Add To Cart </Text>)}<Icon name="cart" style={{marginLeft:0,}}></Icon></Button>
                  <Text style={{ marginTop: 10, fontSize: 19 }}>Description:</Text>
                  <Text style={{ marginTop: 10, fontSize: 14, color: 'rgb(200,200,200)' }}>{this.state.postDetails.description}</Text>
                </Body>
              </CardItem>
            </Card>
          </Content>
        </Container>
      );
    }
    else {
      return (
        <AppLoading />
      )
    }
  }
}