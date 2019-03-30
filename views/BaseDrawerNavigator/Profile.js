//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
class Profile extends Component {
    constructor(props){
        super(props);
        console.log(this.props.navigation.state)
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>Profile Screen</Text>
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
export default Profile;
