import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Left, Right, Button, Icon, Body, Title, Picker } from 'native-base';
import { StatusBar, Text, View, Dimensions, TouchableOpacity, AsyncStorage, Image } from 'react-native'
import { ImagePicker, Permissions } from 'expo';
import Fetch from '../../helper/Fetch';

export default class FloatingLabelExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      descritption: '',
      image: null,
      price: null,
      token: '',
      selected2:'',
      categories:[]
    }
  }
  getPermisions = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const token = await AsyncStorage.getItem('token');
    this.setState({
      token: token
    })
    this.getCategories(token);
  }
  onValueChange2(value) {
    this.setState({
      selected2: value
    });
  }
  getCategories=(token)=>{
    Fetch.post('category/get', {}, token).then(res => {
      if (res.response) {
          this.setState({
              categories: res.categories
          })
      }
      else {
          Alert.alert(res.msg);
      }
  })
  }
  // submit = () => {
  //       console.log('called')
  //       console.log(this.state.image)
  //       let uriParts = this.state.image.uri.split('.');
  //       let fileType = uriParts[uriParts.length - 1];

  //       let formData = new FormData();
  //       debugger;

  //       formData.append('file', {
  //         uri: this.state.image.uri,
  //         name: `profile-.${fileType}`,
  //         type: `image/${fileType}`,
  //       });
        
  //       formData.append('type','image')
  //       formData.append('title', this.state.title);
  //       formData.append('description', this.state.descritption);
  //       formData.append('price', this.state.price)
  //       formData.append('category_id',this.state.selected2)

  //       let options = {
  //         method: 'POST',
  //         body: formData,
  //         headers: {
  //           Accept: 'application/json',
  //           'Content-Type': 'multipart/form-data',
  //           'Authorization': `Bearer ${this.state.token}`
  //         },
  //       };
  //       let res = fetch('http://192.168.43.67:3002/post/save/', options);
  //       res.then((res) => {
  //         return res.json()
  //       })
  //         .then((res) => {
  //           console.log(res,'it is my post');
  //         })
  //         .catch(err=>{
  //           console.log("Error occured",)
  //         })
  // }

  submit=()=>{
    try {
                let uriParts = this.state.image.split('.');
                let fileType = uriParts[uriParts.length - 1];
                let formData = new FormData();
                formData.append('file', {
                    uri:this.state.image,
                    name: `profile-.${fileType}`,
                    type: `image/${fileType}`,
                });
                formData.append('title', this.state.title);
                formData.append('description', this.state.descritption);
                formData.append('type','image');
                formData.append('price', this.state.price);
                formData.append('category_id', this.state.selected2)
                let options = {
                    method: 'POST',
                    body: formData,
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${this.state.token}`
                    },
                };  
                let res=fetch('http://192.168.43.67:3002/post/save/',options);
                res.then((res)=>{
                    return res.json()
                }) 
                .then((res)=>{
                    if(res.response===true){
                    this.props.navigation.navigate('DashboardEnthusiast')
                    }
                })
                
            } catch (error) {
             console.log(error)   
            }
  }
  componentWillMount() {
    this.getPermisions();
  }
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 4],
    });

    if (!result.cancelled) {
        this.setState({ image: result.uri },()=>{
            // let uploadResponse, uploadResult;
            // try {
            //     let uriParts = result.uri.split('.');
            //     let fileType = uriParts[uriParts.length - 1];
            //     let formData = new FormData();
            //     formData.append('file', {
            //         uri:result.uri,
            //         name: `profile-.${fileType}`,
            //         type: `image/${fileType}`,
            //     });
            //     formData.append('title', this.state.title);
            //     formData.append('description', this.state.descritption);
            //     formData.append('type','image');
            //     formData.append('price', this.state.price);
            //     formData.append('category_id', this.state.selected2)
            //     let options = {
            //         method: 'POST',
            //         body: formData,
            //         headers: {
            //             Accept: 'application/json',
            //             'Content-Type': 'multipart/form-data',
            //             'Authorization': `Bearer ${this.state.token}`
            //         },
            //     };  
            //     let res=fetch('http://192.168.43.67:3002/post/save/',options);
            //     res.then((res)=>{
            //         return res.json()
            //     }) 
            //     .then((res)=>{
            //         console.log(res);
            //     })
                
            // } catch (error) {
            //  console.log(error)   
            // }
        });
    }
};
  // _pickImage = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     allowsEditing: true,
  //     aspect: [4, 4],
  //   });
  //   if (!result.cancelled) {
  //     this.setState({ image: result });
  //   }
  // }
  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: '#9368e9' }}>
          <Left>
            <Button transparent>
              <Icon name='md-add' style={{ color: "#fff" }} />
              <Title style={{ color: '#fff', paddingLeft: 15 }}>Add Post</Title>
            </Button>
          </Left>
          <Right>
            <Button transparent onPress={(e) => { this.props.navigation.toggleDrawer() }}>
              <Icon name='menu' style={{ color: '#fff' }} />
            </Button>
          </Right>
        </Header>
        <StatusBar hidden={false} backgroundColor="#9368e9" barStyle='light-content' />
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Title</Label>
              <Input onChangeText={(text) => { this.setState({ title: text }) }} />
            </Item>
            <Item floatingLabel last>
              <Label>Description</Label>
              <Input onChangeText={(text) => { this.setState({ descritption: text }) }} />
            </Item>
            <Item floatingLabel last>
              <Label>Price</Label>
              <Input keyboardType="numeric" onChangeText={(price) => { this.setState({ price: price }) }} />
            </Item>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', marginTop:20 }}>

              {
                this.state.image === null ? (
                  <View></View>
                ) : (
                    <View style={{ width: 120, height: 120, borderRadius: 60, marginLeft:17}}>
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
            <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder="Select category"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.selected2}
                onValueChange={this.onValueChange2.bind(this)}
                style={{marginTop:20}}
              >
              {
                this.state.categories.map((v,i)=>{
                  return(
                    <Picker.Item label={v.category_name} value={v._id} key={i}/>
                  )
                })
              }
              </Picker>
          </Form>
          <TouchableOpacity >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: Dimensions.get('window').width, flexDirection: 'column', }}>
              <Button style={{ padding: 20, alignSelf: 'center', marginTop: 20, width: Dimensions.get('window').width - 20, alignItems: 'center', justifyContent: 'center', backgroundColor: '#8055e3' }} onPress={this.submit }><Text style={{ alignSelf: 'center', color: '#fff' }}> Submit </Text></Button>
            </View>
          </TouchableOpacity>

        </Content>
      </Container>
    );
  }
}