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
import AddPosts from './views/BaseDrawerNavigator/AddPosts';
import EditProfile from './views/BaseDrawerNavigator/EditProfile';
import Recomended from './views/BaseDrawerNavigator/Recomended';
import Cart from './views/BaseDrawerNavigator/Cart';

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
  ProfileEnthusiast: {
    screen: Profile
  },
  Interests:{
    screen:Interests
  },
  FullViewOfPostDrawer: {
    screen: InvisibleStack
  },
  AddPosts:{
    screen:AddPosts
  },
  EditProfile:{
    screen:EditProfile
  },
  RecomendedPosts:{
    screen:Recomended
  },
  Cart:{
    screen:Cart
  }
}, {
    contentComponent: ({ navigation }) => (
      <DrawerComponent navigation={navigation}/>
    ),
    drawerType: 'slide',
    drawerPosition: 'right',
    unmountInactiveRoutes: true
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