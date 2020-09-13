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
} from 'react-native';
import { Icon, Avatar, Badge, withBadge } from 'react-native-elements';
import {AirbnbRating, Rating} from 'react-native-ratings';
import {Card} from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { green } from '../colors';
import { config } from '../config';
const image = require('../assets/money.png');
export default class PagosAcumuladosView extends Component {
    constructor(props) {
        super(props);
        console.log('id de socio' + this.props.data);
        let socioid = this.props.data;
        this.state = {
          monto: '0',
          historial: '',
        };
        fetch(
          `${config.apiUrl}/ganacia_repartidor_mensual/${socioid}`,
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
            console
              .log(
              'hola otra vez' + JSON.stringify(responseData),
            );
            if (responseData.response === undefined) {
              alert('Aun no tienes datos para consultar');
            } else if (responseData.response.status === '200') {
              this.data = responseData.response;
              //   this.percent_bs = responseData.response.porcentaje_bs;
              this.setState(
                {
                  monto: responseData.response.ganancia,
                },
                () => {
                  console
                    .log
                    // 'products' + JSON.stringify(this.state.historial.historial),
                    ();
                },
              );
            }
          })
          .catch((error) => {
            console.error(error);
          });
    }
    render() {
        const total_ganancia = this.state.monto;
        return (
            <View style={styles.container}>
                <View style={styles.headers}>
                    <Text style={styles.Title}>Acumulado por pagar</Text>
                </View>
                <View style={styles.contentPorcentaje}>
                    <View style={styles.imgeAvatar}>
                        <Avatar
                        overlayContainerStyle={{backgroundColor: 'transparent'}}
                        containerStyle={{
                            elevation: 6,
                            backgroundColor: 'white',
                            marginStart: 12,
                            width: 68,
                            height: 68,
                        }}
                        source={image}
                        />
                    </View>
                    <View style={styles.titleMount}>
                        <View style={styles.nota}>
                        <Text style={{color: green, fontSize: 22, fontWeight: '700'}}>
                            Bs
                        </Text>
                        <Text
                            style={{
                            color: 'black',
                            fontSize: 21,
                            fontWeight: '600',
                            marginLeft: 8,
                            }}>
                            {total_ganancia}
                        </Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // flexDirection: 'column',
    },
    headers: {
        flex: 0.4,
        fontSize: 28,
        flexDirection: 'row',
        alignItems: 'center',
        color: '#a9d046',
        justifyContent: 'center',
    },
    Title: {
        fontSize: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#373535',
        // marginTop:40
    },
    contentPorcentaje: {
        flex: 0.1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent:'center'
    },
    titleMount: {
        flexDirection: 'column',
        marginStart: 20,
        marginTop: 15,
    },
    nota: {
        flexDirection: 'row',
        paddingBottom: 10,
    },
});
