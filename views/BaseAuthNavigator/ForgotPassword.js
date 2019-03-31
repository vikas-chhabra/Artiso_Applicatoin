import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, StatusBar, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import Icon from '@expo/vector-icons/Feather';
import { LinearGradient } from 'expo'
export default class ForgetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            showPassword: false
        };
    }
    showPassword = () => {

        this.setState({
            showPassword: !this.state.showPassword
        })

    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="black" barStyle="light-content" />
                <ScrollView>
                    <View style={styles.parent}>
                        <View style={styles.row1}>
                            <View style={{ flex: 0.5, flexDirection: 'column', justifyContent: 'center' }}>
                                <View style={{ alignSelf: 'center' }}>
                                    <Image source={require('../../assets/icon.png')} style={{ width: 200, height: 200, resizeMode: 'center' }} />
                                </View>
                                <View style={{ alignContent: 'center', alignItems: 'center', justifyContent: 'center', }}>
                                    <Text style={{ fontSize: 40, color: '#9368e9', fontWeight: 'bold' }}>Artiso</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.row2}>
                            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>
                                <View style={{ flex: 0.25, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 80 }}>
                                    <View style={{ flex: 0.95, flexDirecction: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
                                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ fontSize: 26, color: '#000', alignSelf: 'center' }}>Forgot Your Password?</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ flex: 0.25, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ flex: 0.95, flexDirecction: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
                                            <View style={{ flex: 0.9, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ fontSize: 13, color: 'rgb(219,219,219)', alignSelf: 'center' }}>To recover your password,you need to enter your registered email address.We will send the recovery code to your email.</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ flex: 0.25, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10, height: 50 }}>
                                    <View style={{ flex: 0.95, flexDirecction: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', backgroundColor: 'rgb(241,243,242)', borderRadius: 4 }}>
                                            <View style={{ alignSelf: 'center', paddingLeft: 2, marginLeft: 4 }}>
                                                <Icon name="phone" color="rgb(113,117,128)" size={18} />
                                            </View>
                                            <View style={{ flex: 1, flexDirection: 'row', paddingLeft: 8, alignSelf: 'center' }}>
                                                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                                                    <TextInput placeholderTextColor="rgb(113,117,128)" style={styles.email} keyboardType="number-pad" placeholder="Enter phone number" onChangeText={(phonenumber) => this.setState({ phonenumber })} />
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.row3}>
                            {
                                (this.state.phonenumber==='') ?
                                    (<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }} >
                                        <View style={{ flex: 0.9, flexDirection: 'row', justifyContent: 'center', borderRadius: 4, backgroundColor: "rgba(147,104,233,0.6)", height: 50 }} >
                                            <View style={{ flex: 1, flexDirection: 'column', alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ alignSelf: 'center', fontSize: 19, color: '#fff', }}>Log In</Text>
                                            </View>
                                        </View>
                                    </View>) :
                                    (
                                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }} >
                                            <TouchableOpacity onPress={this.login} >
                                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', borderRadius: 4, elevation: 3, backgroundColor: "#9368e9", height: 50 }} >
                                                    <View style={{ flexDirection: 'column', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', width: Dimensions.get('window').width - 30 }}>
                                                        <Text style={{ alignSelf: 'center', fontSize: 19, color: '#fff', }}>Send Otp</Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    )
                            }

                        </View>

                        <View style={styles.row5}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                                <Text style={{ alignSelf: 'center', fontSize: 15, color: '#000' }}>Go back to Log in screen.</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'rgb(255,255,255)',
        justifyContent:'center'
    },
    parent: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    email:
    {
        fontSize: 14,
        color: '#000000',

    },
    row1: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 35,
    },
    row2: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 15,

    },
    row3:
    {
        flex: 1,
        flexDirection: 'row',
        height: 50,
        justifyContent: 'space-around',
        marginTop: 25,
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
        marginTop: 35,
        marginBottom: 20
    }
})