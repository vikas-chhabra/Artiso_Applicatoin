import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, RefreshControl, TouchableOpacity, TouchableNativeFeedback, TextInput, Image, Alert, Animated, AsyncStorage} from 'react-native';
import { Container, Header, Content, Button, Icon, Left, Right,  } from 'native-base';
import {Font, AppLoading, } from 'expo';
import MyIcon from '@expo/vector-icons/Feather'
import Fetch from '../../helper/Fetch'

export default class Recomended extends Component {
  static navigationOption = {
    header:null,
    headerMode: 'none',
    headerVisible: false,
}

  constructor(props){
    super(props);
    this.state={
      isReady:false,
        postsRoute:'post/get-recommendation',
        posts:[],
        refreshing:false
    }
  }
  _onRefresh = () => {
    this.setState({refreshing: true});
    this.getToken();
    this.setState({refreshing: false});
  }
  async componentWillMount() {
    await Font.loadAsync({
        'Roboto': require('native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({ isReady: true })
}
getPosts = (token) => {
    Fetch.post(this.state.postsRoute, {}, token).then(res => {
        if(res.response===true){
            this.setState({
                posts:res.posts
            })
        }
        else{
            Alert.alert(res.msg);
            this.props.navigation.navigate('DashboardEnthusiast')
        }
    })
}
getToken = async () => {
    const token = await AsyncStorage.getItem('token')
    this.getPosts(token)
}
componentDidMount(){
    this.getToken();
}
  render() {
    if(this.state.isReady){
    return (
      <Container>
        <Header style={{backgroundColor:'#9368e9'}}>
            <StatusBar hidden={false} backgroundColor="#9368e9" barStyle='light-content' />
          <Left>
            <View style={{flexDirection:'row'}}>
            <Button transparent>
              <Icon name='home' style={{color:'#fff'}}/>
            </Button>
            <Text style={{fontSize:20, color:"#fff", alignSelf:'center',fontWeight:'bold'}}>Home</Text>
            </View>
          </Left>
          <Right>
            <Button transparent onPress={()=>{this.props.navigation.toggleDrawer()}}>
              <Icon name='menu' style={{color:'#fff'}}/>
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
        {
            this.state.posts.map((v,i)=>{
                return(
                    <TouchableOpacity key={i} onPress={(e)=>{this.props.navigation.navigate('FullViewOfPost',{post_id:v._id})}}>

                <View style={styles.row1}>
                    <View style={{ flex: 0.95, flexDirection: 'column' }}>
                        <View style={{ flex: 0.15, flexDirection: 'row', justifyContent: 'flex-start' }}>
                            <Text style={{ alignSelf: 'center', fontSize: 17, fontWeight: '600', color: '#000', marginLeft: 7, }}>{v.category.category_name}</Text>
                        </View>
                        <View style={{ flex: 0.6, flexDirection: 'row' }}>
                            <View style={{ flex: 0.65, flexDirection: 'column', justifyContent: 'space-around' }}>
                                <View style={{ flex: 0.05, flexDirection: 'row', }}>

                                </View>
                                <View style={{ flex: 0.18, flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 20, color: '#000', fontWeight: '300' }} ellipsizeMode='tail' numberOfLines={1}>{v.title}</Text>
                                </View>
                                <View style={{ flex: 0.15, flexDirection: 'row', }}>
                                    <Text style={{ fontSize: 16, color: 'rgb(113,117,128)', fontWeight: '600' }} ellipsizeMode='tail' numberOfLines={1}>{v.description}</Text>

                                </View>
                                <View style={{ flex: 0.05, flexDirection: 'row', }}>

                                </View>
                            </View>
                            <View style={{ flex: 0.05, flexDirection: 'column', justifyContent: 'space-around' }}></View>
                            <View style={{ flex: 0.3, flexDirection: 'column', justifyContent: 'space-around' }}>
                                <Image source={{ uri: 'http://192.168.43.67:3002/'+v.file }} style={{ alignSelf: 'center', resizeMode: 'center', height: 100, width: 100 }} />
                            </View>
                        </View>
                        <View style={{ flex: 0.25, flexDirection: 'row' }}>
                            <View style={{ flex: 0.8, flexDirection: 'column' }}>
                                <View style={{ flex: 0.6, flexDirection: 'row'}}>
                                    <Text style={{fontSize:16,color:'#000'}}>{v.member.full_name}</Text>
                                </View>
                                <View style={{ flex: 0.4, flexDirection: 'row' }}>
                                    <Text style={{fontSize:19,color:'rgb(113,117,128)'}}>₹ {v.price}</Text>
                                </View>
                                <View></View>
                            </View>
                            <View style={{ flex: 0.3, flexDirection: 'column', justifyContent: 'space-around' }}>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    <Text style={{ alignSelf: 'flex-end',marginRight: 6, fontSize:18, color:"#d3d3d3"}} >See more</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                </View>
                <View style={{ height: 1, backgroundColor: 'rgb(214,215,216)', flex: 1, flexDirection: 'row', marginTop: 14 }}>

                </View>
            </TouchableOpacity>

                )
            })
        }
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff'
    },
    parent: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        marginTop: 10
    },
    email:
    {
        fontSize: 14,
        color: '#000'
    },
    row1: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        height: 200,
        marginTop: 15,
    },
    row2: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 30,

    },
    row3:
    {
        flex: 1,
        flexDirection: 'row',
        height: 50,
        justifyContent: 'space-around',
        marginTop: 30,
        marginBottom: 15,
    },
    row4: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: 15,
    },
    row5: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: 15,
        marginBottom: 10
    }
})