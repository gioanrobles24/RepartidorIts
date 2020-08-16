import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  BackHandler,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Icon, Avatar} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import {setUser} from '../redux/reducers/session';
import {connect} from 'react-redux';
import {config} from '../config';
import request from '../utils/request';

class LoginReparidorView extends Component {
  constructor(props) {
    super(props);
    this.toggleSwitch = this.toggleSwitch.bind(this);
    this.state = {
      showPassword: true,
      icon: 'visibility-off',
    };
  }

  backAction = () => {
    BackHandler.exitApp();
    return true;
  };

  toggleSwitch() {
    this.setState((prevState) => ({
      icon:
        prevState.icon === 'visibility-off' ? 'visibility' : 'visibility-off',
      showPassword: !this.state.showPassword,
    }));
  }
  onClickListener = (viewId) => {
    request(`${config.apiUrl}/delivery/login`, {
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
      .then((responseData) => {
        if (responseData.error) {
          throw responseData;
        } else {
          console.log(responseData);
          // return responseData;
          return request(`${config.pushUrl}/session`, {
            method: 'POST',
            body: JSON.stringify({
              userId: responseData.response.partner_info.id,
              token: this.props.pushToken,
              type: 'delivery',
            }),
          }).then(() => responseData);
        }
      })
      .then((resp) => {
        return AsyncStorage.setItem('session', JSON.stringify(resp)).then(
          () => resp,
        );
      })
      .then((resp) => {
        this.props.login(resp);
      })
      .catch((error) => {
        console.log(error);
        alert('Usuario o contraseña incorrectos, por favor intenta nuevamente');
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
const mapStateToProps = (state) => {
  return {
    pushToken: state.session.pushToken,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (user) => dispatch(setUser(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginReparidorView);

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
