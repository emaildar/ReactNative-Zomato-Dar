import React, {Component} from 'react'
import { Image } from 'react-native';
import { Container, Header, Card, CardItem, Left, Text, Body, Right, Content, Icon, Button, Item, Input, Spinner, Thumbnail } from 'native-base';
import axios from 'axios';

class App extends Component {

  state = {
    key: "e6c87f4cb53b316348e44b9c4cc2499f",
    cari: "",
    restoran: "",
    loadData: false
  }

  klikCari = () => {
    this.setState({
      loadData: true
    });
    var url = `https://developers.zomato.com/api/v2.1/search?q=${this.state.cari}`
    var config = {
      headers: { 'user-key': `${this.state.key}` }
    }
    axios.get(url, config).then((x) => {
      if (x.data.restaurants.length > 0) {
        this.setState({
          restoran: x.data.restaurants,
          loadData: false
        })
      }else {
        this.setState({
          loadData: false,
          restoran: ""
        })
      }
    })
  }

  hasilCari() {
    return this.state.restoran.map((val, i) => {
      return (
        <Card style={{ flex: 0, alignSelf: "center", marginTop: 15, width: 330 }} key={i}>
          <CardItem bordered>
            <Left>
              <Thumbnail style={{ maxWidth: 35, maxHeight: 35 }} square source={{ uri: val.restaurant.thumb ? val.restaurant.thumb : 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Square_zomato_logo_new.png' }} />
              <Body>
                <Text>{val.restaurant.name}</Text>
                <Text note>{val.restaurant.location.city}</Text>
              </Body>
            </Left>
            <Right>
              <Text>Rp {(parseInt(val.restaurant.average_cost_for_two) / 2).toLocaleString()}</Text>
            </Right>
          </CardItem>
          <CardItem bordered>
            <Body>
              {val.restaurant.thumb ?
                <Image source={{ uri: val.restaurant.thumb }} style={{ height: 200, width: "100%", flex: 1 }} />
                : <Image source={require('./img/zomato2.jpg')} style={{ height: 200, width: "100%", flex: 1 }} />}
            </Body>
          </CardItem>
          <CardItem bordered>
            <Left>
              <Icon name="pin" />
              <Text>{val.restaurant.location.address}</Text>
            </Left>
          </CardItem>
        </Card>
      )
    })
  }
  render() {
    return (
      <Container>
        <Header searchBar style={{backgroundColor: 'red'}} rounded >
          <Item>
            <Icon name="search" />
            <Input placeholder="Cari menu makanan..." onChangeText={(x) => {
              this.setState({
                cari: x
              })
            }}></Input>
          </Item>
        </Header>
        <Button style={{backgroundColor: 'red'}} full onPress={this.klikCari}>
          <Text>LIHAT DAFTAR RESTO</Text>
        </Button>
        <Content style={{ flexDirection: 'column', backgroundColor: 'pink' }}>
          {this.state.loadData ? <Spinner color='blue' /> : this.state.restoran ? this.hasilCari() : <Text></Text>}
        </Content>
      </Container>
    )
  }
}

export default App;