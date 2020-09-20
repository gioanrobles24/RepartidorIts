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
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {Icon, Avatar, Badge, withBadge} from 'react-native-elements';
import {AirbnbRating, Rating} from 'react-native-ratings';
import {Card} from 'react-native-elements';
import {green} from '../colors';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from 'react-native-table-component';
import {config} from '../config';
const image = require('../assets/money.png');
export default class HistorialMensualView extends Component {
  constructor(props) {
    super(props);
    console.log('id de socio' + this.props.data);
    let socioid = this.props.data;
    this.state = {
      ganancia: '0',
      historial: '',
    };
    fetch(`${config.apiUrl}/ganacia_repartidor_mensual/${socioid}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(
        //   'hola otra vez' + JSON.stringify(responseData.response.historial),
        );
        if (responseData.response === undefined) {
          alert('Aun no tienes datos para consultar');
        } else if (responseData.response.status === '200') {
          this.data = responseData.response;
          //   this.percent_bs = responseData.response.porcentaje_bs;
          this.setState(
            {
              ganancia: responseData.response.ganancia,
              historial: responseData.response.historial,
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
    const total_ganancia = this.state.ganancia;
    const historial = this.state.historial;
    const ord_ID = [];
    const fecha = [];
    const ganancia = [];
    console.log('LENGTH', historial);
    for (let i = 0; i < historial.length; i++) {
      console.log(historial[i].sum);
      ord_ID.push(historial[i].id);
      fecha.push(historial[i].fecha);
      ganancia.push(historial[i].sum);
    }
    return (
      <View style={styles.container}>
        <View style={styles.headers}>
          <Text style={styles.Title}>Historial del mes</Text>
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
            <Text style={{color: 'gray', fontSize: 15}}>Total generado en el mes</Text>
          </View>
        </View>
        <SafeAreaView
          style={styles.safeContainer}
          automaticallyAdjustContentInsets={true}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.containerResumen}>
                    <View style={styles.containerTable}>
                        <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                        <Row
                            data={['Orden', 'Fecha', 'Monto']}
                            style={styles.HeadStyle}
                            textStyle={styles.TableTextHead}
                        />
                        </Table>
                        <Table borderStyle={styles.tableStyle}>
                        <Cols
                            data={[ord_ID, fecha, ganancia]}
                            textStyle={styles.TableTextData}
                        />
                        </Table>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
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
    flex: 0.1,
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
    flex: 0.2,
    flexDirection: 'row',
  },
  titleMount: {
    flexDirection: 'column',
    marginStart: 20,
    marginTop: 5,
  },
  nota: {
    flexDirection: 'row',
    paddingBottom: 10,
  },
  safeContainer: {
    flex: 1,
  },
  scrollView: {
    // paddingVertical: 40,
    paddingHorizontal: 10,
  },
  rowTable: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  containerTable: {
    flex: 1,
    // padding: 6,
    // paddingTop: 35,
    marginTop: 10,
    backgroundColor: '#ffffff',
  },
  HeadStyle: {
    height: 50,
    // width: 389,
    alignContent: 'center',
  },
  TableTextHead: {
    alignContent: 'center',
    // width: 500,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TableTextData: {
    height: 50,
    padding: 5,
    justifyContent: 'center',
    // width: 500,
    // margin: 10,
    // flexDirection: 'row',
    // padding: 5,
    //   borderWidth:1
  },
  tableStyle: {
    borderWidth: 1,
    borderColor: 'gray',
  },
});
