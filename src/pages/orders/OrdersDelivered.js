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
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Card} from 'react-native-shadow-cards';
import {Icon, Avatar, Badge, withBadge} from 'react-native-elements';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from 'react-native-underline-tabbar';

export default class OrdersDeliveredView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      orders: [],
    };

    console.log('hola aca', this.props.dm_id);
    let dm_id = this.props.dm_id;

    fetch(
      'http://test.itsontheway.com.ve/api/delivery/orders_delivered/' + dm_id,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        if (responseData.response.status === '200') {
          this.setState(
            {
              orders: responseData.response.ordersDelivered,
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

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.Title}>Ordenes entregadas</Text>
        </View>

        <View style={styles.cardOrdercontainer}>
          <ScrollView>
            {this.state.orders.map((Object) => (
              <TouchableHighlight
                activeOpacity={0.6}
                underlayColor="transparent">
                <Card style={styles.cardOrder}>
                  <Text style={styles.cardOrderSubTitle}>
                    Orden #:{Object.id}
                  </Text>
                  <Badge
                    containerStyle={styles.cardBadge}
                    value="Entregada"
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
  containerTab: {
    flex: 0.5,
    paddingTop: 20,
    fontSize: 30,
  },
  tabLabel: {},
  containerTabTitle: {
    fontSize: 50,
  },
  cardOrder: {
    marginTop: 50,
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
const newScreen = () => Actions.orderDeliveryShow();
const Page = ({label}) => (
  <View>
    <Text style={styles.tabLabel}>{label}</Text>
    <View>
      <Card style={styles.cardOrder}>
        <Avatar
          rounded
          size="medium"
          source={{
            uri:
              'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
          }}
          onPress={newScreen}
        />
        <Text style={styles.cardOrderSubTitle} h3 onPress={newScreen}>
          Nombre pedido
        </Text>
        <Badge
          containerStyle={{alignSelf: 'center', marginLeft: 30}}
          value="Entregado"
          onPress={newScreen}
          status="success"
        />
      </Card>
    </View>
  </View>
);
