import { Header, Container, Content, Left, Button, Right, Icon } from 'native-base';
import { View, Text, StatusBar, AsyncStorage, Alert, TouchableOpacity, Dimensions } from 'react-native';
import React, { Component } from 'react'
import { DataTable } from 'react-native-paper';
import Fetch from '../../helper/Fetch';

export default class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emptyCart: false,
            cart: []
        }
    }
    sendToHome=()=>{
        Alert.alert("Thank You for Shopping With us!!");
        this.props.navigation.navigate('DashboardEnthusiast')
    }
    getCartDetails = (token) => {
        Fetch.post('cart/get/', {}, token).then(res => {
            if (res.response === true) {
                this.setState({
                    cart: res.cart_items,
                    emptyCart: false
                })
            }
            else {
                Alert.alert(res.msg);
                this.setState({
                    emptyCart: true
                })
                if (res.msg === 'Items not found!') {
                    this.props.navigation.navigate('DashboardEnthusiast')
                }
            }
        })
    }
    getToken = async () => {
        const token = await AsyncStorage.getItem('token')
        this.getCartDetails(token)
    }
    componentDidMount() {
        this.getToken();
    }
    render() {
        return (
            <Container>
                <Header style={{ backgroundColor: '#9368e9' }}>
                    <StatusBar hidden={false} backgroundColor="#9368e9" barStyle='light-content' />
                    <Left>
                        <View style={{ flexDirection: 'row' }}>
                            <Button transparent>
                                <Icon name='cart' style={{ color: '#fff' }} />
                            </Button>
                            <Text style={{ fontSize: 20, color: "#fff", alignSelf: 'center', fontWeight: 'bold' }}>Cart</Text>
                        </View>
                    </Left>
                    <Right>
                        <Button transparent onPress={() => { this.props.navigation.toggleDrawer() }}>
                            <Icon name='menu' style={{ color: '#fff' }} />
                        </Button>
                    </Right>
                </Header>
                <Content>
                    {
                        this.state.emptyCart ? (<View style={{ justifyContent:'center', alignSelf:'center', alignItems: 'center',}}><Text>Please Add Some Products to Your Cart!!!</Text></View>) : (
                            <DataTable>
                                <DataTable.Header>
                                    <DataTable.Title>Sno.</DataTable.Title>
                                    <DataTable.Title>Item</DataTable.Title>
                                    <DataTable.Title numeric>Qty</DataTable.Title>
                                    <DataTable.Title numeric>Price</DataTable.Title>
                                    <DataTable.Title numeric>Amount</DataTable.Title>
                                </DataTable.Header>

                                {
                                    this.state.cart.map((v,i)=>{
                                        return(
                                            <DataTable.Row key={i}>
                                    <DataTable.Cell>{i+1}</DataTable.Cell>
                                    <DataTable.Cell numeric>{v.post.title}</DataTable.Cell>
                                    <DataTable.Cell numeric>1</DataTable.Cell>
                                    <DataTable.Cell numeric>{v.post.price}</DataTable.Cell>
                                    <DataTable.Cell numeric>{v.post.price}</DataTable.Cell>
                                    
                                </DataTable.Row>
                                        )
                                    })
                                }


                            </DataTable>)
                    }
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }} >
                                            <TouchableOpacity onPress={this.sendToHome} >
                                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', borderRadius: 4, elevation: 3, backgroundColor: "#9368e9", height: 50 }} >
                                                    <View style={{ flexDirection: 'column', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', width: Dimensions.get('window').width - 30 }}>
                                                        <Text style={{ alignSelf: 'center', fontSize: 19, color: '#fff', }}>Chekcout</Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                </Content>
            </Container>
        )
    }
}