import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Platform,
  StyleSheet,
  Button,
  TouchableHighlight,
  TouchableOpacity,
  Image,
} from 'react-native';
import {AirbnbRating} from 'react-native-ratings';
import {Actions} from 'react-native-router-flux';
import {SideMenu} from 'react-native-side-menu';
import MenuDrawer from 'react-native-side-drawer';
import {Card} from 'react-native-shadow-cards';
import {Icon, Avatar, Badge, withBadge} from 'react-native-elements';
import {config} from '../../config';
const image = {uri: 'http://dev.itsontheway.net/api/imgBlanca'};
export default class TodayOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      orders: [],
    };

    console.log('hola', this.props.dm_id);
    let dm_id = this.props.dm_id;

    fetch(`${config.apiUrl}/delivery/ords_to_repartidor`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        if (responseData.response.status === '200') {
          this.setState(
            {
              orders: responseData.response.aviable_orders,
            },
            () => {
              console.log('PRUEBAAAA' + this.state.orders);
            },
          );
        } else {
          alert('A ocurrido un problema por favor intenta nuevamente');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  orderViewPartner = (id) => {
    console.log('id orden', id);
    let ord_id = id;
    let dm_id = this.props.dm_id;
    Actions.orderView({dm_id, ord_id});
  };
  // productView = (Id,name,prod_price_bs) => {
  //         Actions.productviewPartner(Id)
  //     }

  toggleOpen = () => {
    this.setState({open: !this.state.open});
  };

  render() {
    // for (let Object of this.state.orders) {
    //          console.log(Object.prod_name);
    //  }

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.Title}>Pedidos del día</Text>
        </View>

        <View style={styles.cardOrdercontainer}>
          <ScrollView>
            {this.state.orders.map((Object) => (
              <TouchableHighlight
                activeOpacity={0.6}
                underlayColor="transparent"
                onPress={() => {
                  this.orderViewPartner(Object.id);
                }}>
                <Card
                  style={styles.cardOrder}
                  onPress={() => {
                    this.orderViewPartner(Object);
                  }}>
                  <Avatar rounded size="medium" source={image} />
                  <Text
                    style={styles.cardOrderSubTitle}
                    h3
                    onPress={() => {
                      this.orderViewPartner(Object);
                    }}>
                    Orden #:{Object.id}
                  </Text>
                  <Badge
                    containerStyle={styles.cardBadge}
                    value="Disponible"
                    status="primary"
                  />
                </Card>
              </TouchableHighlight>
            ))}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
  },
  Title: {
    fontSize: 30,
    color: '#373535',
    // marginTop: 5
    // alignItems: 'flex-start'
  },

  cardOrdercontainer: {
    flexDirection: 'row',
  },

  cardOrder: {
    marginTop: 30,
    padding: 20,
    margin: 20,
    flexDirection: 'row',
    elevation: 8,
  },
  cardOrderSubTitle: {
    fontSize: 20,
    marginLeft: 10,
    alignSelf: 'center',
  },

  cardBadge: {
    alignSelf: 'center',
  },
});
