import React from "react";
import { AppRegistry, Image, StatusBar, AsyncStorage, Alert } from "react-native";
import { Container, Content, Text, List, ListItem } from "native-base";

const routes = ["Profile", "Home", "About"];

export default class SideBar extends React.Component {
  constructor(props){
    super(props);
    this.state={
      member_type:''
    }
  }
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('member_type');
      if (value !== null) {
        this.setState({
          member_type:value
        })
      }
    } catch (error) {
      Alert.alert("Something went wrong at our servers, Please try again later")
    }
  };
  componentWillMount(){
    this._retrieveData();
  }
  render() {
    return (
      <Container>
        <Content>
          <Image
            source={{
              uri: "https://github.com/GeekyAnts/NativeBase-KitchenSink/raw/react-navigation/img/drawer-cover.png"
            }}
            style={{
              height: 120,
              alignSelf: "stretch",
              justifyContent: "center",
              alignItems: "center"
            }}>
          </Image>
          <List
            dataArray={routes}
            renderRow={data => {
              return (
                <ListItem
                  button
                  onPress={() => this.props.navigation.navigate(data)}>
                  <Text>{data}</Text>
                </ListItem>
              );
            }}
          />
        </Content>
      </Container>
    );
  }
}
