import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, ActivityIndicator, TouchableOpacity, TextInput, Image, Alert, Animated, Dimensions } from 'react-native';
import Icon from '@expo/vector-icons/MaterialIcons';
import EyeIcon from '@expo/vector-icons/MaterialCommunityIcons';
import UserIcon from '@expo/vector-icons/Feather'
import Fetch from '../../helper/Fetch'
import { Picker } from 'native-base';

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullname: '',
            username: '',
            phonenumber: '',
            password: '',
            showPassword: false,
            signUpRoute: 'member/signup',
            selectedPickerValue: 'key0',
            loader: false
        };
    }
    toggleLoader = () => {
        this.setState({
            loader: !this.state.loader
        })
    }
    showPassword = () => {
        this.setState({
            showPassword: !this.state.showPassword
        })

    }

    signup = () => {
        this.toggleLoader();
        let member_type_frontend = '';
        if (this.state.selectedPickerValue === 'key0') {
            member_type_frontend = 'artist'
        }
        else {
            member_type_frontend = 'enthusiastic'
        }
        Fetch.post(this.state.signUpRoute, { username: this.state.username, password: this.state.password, phone_number: this.state.phonenumber, full_name: this.state.fullname, member_type: member_type_frontend }).then(res => {
            console.log(res)
            if (res.response) {
                this.toggleLoader()
                this.props.navigation.push('Login');
                this.setState({
                    username: '',
                    password: '',
                    fullname: '',
                    phonenumber: ''
                })
            } else {
                this.toggleLoader()
                Alert.alert(res.msg)
            }
        })
    }
    handlePickerInput(value) {
        console.log(value)
        this.setState({
            selectedPickerValue: value
        });
    }
    render() {

        return (
            <View style={styles.container}>
                {
                    this.state.loader ? (<ActivityIndicator size="large" color="rgb(14,130,167)" style={{ alignSelf: 'center' }} />) : (
                        <ScrollView>
                            <StatusBar backgroundColor="#ffffff" barStyle="dark-content" hidden={false} />
                            <View style={styles.parent}>
                                <View style={styles.row1}>
                                    <View style={{ flex: 0.5, flexDirection: 'column', justifyContent: 'center' }}>
                                        <View style={{ alignSelf: 'center' }}>
                                            <Image source={require('../../assets/icon.png')} style={{ width: 150, height: 150, resizeMode: 'center' }} />
                                        </View>
                                        <View style={{ alignContent: 'center', alignItems: 'center', justifyContent: 'center', }}>
                                            <Text style={{ fontSize: 40, color: '#9368e9', fontWeight: 'bold' }}>Artiso</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.row2}>
                                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', paddingLeft: 15, paddingRight: 15 }}>
                                        <View style={{ flex: 0.25, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10, height: 40 }}>
                                            <View style={{ flex: 0.95, flexDirecction: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', backgroundColor: 'rgb(241,243,242)', borderRadius: 4 }}>
                                                    <View style={{ alignSelf: 'center', paddingLeft: 2, marginLeft: 4 }}>
                                                        <UserIcon name="edit" color="rgb(113,117,128)" size={18} />
                                                    </View>
                                                    <View style={{ flex: 1, flexDirection: 'row', paddingLeft: 8, alignSelf: 'center' }}>
                                                        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                                                            <TextInput placeholderTextColor="rgb(113,117,128)" style={styles.email} placeholder="Enter fullname" onChangeText={(fullname) => this.setState({ fullname })} />
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={{ flex: 0.25, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10, height: 40 }}>
                                            <View style={{ flex: 0.95, flexDirecction: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', backgroundColor: 'rgb(241,243,242)', borderRadius: 4 }}>
                                                    <View style={{ alignSelf: 'center', paddingLeft: 2, marginLeft: 4 }}>
                                                        <UserIcon name="user" color="rgb(113,117,128)" size={18} />
                                                    </View>
                                                    <View style={{ flex: 1, flexDirection: 'row', paddingLeft: 8, alignSelf: 'center' }}>
                                                        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                                                            <TextInput placeholderTextColor="rgb(113,117,128)" style={styles.email} placeholder="Enter username" onChangeText={(username) => this.setState({ username })} autoCapitalize="none" />
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={{ flex: 0.25, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10, height: 40 }}>
                                            <View style={{ flex: 0.95, flexDirecction: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', backgroundColor: 'rgb(241,243,242)', borderRadius: 4 }}>
                                                    <View style={{ alignSelf: 'center', paddingLeft: 2, marginLeft: 4 }}>
                                                        <UserIcon name="phone" color="rgb(113,117,128)" size={18} />
                                                    </View>
                                                    <View style={{ flex: 1, flexDirection: 'row', paddingLeft: 8, alignSelf: 'center' }}>
                                                        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                                                            <TextInput placeholderTextColor="rgb(113,117,128)" style={styles.email} placeholder="Enter phone number" onChangeText={(phonenumber) => this.setState({ phonenumber })} keyboardType='numeric' />
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={{ flex: 0.25, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10, height: 40 }}>
                                            <View style={{ flex: 0.95, flexDirecction: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', backgroundColor: 'rgb(241,243,242)', borderRadius: 4 }}>
                                                    <View style={{ alignSelf: 'center', paddingLeft: 2, marginLeft: 4 }}>
                                                        <Icon name="lock-outline" color="rgb(113,117,128)" size={18} />
                                                    </View>
                                                    <View style={{ flex: 1, flexDirection: 'row', paddingLeft: 8, alignSelf: 'center' }}>
                                                        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                                                            <TextInput placeholderTextColor="rgb(113,117,128)" style={styles.email} placeholder="Enter password" secureTextEntry={this.state.showPassword ? false : true} onChangeText={(password) => this.setState({ password })} />
                                                        </View>
                                                    </View>
                                                    <View style={{ alignSelf: 'center', paddingRight: 2, marginRight: 5 }} onPress={() => { this.showPassword() }}>
                                                        <EyeIcon name={this.state.showPassword ? 'eye-outline' : 'eye-off-outline'} color="rgb(113,117,128)" size={18} onPress={() => { this.showPassword() }} />
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={{ flex: 0.25, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10, height: 40 }}>
                                            <Picker
                                                mode="dialog"
                                                iosIcon={<Icon name="arrow-downward" />}
                                                style={{ width: undefined }}
                                                placeholder="Artist/Enthuasiast"
                                                placeholderStyle={{ color: "#bfc6ea" }}
                                                placeholderIconColor="#007aff"
                                                selectedValue={this.state.selectedPickerValue}
                                                onValueChange={this.handlePickerInput.bind(this)}
                                            >
                                                <Picker.Item label="Artist" value="key0" />
                                                <Picker.Item label="Enthuasiast" value="key1" />
                                            </Picker>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.row3}>
                                    {
                                        (this.state.username === '' && this.state.password === '' && this.state.fullname === '' && this.state.phonenumber === '') ?
                                            (<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }} >
                                                <View style={{ flex: 0.9, flexDirection: 'row', justifyContent: 'center', borderRadius: 4, backgroundColor: "rgba(147,104,233,0.6)", height: 50 }} >
                                                    <View style={{ flex: 1, flexDirection: 'column', alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                                                        <Text style={{ alignSelf: 'center', fontSize: 19, color: '#fff', }}>Sign Up</Text>
                                                    </View>
                                                </View>
                                            </View>) :
                                            (
                                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }} >
                                                    <TouchableOpacity onPress={this.signup} >
                                                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', borderRadius: 4, elevation: 3, backgroundColor: "#9368e9", height: 50 }} >
                                                            <View style={{ flexDirection: 'column', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', width: Dimensions.get('window').width - 30 }}>
                                                                <Text style={{ alignSelf: 'center', fontSize: 19, color: '#fff', }}>Sign Up</Text>
                                                            </View>
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>
                                            )
                                    }

                                </View>

                                <View style={styles.row5}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                                        <Text style={{ alignSelf: 'center', fontSize: 15, color: '#000' }}>Already exists? Login.</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ScrollView>
                    )
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        justifyContent: 'center'
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
        marginTop: 35,
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