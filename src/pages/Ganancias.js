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
export default class GananciasView extends Component {
    constructor(props) {
        super(props);
        console.log('id de socio' + this.props.data);
        let socioid = this.props.data;
    }
    GananciaSemanal = (viewId) => {
        Actions.gananciasSemanal(this.props.data);
    };
    HistorialMensual = (viewId) => {
        Actions.historialMensual(this.props.data);
    };
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headers}>
                    <Text style={styles.Title}>Indicadores</Text>
                </View>
                <View style={styles.MenubarContainer}>
                    <View style={styles.menubarItemContainer}>
                        <Text
                        style={styles.menubarItemText}
                        onPress={() => {
                            this.GananciaSemanal();
                        }}>
                        {' '}
                        Ganancias de la Semana
                        </Text>
                        <Icon
                        name="chevron-right"
                        type="evilicon"
                        color="#bdbfc1"
                        iconStyle={styles.menubarIconRight}
                        onPress={() => {
                            this.GananciaSemanal();
                        }}
                        />
                    </View>
                    <View style={styles.menubarItemContainer}>
                        <Text
                        style={styles.menubarItemText}
                        onPress={() => {
                            this.HistorialMensual();
                        }}>
                        {' '}
                        Historial del mes
                        </Text>
                        <Icon
                        name="chevron-right"
                        type="evilicon"
                        color="#bdbfc1"
                        iconStyle={styles.menubarIconRight}
                        onPress={() => {
                            this.HistorialMensual();
                        }}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headers: {
        flex: 0.2,
        fontSize: 28,
        flexDirection: 'row',
        alignItems: 'center',
        color: '#a9d046',
        justifyContent: "center"
    },
    Title: {
        fontSize: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#373535',
        // marginTop:40
    },
    MenubarContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0.2,
        marginLeft:20,
    },

    menubarItemContainer: {
        borderBottomColor: '#bdbfc1',
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        width: 400,
        height: 55,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    menubarItemText: {
        flex: 0.8,
        marginLeft: 12,
        justifyContent: 'center',
    },
    menubarIconLeft: {
        marginStart: 25,
    },
    menubarIconRight: {
        marginStart: 25,
    },
});
