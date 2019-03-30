import React from 'react';
import {createSwitchNavigator, createStackNavigator, createDrawerNavigator, createAppContainer, createMaterialBottomTabNavigator, DrawerItems, createMaterialTopTabNavigator} from 'react-navigation';
import Login from './views/BaseAuthNavigator/Login';
import SignUp from './views/BaseAuthNavigator/SignUp';
import ForgotPassword from './views/BaseAuthNavigator/ForgotPassword';
import Otp from './views/BaseAuthNavigator/Otp';
import Profile from './views/BaseDrawerNavigator/Profile';
import DrawerComponent from './inc/DrawerComponent';
import {AsyncStorage} from 'react-native'

const _retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem('artist');
    if (value !== null) {
      // We have data!!
      return value
    }
  } catch (error) {
    return error
  }
};

export default class App extends React.Component {
  render() {
    return ( 
      <ArtisoNavigator/>
    );
  }
}

const BaseAuthNavigator = createStackNavigator({
  Login:{
    screen: Login,
  },
  SignUp:{
    screen:SignUp
  },
  ForgotPassword:{
    screen:ForgotPassword
  },
  Otp:{
    screen:Otp
  }
});

const BaseBottomTabNavigator = createMaterialTopTabNavigator({
  Profile:Profile,
  Login:Login
},
  {
    tabBarPosition:'bottom'
  }
)

const BaseDrawerNavigator = createDrawerNavigator({
  ProfileArtist: {
    screen: BaseBottomTabNavigator
  },
  ProfileEnthusiast:{
    screen:Profile
  }
},{
  contentComponent:({navigation}) =>(
    <DrawerComponent navigation={navigation}/>
  ),
  drawerType: 'slide',
  drawerPosition: 'right',
}
)

const BaseSwitchNavigator = createSwitchNavigator({
  Authentication:{
    screen:BaseAuthNavigator
  },
  ApplicationView: {
    screen: BaseDrawerNavigator
  },
  
})

const ArtisoNavigator = createAppContainer(BaseSwitchNavigator);