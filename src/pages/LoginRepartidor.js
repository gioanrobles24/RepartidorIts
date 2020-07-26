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
  Switch,
  ToastAndroid,
  BackHandler,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Icon, Avatar, Badge, withBadge} from 'react-native-elements';
import {createStackNavigator} from 'react-navigation';

export default class LoginReparidorView extends Component {
  constructor(props) {
    super(props);
    this.toggleSwitch = this.toggleSwitch.bind(this);
    this.state = {
      showPassword: true,
      icon: 'visibility-off',
    };

    // BackHandler.addEventListener('hardwareBackPress', this.backAction)

    state = {
      email: '',
      password: '',
    };
  }

  backAction = () => {
    BackHandler.exitApp();
    return true;
  };

  // componentDidMount() {
  //       BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
  //   }

  // componentWillUnmount() {
  //     this.backHandler.remove();
  //   }

  toggleSwitch() {
    this.setState((prevState) => ({
      icon:
        prevState.icon === 'visibility-off' ? 'visibility' : 'visibility-off',
      showPassword: !this.state.showPassword,
    }));
  }
  onClickListener = (viewId) => {
    // alert( "Button pressed "+ 'correo:' +this.state.email+ 'password'+ this.state.password)

    fetch('http://test.itsontheway.com.ve/api/delivery/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dm_email: this.state.email,
        password: this.state.password,
      }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responsseData);
        if (responseData.error) {
          alert(
            'Usuario o contraseña incorrectos, por favor intenta nuevamente',
          );
        } else {
          Actions.homeRepartidor({responseData});
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.loginTitle} h1>
            Login
          </Text>
        </View>
        <View>
          <Text style={styles.loginSubTitle} h3>
            Inicie sesión para continuar
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="Correo"
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            onChangeText={(email) => this.setState({email})}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholderTextColor="gray"
            placeholder="Password"
            secureTextEntry={this.state.showPassword}
            onChangeText={(password) => this.setState({password})}
          />
          <Icon
            name={this.state.icon}
            onPress={() => this.toggleSwitch()}
            value={!this.state.showPassword}
          />
        </View>

        <View>
          <Text style={styles.reset} h5>
            ¿olvidó la clave?
          </Text>
        </View>

        <TouchableHighlight
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={() => {
            this.onClickListener('login');
          }}>
          <Text style={styles.loginText}>Ingresar</Text>
        </TouchableHighlight>

        <Avatar
          rounded
          size="xlarge"
          overlayContainerStyle={{backgroundColor: 'transparent'}}
          containerStyle={{
            alignSelf: 'center',
            flexDirection: 'column',
            marginTop: 20,
          }}
          source={{uri: 'http://dev.itsontheway.net/api/imgVerde'}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    fontFamily: 'QUICKSAND-LIGHT',
  },
  inputContainer: {
    borderBottomColor: '#bdbfc1',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 350,
    height: 55,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputs: {
    height: 50,
    marginLeft: 12,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center',
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
    shadowOffset: {width: 1, height: 13},
  },
  loginButton: {
    backgroundColor: '#a9d046',
  },
  loginText: {
    fontFamily: 'QUICKSAND-LIGHT',
    color: 'white',
  },

  loginTitle: {
    fontSize: 34,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#373535',
  },

  loginSubTitle: {
    fontSize: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    color: '#bdbfc1',
  },

  reset: {
    color: '#a9d046',
    height: 30,
    marginBottom: 35,
    fontSize: 16,
    flexDirection: 'row-reverse',
    alignSelf: 'flex-end',
    alignContent: 'flex-end',
    left: 72,
  },
});
