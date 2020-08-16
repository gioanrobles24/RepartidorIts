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

export default class OrderView extends Component {
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
    request(`${config.apiUrl}/partner/p_orders_order_detail/${ord_id}`)
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
              console.log('ORDEN' + JSON.stringify(this.state.order));
              console.log(
                'PRODUCTOS' + JSON.stringify(this.state.order_productos),
              );
            },
          );
        } else {
          throw new Error(responseData);
        }
      })
      .catch((error) => {
        Alert.alert('Error', 'intente nuevamente');
      });
  }

  ratingCompleted(rating) {
    console.log('${rating}');
  }
  acceptOrder() {
    Alert.alert(
      'Confirmas que puedes entregar este pedido?',
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
            fetch(`${config.apiUrl}/delivery/accept_order`, {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                ord_id: this.state.order.ord_id,
                dm_id: this.props.dm_id,
                ord_status: 0,
              }),
            })
              .then((response) => response.json())
              .then((responseData) => {
                console.log(responseData);
                if (responseData.error) {
                  throw new Error(responseData.error);
                } else {
                  Actions.pop({refresh: {key: 'todayOrders'}});
                }
              })
              .catch((error) => {
                Alert.alert('Error', 'intente nuevamente');
              });
          },
        },
      ],
      {cancelable: false},
    );
  }

  render() {
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
            containerStyle={{
              position: 'absolute',
              top: -30,
              right: 30,
              // backgroundColor: 'white',
            }}
          />
          <Text style={styles.Title} h1>
            Orden #: {this.state.order.ord_id}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'flex-start',
            marginLeft: 10,
          }}>
          <TouchableHighlight
            style={[styles.buttonContainer, styles.loginButton]}
            onPress={() => {
              this.acceptOrder();
            }}>
            <Text style={styles.loginText}>Aceptar pedido</Text>
          </TouchableHighlight>

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
            <View style={{width: 500}}>
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
