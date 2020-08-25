import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {AirbnbRating, Rating} from 'react-native-ratings';
import {Badge, Avatar} from 'react-native-elements';
import {Card} from 'react-native-shadow-cards';
import {config} from '../../config';
import request from '../../utils/request';
import {green} from '../../colors';
const image = {uri: `${config.apiUrl}/imgVerdePerfil`};

export default class CurrentOrderView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
    };
  }

  fetchOrders() {
    let dm_id = this.props.dm_id;
    console.log('ird dm_id' + dm_id);
    request(`${config.apiUrl}/delivery/current_orders/${dm_id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((responseData) => {
        console.log(responseData);
        if (responseData.status === '200') {
          this.setState(
            {
              orders: responseData.response.orders,
            },
            () => {
              console.log('ORDEN' + JSON.stringify(this.state.order));
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

  componentDidMount() {
    this.fetchOrders();
    this.interval = setInterval(() => this.fetchOrders(), 30000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  ratingCompleted(rating) {
    console.log('${rating}');
  }

  orderCurrentViewPartner(id) {
    let ord_id = id;
    Actions.CurrentsOrdersDetailView({dm_id, ord_id});
  }

  render() {
    // for (let Object of this.state.data) {
    //         console.log(Object.prod_name);
    // }
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.Title}>Pedidos en curso</Text>
        </View>

        <View style={styles.cardOrdercontainer}>
          <ScrollView>
            {this.state.orders.map((Object) => (
              <TouchableHighlight
                activeOpacity={0.6}
                underlayColor="transparent"
                onPress={() => {
                  this.orderCurrentViewPartner(Object.id);
                }}>
                <Card style={styles.cardOrder}>
                  <Avatar rounded size="medium" source={image} />

                  <Text style={styles.cardOrderSubTitle} h3>
                    Orden #:{Object.id}
                  </Text>
                  <Badge
                    containerStyle={styles.cardBadge}
                    value={getStatus(Object.ord_status).label}
                    status={getStatus(Object.ord_status).color}
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

export function getStatus(id) {
  switch (id) {
    case '0':
      return {color: 'primary', label: 'Repartidor Asignado'};
    case '1':
      return {color: green, label: 'Sin Aprobar'};
    case '2':
      return {color: green, label: 'Aprobada por Admin'};
    case '3':
      return {color: green, label: 'Aprobada por Socio'};
    case '4':
      return {color: green, label: 'Entregada Cliente'};
    case '5':
      return {color: 'warning', label: `It's on the way`};
    case '6':
      return {color: 'success', label: 'Espera de Repartidor'};
    default:
      return {color: green, label: 'Desconocido'};
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
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

  menuText: {
    fontSize: 25,
    alignSelf: 'flex-end',
    color: '#373535',
  },
  partnerimage: {
    flex: 0.5,
  },
  Title: {
    fontSize: 28,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    color: '#373535',
    marginTop: 20,
  },
  SubTitle: {
    fontSize: 26,
    color: '#373535',
  },
  SubTitle2: {
    fontSize: 19,
    color: '#373535',
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
  info: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 40,
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 270,
    borderRadius: 5,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    marginLeft: 50,
    shadowOffset: {width: 1, height: 13},
  },
  loginButton: {
    backgroundColor: '#a9d046',
  },
  loginText: {
    fontFamily: 'QUICKSAND-LIGHT',
    color: 'white',
  },
});
