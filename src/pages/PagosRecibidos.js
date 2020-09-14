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
import { Icon, Avatar, Badge, withBadge } from 'react-native-elements';
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
const image = require('../assets/money.png' );
export default class PagosRecibidosView extends Component {
  constructor(props) {
    super(props);
    console.log('id de socio' + this.props.data);
    let socioid = this.props.data;
    this.state = {
      data: '0',
      historial: '',
    };
    fetch(`${config.apiUrl}/pagos_recibidos/${socioid}`, {
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
              data: responseData.response.data,
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
    const data = this.state.data;
    const ord_ID = [];
    const fecha = [];
    const ganancia = [];
    console.log("LENGTH", data)
    for (let i = 0; i < data.length; i++) {
        ord_ID.push(data[i].id);
        fecha.push(data[i].fecha);
        ganancia.push(data[i].dm_pay_amount);
    }
    return (
      <View style={styles.container}>
        <View style={styles.headers}>
          <Text style={styles.Title}>Pagos recibidos</Text>
        </View>
        <SafeAreaView
          style={styles.safeContainer}
          automaticallyAdjustContentInsets={true}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.containerResumen}>
              <View style={styles.containerTable}>
                <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                  <Row
                    data={['Nº de Pago', 'Fecha', 'Pagado']}
                    style={styles.HeadStyle}
                    textStyle={styles.TableTextHead}
                  />
                  {/* <Row
                    data={[ord_ID, fecha, ganancia]}
                    style={styles.head}
                    textStyle={styles.text}
                  /> */}
                </Table>
                <Table borderStyle={styles.tableStyle}>
                  <Cols
                    data={[ord_ID, fecha, ganancia]}
                    textStyle={styles.TableTextData}
                  />
                </Table>
                {/* <Row
                  data={state.tableHead}
                  style={styles.head}
                  textStyle={styles.text}
                />
                <Rows data={state.tableData} textStyle={styles.text} /> */}
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
