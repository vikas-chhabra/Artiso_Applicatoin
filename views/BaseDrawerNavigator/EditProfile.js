import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, ImageBackground, TouchableOpacity, AsyncStorage, TextInput, Image, Alert, Animated, Share } from 'react-native';
import MyIcon from '@expo/vector-icons/Feather'
import { Container, Header, Content, Form, Item, Input, Label, Button, Left, Icon, Right, } from 'native-base';
import { Constants, ImagePicker, Permissions } from 'expo';
import Fetch from '../../helper/Fetch';
import 'whatwg-fetch';

export default class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            uploading: false,
            name: '.',
            updatedFullName:'',
            token:'',
        };
    }

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 4],
        });

        if (!result.cancelled) {
            this.setState({ image: result.uri },()=>{
                let uploadResponse, uploadResult;
                try {
                    let uriParts = result.uri.split('.');
                    let fileType = uriParts[uriParts.length - 1];
                    let formData = new FormData();
                    formData.append('profile_picture', {
                        uri:result.uri,
                        name: `profile-.${fileType}`,
                        type: `image/${fileType}`,
                    });

                    let options = {
                        method: 'POST',
                        body: formData,
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'multipart/form-data',
                            'Authorization': `Bearer ${this.state.token}`
                        },
                    };  
                    let res=fetch('http://192.168.43.67:3002/member/update-profile-picture',options);
                    res.then((res)=>{
                        return res.json()
                    }) 
                    .then((res)=>{
                        if(res.response===true){
                            Alert.alert("Picture is updated")
                        }
                        else{
                            Alert.alert(res.msg)
                        }
                    })
                    
                } catch (error) {
                 console.log(error)   
                }
            });
        }
    };
    updateFullName=()=>{
        Fetch.post('member/update-full-name',{full_name:this.state.updatedFullName},this.state.token).then(res=>{
            if(res.response===true){
                Alert.alert(res.msg);
                AsyncStorage.setItem('name',this.state.updatedFullName);
                this.setState({
                    name:this.state.updatedFullName
                });
                this.props.navigation.navigate('DashboardEnthusiast')
            }
            else{
                Alert.alert(res.msg)
            }
        })
    }
    getProfileInfo=(token)=>{
        Fetch.post('member/get-profile-info', {}, this.state.token).then(res => {
            if(res.response===true){
                this.setState({
                    image:'http://192.168.43.67:3002/'+res.member.profile_picture
                })
            }
          })
    }
    getPermisions = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        const token = await AsyncStorage.getItem('token');
        this.setState({
            token:token
        },()=>{
            this.getProfileInfo(token);
        })
        const name = await AsyncStorage.getItem('name');
        this.setState({
            name: name
        })
    }

    
    componentWillMount() {
        this.getPermisions();
    }

    render() {

        return (
            <Container>
                <Header style={{ backgroundColor: '#9368e9' }}>
                    <StatusBar hidden={false} backgroundColor="#9368e9" barStyle='light-content' />
                    <Left>
                        <View style={{ flexDirection: 'row' }}>
                            <Button transparent onPress={() => { this.props.navigation.navigate('DashboardEnthusiast') }}>
                                <MyIcon name='x' style={{ color: '#fff', fontSize: 25 }} />
                            </Button>
                        </View>
                    </Left>
                    <Right>
                        <Button transparent onPress={() => { this.props.navigation.toggleDrawer() }}>
                            <Text style={{ color: '#fff', fontSize: 20 }}>Done</Text>
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <View >
                        <View style={{ flex: 1, flexDirection: 'row', height: 30, justifyContent: 'center', marginTop: 5 }}>
                            <View style={{ flex: 0.93, flexDirection: 'column', alignSelf: 'center' }}>
                                <Text style={{ fontSize: 23, color: '#000', fontWeight: '400' }}>Edit your profile</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', height: 100, justifyContent: 'center', marginTop: 20 }}>
                            <View style={{ flex: 0.93, flexDirection: 'column', alignSelf: 'center' }}>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>

                                    {
                                        this.state.image === null ? (
                                            <View style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: 'rgb(214,215,216)', justifyContent: 'center', alignItems: 'center', }}>
                                                <Text style={{ fontSize: 50, color: '#000', alignSelf: 'center' }}>{this.state.name.substr(0, 1)}</Text>
                                            </View>
                                        ) : (
                                                <View style={{ width: 120, height: 120, borderRadius: 60, }}>
                                                    <Image source={{ uri: this.state.image }} style={{ width: 100, height: 100, borderRadius: 50, resizeMode: 'cover' }} />
                                                </View>
                                            )
                                    }

                                    <TouchableOpacity style={{ alignSelf: 'center' }} onPress={this._pickImage}>
                                        <View style={{ width: 160, height: 50, justifyContent: 'center', alignSelf: 'center', marginLeft: 15, backgroundColor: '#eee', borderRadius: 10 }}>
                                            <Text style={{ fontSize: 16, color: '#936e89', alignSelf: 'center' }}>Choose an image</Text>
                                        </View>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        </View>

                        <Form>
                            <Item floatingLabel>
                                <Label>{this.state.name}</Label>
                                <Input onChangeText={(text)=>{this.setState({updatedFullName:text})}}/>
                            </Item>
                            <TouchableOpacity style={{ alignSelf: 'center' }} onPress={(e)=>{this.updateFullName()}}>
                                <View style={{ width: 160, height: 40, justifyContent: 'center', alignSelf: 'center', marginLeft: 15, backgroundColor: '#936e89', borderRadius: 10 , marginTop:20 }}>
                                    <Text style={{ fontSize: 16, color: '#000', alignSelf: 'center', }}>Update Your Name</Text>
                                </View>
                            </TouchableOpacity>
                        </Form>
                    </View>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff'
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
        height: 200,
        marginTop: 15,
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
    },
    exampleText: {
        fontSize: 20,
        marginBottom: 20,
        marginHorizontal: 15,
        textAlign: 'center',
    },
    maybeRenderUploading: {
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
    },
    maybeRenderContainer: {
        borderRadius: 3,
        elevation: 2,
        marginTop: 30,
        shadowColor: 'rgba(0,0,0,1)',
        shadowOpacity: 0.2,
        shadowOffset: {
            height: 4,
            width: 4,
        },
        shadowRadius: 5,
        width: 250,
    },
    maybeRenderImageContainer: {
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        overflow: 'hidden',
    },
    maybeRenderImage: {
        height: 250,
        width: 250,
    },
    maybeRenderImageText: {
        paddingHorizontal: 10,
        paddingVertical: 10,
    }
})