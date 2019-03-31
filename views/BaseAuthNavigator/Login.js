import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, ImageBackground, TouchableOpacity, TouchableNativeFeedback, TextInput, Image, Alert, AsyncStorage, ActivityIndicator, Dimensions } from 'react-native';
import Icon from '@expo/vector-icons/MaterialIcons';
import EyeIcon from '@expo/vector-icons/MaterialCommunityIcons';
import UserIcon from '@expo/vector-icons/Feather';
import Fetch from '../../helper/Fetch';
import Logo from '../../assets/icon.svg'

export default class Login extends Component {
    static navigationOption = {
        header:null,
        headerMode: 'none',
        headerVisible: false
    }
    constructor(props) {
        super(props);
        this.state = {
            username_phone: '',
            password: '',
            showPassword: false,
            loader: true,
            loginRoute:'member/login'
        };
    }
    checkLogin=async()=>{
        const token = await AsyncStorage.getItem('token')
        if(token!==null){
            this.props.navigation.navigate('DashboardEnthusiast')
        }
    }
    showPassword = () => {
        this.setState({
            showPassword: !this.state.showPassword
        })
    }
    componentDidMount() {
        this.checkLogin();
        this.setState({
            loader: false
        })
    }
    _saveToAsync = async (token,type,name) => {
        try {
          await AsyncStorage.setItem('token', token);
          await AsyncStorage.setItem('member_type',type )
          await AsyncStorage.setItem('name',name )
        } catch (error) {
          Alert.alert("Something went wrong, Please try again later")
        }
      };
    login = () => {
        this.setState({
            loader: true
        })
        Fetch.post(this.state.loginRoute, { username_phone_number: this.state.username_phone, password: this.state.password }).then(res => {
            this.setState({
                loader: false
            })
            if (res.response) {
                this._saveToAsync(res.token,res.member_type, res.full_name);
                if(res.is_interest_selected===true){
                    this.props.navigation.navigate('DashboardEnthusiast');
                }
                else{
                    this.props.navigation.push('selectInterests')
                }
            } else {
                this.setState({
                    loader: false
                })
                Alert.alert(res.msg);
            }
        })
    }
    render() {

        return (
            <View style={styles.container}>
                {
                    this.state.loader == true ?
                        <ActivityIndicator size="large" color="rgb(14,130,167)" style={{ alignSelf: 'center' }} /> :
                        (
                            <ScrollView>
                                <StatusBar hidden={false} backgroundColor="#fff" barStyle='dark-content' />

                                <View style={styles.parent}>
                                    <View style={styles.row1}>
                                        <View style={{ flex: 0.5, flexDirection: 'column', justifyContent: 'center' }}>
                                            <View style={{ alignSelf: 'center' }}>
                                                <Image source={require('../../assets/icon.png')} style={{ width: 200, height: 200, resizeMode: 'center' }} />
                                            </View>
                                            <View style={{alignContent:'center', alignItems:'center', justifyContent: 'center',}}>
                                                <Text style={{fontSize:40, color:'#9368e9', fontWeight:'bold'}}>Artiso</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.row2}>
                                        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', paddingLeft: 15, paddingRight: 15 }}>
                                            <View style={{ flex: 0.25, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10,height:40 }}>
                                                <View style={{ flex: 0.95, flexDirecction: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', backgroundColor: 'rgb(241,243,242)', borderRadius: 4 }}>
                                                        <View style={{ alignSelf: 'center', paddingLeft: 2, marginLeft: 4 }}>
                                                            <UserIcon name="user" color="rgb(113,117,128)" size={18} />
                                                        </View>
                                                        <View style={{ flex: 1, flexDirection: 'row', paddingLeft: 8, alignSelf: 'center' }}>
                                                            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                                                                <TextInput placeholderTextColor="rgb(113,117,128)" style={styles.email} placeholder="Enter username" onChangeText={(username_phone) => this.setState({ username_phone })} autoCapitalize="none"/>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={{ flex: 0.25, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10,height:40 }}>
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
                                        </View>
                                    </View>
                                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('ForgotPassword')}>
                                                <View style={{flex: 0.25, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10,height:40}}>
                                                <View style={{ flex: 0.9, flexDirecction: 'column', justifyContent: 'flex-start', alignItems: 'flex-start',marginLeft:10}}>
                                                    <Text style={{}}>
                                                        Forget Password?
                                                    </Text>
                                                </View>
                                                </View>
                                            </TouchableOpacity>
                                    <View style={styles.row3}>
                                        {
                                            (this.state.username_phone ==='' && this.state.password ==='') ?
                                                (<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }} >
                                                        <View style={{ flex: 0.9, flexDirection: 'row', justifyContent: 'center', borderRadius: 4, backgroundColor: "rgba(147,104,233,0.6)",height:50}} >
                                                            <View style={{ flex: 1, flexDirection: 'column', alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                                                                <Text style={{ alignSelf: 'center', fontSize: 19, color: '#fff', }}>Log In</Text>
                                                            </View>
                                                        </View>
                                                </View>) :
                                                (
                                                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }} >
                                                        <TouchableOpacity onPress={this.login} >
                                                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', borderRadius: 4, elevation: 3, backgroundColor: "#9368e9" ,height:50}} >
                                                                <View style={{ flexDirection: 'column', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', width:Dimensions.get('window').width-30 }}>
                                                                    <Text style={{ alignSelf: 'center', fontSize: 19, color: '#fff', }}>Log In</Text>
                                                                </View>
                                                            </View>
                                                        </TouchableOpacity>
                                                    </View>
                                                )
                                        }

                                    </View>
                                    <View style={styles.row5}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUp')}>
                                            <Text style={{ alignSelf: 'center', fontSize: 15, color: '#000',}}>New user? Click here to signup.</Text>
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
        marginTop: 55,
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