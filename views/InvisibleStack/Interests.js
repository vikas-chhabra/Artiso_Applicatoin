import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button, Icon } from 'native-base';
import { AsyncStorage, StatusBar, Alert } from 'react-native';
import Fetch from '../../helper/Fetch';
import {AppLoading, Font} from 'expo';

export default class Interests extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryRoute: 'category/get',
            categories: [],
            token: '',
            isReady:false
        };
    }
    getToken = async () => {
        console.log("FUnction called")
        const token = await AsyncStorage.getItem('token')
        this.getCategories(token)
    }
    getCategories = (token) => {
        Fetch.post(this.state.categoryRoute, {}, token).then(res => {
            console.log(res);
            if (res.response) {
                this.setState({
                    categories: res.categories
                })
            }
            else {
                console.log(res)
            }
        })
    }
    sendInterest=async (category_id)=>{
        console.log(category_id)
        const token = await AsyncStorage.getItem('token')
        Fetch.post('interest/toggle',{category_id:category_id},token).then(res=>{
            console.log(res);
            this.getCategories(token);
        })
    }
    async componentWillMount() {
        await Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        });
        this.setState({ isReady: true })
    }
    componentDidMount() {
        this.getToken();
    }
    render() {
        if(this.state.isReady){
        return (
            <Container>
                <Header style={{ backgroundColor: '#9368e9' }}>
                    <StatusBar hidden={false} backgroundColor="#9368e9" barStyle='light-content' />
                    <Left>
                        <Button transparent>
                            <Icon name='arrow-back' style={{ color: '#fff' }} />
                        </Button>
                    </Left>
                    <Body>
                        <Text>Categories</Text>
                    </Body>
                    <Right>
                        <Button transparent onPress={()=>{this.props.navigation.navigate('DashboardEnthusiast')}}>
                            <Icon name='menu' style={{ color: '#fff' }} />
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <List>
                        {
                            this.state.categories.map((v, i) => {
                                return (
                                    <ListItem thumbnail key={i}>
                                        <Left>
                                            <Thumbnail square source={{ uri: 'http://192.168.43.67:3002/' + v.category_poster }} />
                                        </Left>
                                        <Body>
                                            <Text>{v.category_name}</Text>
                                        </Body>
                                        <Right>
                                            {
                                                v.is_followed?(<Button onPress={()=>{this.sendInterest(v._id)}}>
                                                <Text>Followed</Text>
                                            </Button>):(
                                                <Button onPress={()=>{this.sendInterest(v._id)}} bordered>
                                                <Text>Follow</Text>
                                            </Button>
                                            )
                                            }
                                        </Right>
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                </Content>
            </Container>
        );
    }
    else{
        return(
        <AppLoading/>
        )
    }
}
}