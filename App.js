import React from 'react';
import { createSwitchNavigator, createStackNavigator, createDrawerNavigator, createAppContainer, createMaterialBottomTabNavigator, DrawerItems, createMaterialTopTabNavigator } from 'react-navigation';
import Login from './views/BaseAuthNavigator/Login';
import SignUp from './views/BaseAuthNavigator/SignUp';
import ForgotPassword from './views/BaseAuthNavigator/ForgotPassword';
import Otp from './views/BaseAuthNavigator/Otp';
import Profile from './views/BaseDrawerNavigator/Profile';
import DrawerComponent from './inc/DrawerComponent';
import { AsyncStorage } from 'react-native';
import FullView from './views/InvisibleStack/FullView';
import HomeEnthusiast from './views/BaseDrawerNavigator/HomeEnthusiast';
import Interests from './views/InvisibleStack/Interests';

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
      <ArtisoNavigator />
    );
  }
}

const InvisibleStack = createStackNavigator({
  FullViewOfPost: {
    screen: FullView
  },
},{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
})

const BaseAuthNavigator = createStackNavigator({
  Login: {
    screen: Login,
  },
  SignUp: {
    screen: SignUp
  },
  selectInterests:{
    screen:Interests,
    navigationOptions:{
      headerVisible:true,
    }
  },
  ForgotPassword: {
    screen: ForgotPassword
  },
  Otp: {
    screen: Otp
  }
},
  {
    initialRouteName: 'Login',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  }
);

const BaseBottomTabNavigator = createMaterialTopTabNavigator({
  Profile: Profile,
  Login: Login
},
  {
    tabBarPosition: 'bottom'
  }
)

const BaseDrawerNavigator = createDrawerNavigator({
  DashboardEnthusiast:{
    screen:HomeEnthusiast
  },
  ProfileArtist: {
    screen: BaseBottomTabNavigator
  },
  ProfileEnthusiast: {
    screen: Profile
  },
  FullViewOfPostDrawer: {
    screen: InvisibleStack
  },
}, {
    contentComponent: ({ navigation }) => (
      <DrawerComponent navigation={navigation} />
    ),
    drawerType: 'slide',
    drawerPosition: 'right',
  }
)

const BaseSwitchNavigator = createSwitchNavigator({
  Authentication: {
    screen: BaseAuthNavigator
  },
  ApplicationView: {
    screen: BaseDrawerNavigator
  },

})

const ArtisoNavigator = createAppContainer(BaseSwitchNavigator);