import React from "react";
import { AppRegistry, Image, StatusBar, AsyncStorage, Alert, View, TouchableOpacity, RefreshControl } from "react-native";
import { Container, Content, Text, List, ListItem, Header, Footer } from "native-base";
import RNRestart from 'react-native-restart'

export default class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      member_type: '',
      full_name: '.',
    }
  }
  _onRefresh = () => {
    this.setState({refreshing: true});
    this._retrieveData();
    this.setState({refreshing: false});
  }
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('member_type');
      const valueName = await AsyncStorage.getItem('name');
      if (value !== null) {
        this.setState({
          member_type: value,
          full_name: valueName
        })
      }
    } catch (error) {
      Alert.alert("Something went wrong at our servers, Please try again later")
    }
  };
  logOut = async () => {
    this.props.navigation.navigate('Login');
    try {
      await AsyncStorage.removeItem('token');
    } catch (error) {
      Alert.alert("Something went wrong Please try again Later")
    } finally{
    }
  }
  logOutAndBecomeAnArtist = async () => {
    this.props.navigation.navigate('SignUp');
    try {
      await AsyncStorage.removeItem('token');
    } catch (error) {
      Alert.alert("Something went wrong Please try again Later")
    }
  }
  componentWillReceiveProps=(props)=>{
    if(props!==this.props){
      this._retrieveData();
    }
  }
  componentWillMount() {
    this._retrieveData();
  }
  render() {
    if (this.state.member_type === 'enthusiastic') {
      this.state.hi='hi'
      return (
        <Container>
          <Content
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }
          >
            <View style={{ height: 50, width: 50, borderRadius: 50, backgroundColor: '#eee', marginTop: 40, marginLeft: 30 }}>
              <Text style={{ fontSize: 40, alignSelf: 'center' }}>{this.state.full_name.substr(0, 1)}</Text>
            </View>
            <View style={{ marginTop: 10, marginLeft: 30 }}>
              <Text style={{ fontSize: 18, color: '#000', }}>{this.state.full_name}</Text>
              <TouchableOpacity onPress={(e) => { this.props.navigation.navigate('EditProfile') }}><Text style={{ fontSize: 14, color: '#000', paddingLeft: 0, paddingTop: 7, paddingBottom: 7, paddingRight: 8 }}>See Profile</Text></TouchableOpacity>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', height: 1, backgroundColor: 'rgba(0,0,0,0.5)', marginTop: 5 }}></View>
            <List>
              <ListItem
                button
                onPress={() => { this.props.navigation.navigate('DashboardEnthusiast') }}>
                <Text>Home</Text>
              </ListItem>
              <ListItem
                button
                onPress={() => { this.props.navigation.navigate('Interests') }}>
                <Text>Interests</Text>
              </ListItem>
              <ListItem
                button
                onPress={() => { this.props.navigation.navigate('EditProfile') }}>
                <Text>Profile</Text>
              </ListItem>
              <ListItem
                button
                onPress={() => { this.props.navigation.navigate('RecomendedPosts') }}>
                <Text>Recommended Posts</Text>
              </ListItem>
              <ListItem
                button
                onPress={() => { this.props.navigation.navigate('Cart') }}>
                <Text>Cart</Text>
              </ListItem>
            </List>
            <View style={{ flex: 1, flexDirection: 'row', height: 1, backgroundColor: 'rgba(0,0,0,0.5)', marginTop: 0 }}></View>
            <List>
              <ListItem
                button
                onPress={() => { this.logOutAndBecomeAnArtist() }}>
                <Text>Become an Artist</Text>
              </ListItem>
              <ListItem
                button
                onPress={() => { this.logOut() }}>
                <Text>Logout</Text>
              </ListItem>
            </List>
          </Content>
        </Container>
      );
    } else {
      return (
        <Container>
          <Content
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }
          >
            <View style={{ height: 50, width: 50, borderRadius: 50, backgroundColor: '#eee', marginTop: 40, marginLeft: 30 }}>
              <Text style={{ fontSize: 40, alignSelf: 'center' }}>{this.state.full_name.substr(0, 1)}</Text>
            </View>
            <View style={{ marginTop: 10, marginLeft: 30 }}>
              <Text style={{ fontSize: 18, color: '#000', }}>{this.state.full_name}</Text>
              <TouchableOpacity onPress={(e)=>{this.props.navigation.navigate('EditProfile')}}><Text style={{ fontSize: 14, color: '#000', paddingLeft: 0, paddingTop: 7, paddingBottom: 7, paddingRight: 8 }}>See Profile</Text></TouchableOpacity>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', height: 1, backgroundColor: 'rgba(0,0,0,0.5)', marginTop: 5 }}></View>
            <List>
              <ListItem
                button
                onPress={() => { this.props.navigation.navigate('DashboardEnthusiast') }}>
                <Text>Home</Text>
              </ListItem>
              <ListItem
                button
                onPress={() => { this.props.navigation.navigate('Interests') }}>
                <Text>Interests</Text>
              </ListItem>
              <ListItem
                button
                onPress={() => { this.props.navigation.navigate('EditProfile') }}>
                <Text>Profile</Text>
              </ListItem>
              <ListItem
                button
                onPress={() => { this.props.navigation.navigate('AddPosts') }}>
                <Text>Add Posts</Text>
              </ListItem>
              <ListItem
                button
                onPress={() => { this.props.navigation.navigate('Cart') }}>
                <Text>Cart</Text>
              </ListItem>
            </List>
            <View style={{ flex: 1, flexDirection: 'row', height: 1, backgroundColor: 'rgba(0,0,0,0.5)', marginTop: 0 }}></View>
            <List>
              <ListItem
                button
                onPress={() => { this.props.navigation.navigate('RecomendedPosts')}}>
                <Text>Recommended Posts</Text>
              </ListItem>
              <ListItem
                button
                onPress={() => { this.logOut() }}>
                <Text>Logout</Text>
              </ListItem>
            </List>
          </Content>
        </Container>
      )
    }
  }
}
