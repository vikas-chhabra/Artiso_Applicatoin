//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage } from 'react-native';
import { Button } from 'react-native-paper'

// create a component
class Login extends Component {
    _storeData = async () => {
        try {
          await AsyncStorage.setItem('artist','false');
        } catch (error) {
          console.log("Error while storin async call to the Async Storage",error)
        }
      };
      componentDidMount(){
          this._storeData();
      }
    render() {
        return (
            <View style={styles.container}>
                <Text>This is a login Page</Text>
                <Button icon="add-a-photo" mode="contained" onPress={() => this.props.navigation.push("SignUp")}>
                    Press me to sign Up
                </Button>
                <Button icon="add-a-photo" mode="contained" onPress={() => this.props.navigation.navigate("ProfileArtist")}>
                    Login O
                </Button>
                <Button icon="add-a-photo" mode="contained" onPress={() => this.props.navigation.push("ForgotPassword")}>
                    Forgot Password
                </Button>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

//make this component available to the app
export default Login;
