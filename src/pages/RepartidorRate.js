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
import {AirbnbRating, Rating} from 'react-native-ratings';
import {Card} from 'react-native-elements';
const image = {uri: 'http://dev.itsontheway.net/api/parnetBanner'};

export default class RepartidorRateView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    console.log('id de socio' + this.props.data);
    let socioid = this.props.data;
  }

  ratingCompleted(rating) {
    console.log('${rating}');
  }
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.partnerimage}
          source={{
            uri: 'http://dev.itsontheway.net/api/parnetBanner1',
          }}
        />
        <Text style={styles.Title} h1>
          {this.props.data}
        </Text>
        <View style={styles.rating}>
          <Rating
            onFinishRating={this.ratingCompleted}
            style={{
              paddingVertical: 10,
              flexDirection: 'row-reverse',
              shadowColor: 'blue',
            }}
            showRating
          />
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

  partnerimage: {
    flex: 0.6,
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
    fontSize: 20,
    flexDirection: 'row',
    marginTop: 50,
    alignSelf: 'center',
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
  rating: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
});
