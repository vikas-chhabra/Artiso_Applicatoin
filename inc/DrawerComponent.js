import React from "react";
import { AppRegistry, Image, StatusBar, AsyncStorage } from "react-native";
import { Container, Content, Text, List, ListItem } from "native-base";

const routes = ["Profile", "Home", "About"];

export default class SideBar extends React.Component {
  constructor(props){
    super(props);
    console.log(this.props.navigation)
  }
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('artist');
      if (value !== null) {
        // We have data!!
        console.log(value);
      }
    } catch (error) {
      // Error retrieving data
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
