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
  Linking,
  Platform,
  Dimensions,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {AirbnbRating, Rating} from 'react-native-ratings';
import {Card, Badge, Icon} from 'react-native-elements';
import AutoHeightImage from 'react-native-auto-height-image';
import {config} from '../../config';
import request from '../../utils/request';
const image = {uri: 'http://dev.itsontheway.net/api/parnetBanner'};

export default class CurrentsOrdersDetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: '',
      order_productos: [],
      partner: {},
    };

    let ord_id = this.props.ord_id;
    let dm_id = this.props.dm_id;
    console.log('ird orden' + ord_id);
    console.log('ird dm_id' + dm_id);
    request(`${config.apiUrl}/delivery/orders_detail/${ord_id}`, {
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
              order: responseData.response.order,
              order_productos: responseData.response.order_productos,
              partner: responseData.response.order_partner,
            },
            () => {
              console.log(
                'ORDEN' + JSON.stringify(responseData.response.order),
              );
              console.log(
                'PRODUCTOS' + JSON.stringify(this.state.order_productos),
              );
              console.log(
                'PARTNER',
                JSON.stringify(responseData.response.order_partner),
              );
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

  ratingCompleted(rating) {
    console.log('${rating}');
  }

  recieveOrder() {
    Alert.alert(
      'Confirmas que has recibido este pedido?',
      'gracias por usar nuestras App',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'si',
          onPress: () => {
            request(`${config.apiUrl}/delivery/accept_order`, {
              method: 'POST',
              body: JSON.stringify({
                ord_id: this.state.order.ord_id,
                dm_id: this.props.dm_id,
                ord_status: 5,
              }),
            })
              .then((responseData) => {
                if (responseData.response.error) {
                  throw new Error(responseData.response.error);
                } else {
                  console.log(responseData);
                  request(`${config.pushUrl}/order-in-the-way`, {
                    method: 'POST',
                    body: JSON.stringify({clientId: this.state.order.cl_id}),
                  });
                  Actions.pop({refresh: {key: 'CurrentsOrdersView'}});
                }
              })
              .catch((error) => {
                Alert.alert('Error', error.message);
              });
          },
        },
      ],
      {cancelable: false},
    );
  }

  deliverOrden() {
    Alert.alert(
      'Confirmas que esta orden fue  entregada?',
      'gracias por usar nuestras App',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'si',
          onPress: () => {
            request(`${config.apiUrl}/delivery/order_was_delivered`, {
              method: 'POST',
              body: JSON.stringify({
                ord_id: this.state.order.ord_id,
                dm_id: this.props.dm_id,
              }),
            })
              .then((responseData) => {
                console.log(responseData);
                if (responseData.error) {
                  alert('a ocurrido un error, por favor intenta nuevamente');
                } else {
                  request(`${config.pushUrl}/order-delivered`, {
                    method: 'POST',
                    body: JSON.stringify({
                      partnerId: this.state.partner.p_id,
                      orderId: this.state.order.ord_id,
                    }),
                  });
                }
              })
              .then((resp) => {
                Actions.pop({refresh: {key: 'CurrentsOrdersView'}});
              })
              .catch((error) => {
                console.error(error);
              });
          },
        },
      ],
      {cancelable: false},
    );
  }

  render() {
    // for (let Object of this.state.data) {
    //         console.log(Object.prod_name);
    // }
    return (
      <View style={styles.container}>
        {this.state.partner && (
          <AutoHeightImage
            source={{
              uri: `${config.imagesUrl}/images/socios/${this.state.partner.p_id}/${this.state.partner.profile_pic}`,
            }}
            width={Dimensions.get('window').width}
          />
        )}
        <View>
          <View
            style={{
              position: 'absolute',
              top: -30,
              right: 30,
              flexDirection: 'row',
              // backgroundColor: 'white',
            }}>
            <Icon
              name="gps-fixed"
              raised
              onPress={() => {
                const scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
                const url =
                  scheme +
                  `${this.state.order.address_lat},${this.state.order.address_lon}?q=${this.state.order.address_lat},${this.state.order.address_lon}`;
                console.log(url);
                Linking.openURL(url);
              }}
            />
            <Icon
              name="phone"
              raised
              onPress={() => {
                const scheme = Platform.OS === 'ios' ? 'telprompt:' : 'tel:';
                Linking.openURL(scheme + this.state.order.cl_phone_1);
              }}
            />
          </View>

          <Text style={styles.Title} h1>
            Orden #: {this.state.order.ord_id}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: 10,
          }}>
          {(this.state.order.ord_status === '6' ||
            this.state.order.ord_status === '3') && (
            <TouchableHighlight
              style={[styles.buttonContainer, styles.loginButton]}
              onPress={() => {
                this.recieveOrder();
              }}>
              <Text style={styles.loginText}>Pedido en Camino</Text>
            </TouchableHighlight>
          )}

          {this.state.order.ord_status === '5' && (
            <TouchableHighlight
              style={[styles.buttonContainer, styles.loginButton]}
              onPress={() => {
                this.deliverOrden();
              }}>
              <Text style={styles.loginText}>Pedido Entregado</Text>
            </TouchableHighlight>
          )}

          <View style={{width: 300}}>
            <Text style={styles.SubTitle2} h1>
              Cliente:{this.state.order.cl_name}
            </Text>
          </View>
          <View style={{width: 300}}>
            <Text style={styles.subTitle} h1>
              Telefono:{this.state.order.cl_phone_1}
            </Text>
          </View>

          <View style={{width: 300}}>
            <Text style={styles.subTitle} h1>
              Descripción: {this.state.order.ord_description}
            </Text>
          </View>
          <ScrollView>
            <View>
              <Text style={styles.subTitle} h1>
                Dirección: {this.state.order.address_description},
                {this.state.order.municipio},{this.state.order.zone_name}
              </Text>
            </View>
            <View style={{width: 200}}>
              <Text style={styles.SubTitle2} h1>
                Productos:
              </Text>

              {this.state.order_productos.map((Object) => (
                <Text style={styles.subTitle} h1>
                  {Object.prod_name},
                </Text>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },

  menuText: {
    fontSize: 25,
    alignSelf: 'flex-end',
    color: '#373535',
  },
  cardBadge: {
    alignSelf: 'center',
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
