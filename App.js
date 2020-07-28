import React, {Component} from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import {store} from './src/redux/store';
import {Routes} from './src/Routes';
import {Provider} from 'react-redux';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Provider store={store}>
          <Routes />
        </Provider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
