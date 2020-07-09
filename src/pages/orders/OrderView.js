import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert,ImageBackground,ScrollView
} from 'react-native'
import { Actions } from 'react-native-router-flux';
import { AirbnbRating,Rating } from 'react-native-ratings'
import { Card,Badge } from 'react-native-elements';
const image = { uri: "http://dev.itsontheway.net/api/parnetBanner" }

export default class OrderView extends Component {
    constructor(props) {
       super(props);
       this.state = {
       	 order: '',
         order_productos: []
      }



      	 let ord_id = this.props.ord_id
         let dm_id = this.props.dm_id
      		console.log ('ird orden'+ord_id)
            console.log ('ird dm_id'+dm_id)
                    fetch('http://test.itsontheway.com.ve/api/delivery/orders_detail/'+ord_id, {
                  method: 'GET',
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                  },
              }).then((response) => response.json())
                   .then((responseData) => {
                     console.log(responseData)
                       if (responseData.status === "200" ){
                               this.setState({
                                      order: responseData.response.order,
                                      order_productos: responseData.response.order_productos
                                  },() => {
                                      console.log('ORDEN'+JSON.stringify(this.state.order));
                                       console.log('PRODUCTOS'+JSON.stringify(this.state.order_productos));
                                    });
                         }
                       else{
                           alert('A ocurrido un problema por favor intenta nuevamente')
                       }
            }).catch((error) =>{
              console.error(error);
            })



    }

    ratingCompleted( rating ) {
        console.log('${rating}');
    }
    acceptOrder() {
        console.log('hola');

         fetch('http://test.itsontheway.com.ve/api/delivery/accept_order', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ord_id: this.state.order.ord_id,
                dm_id: dm_id,
            })
        }).then((response) => response.json())
             .then((responseData) => {
               console.log(responseData)
                 if (responseData.error){
                     alert('a ocurrido un error, por favor intenta nuevamente')
                   }
                 else{

                          Alert.alert(
                            "Confirmas que puedes entregar este pedido?",
                            "gracias por usar nuestras App",
                            [
                              {
                                text: "Cancelar",
                                onPress: () => console.log("Cancel Pressed"),
                                style: "cancel"
                              },
                              { text: "si", onPress: () => Actions.pop({ refresh: {key: 'todayOrders' }})

                               }
                            ],
                            { cancelable: false }
                          );

                     
                 }
      }).catch((error) =>{
        console.error(error);
      })
    }





  render() {
      // for (let Object of this.state.data) {
      //         console.log(Object.prod_name);
      // }
    return (
      <View style={styles.container}>
      <Image
        style={styles.partnerimage}
        source={{
          uri: 'http://dev.itsontheway.net/api/parnetBanner1',
        }}
      />
          <Text style={styles.Title}  h1>Orden #: {this.state.order.ord_id}</Text>
            <View style={{
				        flex: 0.4,
				        flexDirection: 'column',
				        alignItems: 'flex-start',
                marginLeft: 10
				      }}>
                  

                          <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]}
                              onPress={() =>  {
                                    this.acceptOrder()}
                                  }
                                 >

                              <Text style={styles.loginText}>Aceptar pedido</Text>
                        </TouchableHighlight>



                      	<View style={{width: 300,}}>
                      		<Text style={styles.SubTitle2}  h1>Cliente:{this.state.order.cl_name}</Text>
                      	</View>
                        <View style={{width: 300}}>
                          <Text style={styles.subTitle}  h1>Telefono:{this.state.order.cl_phone_1}</Text>
                        </View>
                          
      						      <View style={{width: 300}}>
      	                	 		<Text style={styles.subTitle}  h1>Descripción: {this.state.order.ord_description}</Text>
      	                 </View>
                            <ScrollView>
            						        <View style={{width: 500}}>
            	                	 		<Text style={styles.subTitle}  h1>Dirección: {this.state.order.address_description},{this.state.order.municipio},{this.state.order.zone_name}</Text>
            	                	 </View>
                                 <View style={{width: 200}}>
                                          <Text style={styles.SubTitle2}  h1>Productos:</Text>

                                          {this.state.order_productos.map(Object =>
                                                <Text style={styles.subTitle}  h1>{Object.prod_name},</Text>
                                              )}
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
    fontSize : 25,
    alignSelf: 'flex-end',
    color: '#373535',
  },
  cardBadge:{
      alignSelf: 'center'
   },

   partnerimage: {
      flex:0.5,
     },
   Title: {
    fontSize: 28,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: "center",
    color : '#373535',
    marginTop: 20
  },
   SubTitle: {
    fontSize: 26,
    color : '#373535'
  },
  SubTitle2: {
    fontSize: 19,
    color : '#373535'
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
    alignItems: "center",
    marginTop: 40,
  },
    buttonContainer:  {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:270,
    borderRadius:5,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15 ,
    marginLeft: 50,
    shadowOffset : { width: 1, height: 13},
  },
  loginButton: {
    backgroundColor: "#a9d046",
  },
  loginText: {
    fontFamily: "QUICKSAND-LIGHT",
    color: 'white',
  },
});
