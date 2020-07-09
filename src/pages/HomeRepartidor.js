import React, { Component } from 'react';
import {
  Text, View, ScrollView, SafeAreaView, Platform, StyleSheet,Button,
  TouchableHighlight,ToastAndroid,BackHandler, TouchableOpacity,ImageBackground,Image
} from 'react-native'
import { AirbnbRating } from 'react-native-ratings';
import { Actions } from 'react-native-router-flux';
import { SideMenu } from 'react-native-side-menu'
import  MenuDrawer from 'react-native-side-drawer'
import { Card } from 'react-native-shadow-cards';
import { Icon,Avatar,Badge,withBadge   } from 'react-native-elements'

  const image = { uri: "http://dev.itsontheway.net/api/imgVerde" }

export default class HomeRepartidorView extends Component {
     constructor(props) {
      super(props);
      console.log('esto llego a home'+this.props)
      this.state = {
        open: false,
        data: this.props.responseData.response.partner_info,
        profile_pic: this.props.responseData.response.partner_banner,
        doubleBackToExitPressedOnce: false
      }

      console.log('lleno la data?'+this.state.data.id)
      console.log('imagen'+this.state.profile_pic)

       if(this.state.doubleBackToExitPressedOnce) {
            BackHandler.exitApp();
          }
          ToastAndroid.show('Por favor vuelve a presionar para salir.', ToastAndroid.SHORT);
          this.setState({ doubleBackToExitPressedOnce: true });
          setTimeout(() => {
            this.setState({ doubleBackToExitPressedOnce: false });
          }, 2000);
          return true;




    }

      ratingCompleted( rating ) {
          console.log( `Rating is: ${rating}` );
      }
      handleBackButton = () => {
          if(this.state.doubleBackToExitPressedOnce) {
            BackHandler.exitApp();
          }
          ToastAndroid.show('Por favor vuelve a presionar para salir.', ToastAndroid.SHORT);
          this.setState({ doubleBackToExitPressedOnce: true });
          setTimeout(() => {
            this.setState({ doubleBackToExitPressedOnce: false });
          }, 2000);
          return true;
      }

      Logout = (viewId) => {
          Actions.loginpartner('cerrar sesión')
      }
      TodayOrders = (viewId) => {

          dm_id = this.state.data.id
          Actions.todayOrders({dm_id})
      }
      OrdersDelivered = (viewId) => {
          Actions.ordersDeliveredPartner(this.props.responseData.response.partner_info.id)
      }
     
      storeRateParter = (viewId) => {
          Actions.storeRateParter(this.props.responseData.response.partner_info.p_name)
      }




     toggleOpen = () => {
        this.setState({ open: !this.state.open });
     }
     drawerContent = () => {
        return (

          <View style={styles.animatedMenuBox}>
                            <TouchableOpacity onPress={this.toggleOpen}>
                               <Icon
                                    name='arrow-left'
                                    type='font-awesome'
                                    color='#a9d046'
                                    iconStyle={{marginLeft: 10, flexDirection:'column', alignSelf: 'flex-start', marginTop:20 }}
                                   />
                            </TouchableOpacity>
                        <View style={styles.ratecontainer}>
                                  <AirbnbRating isDisabled={true} showRating={false} defaultRating={4}   size={20}/>
                                    <Text style={{ color:'#bdbfc1'}}
                                      onPress={() =>   {
                                      this.storeRateParter()}
                                  }>Calificación:</Text>

                         </View>



                  <Text style={styles.animatedBoxTextSpecial}  h3>{this.state.data.dm_name}</Text>
                <View style={styles.MenubarContainer}>

                      <View style={styles.menubarItemContainer} >
                           <Icon
                                name='credit-card'
                                type='evilicon'
                                color='#bdbfc1'
                                iconStyle={styles.menubarIconLeft}
                                onPress={() =>   {
                                    this.storeRateParter()}
                                  }
                               />
                                <Text style={styles.menubarItemText} onPress={() =>   {
                                    this.storeRateParter()}
                                  } >Reputación</Text>
                            <Icon
                                name='chevron-right'
                                type='evilicon'
                                color='#bdbfc1'
                                iconStyle={styles.menubarIconRight}
                                onPress={() =>   {
                                    this.Produts()}
                                  }
                               />
                      </View>
                       <View style={styles.menubarItemContainer}>
                          <Icon
                                name='list-unordered'
                                type='octicon'
                                color='#bdbfc1'
                                iconStyle={styles.menubarIconRight}
                                onPress={() =>   {
                                    this.OrdersDelivered()}
                                  }
                               />

                                  <Text style={styles.menubarItemText} onPress={() =>   {
                                    this.OrdersDelivered()}
                                  }> Pedidos entregados</Text>
                            <Icon
                                name='chevron-right'
                                type='evilicon'
                                color='#bdbfc1'
                                iconStyle={styles.menubarIconRight}
                                onPress={() =>   {
                                    this.OrdersDelivered()}
                                  }
                               />
                      </View>
                     <TouchableHighlight style={[styles.salirboton, styles.salirbotonButton]}
                          onPress={() =>  {
                                this.handleBackButton ()}
                              }
                             >

                            <Text style={styles.salirbotonText}>Salir</Text>
                      </TouchableHighlight>
                </View>
          </View>

        );
    }


   render() {

      return (
        <View style={styles.container}>
            <MenuDrawer
              open={this.state.open}
              drawerContent={this.drawerContent()}
              drawerPercentage={100}
              animationTime={450}
              overlay={true}
              opacity={0.8}
            >
             <ImageBackground source={image} style={styles.partnerimage}>
                        <TouchableOpacity onPress={this.toggleOpen} style={styles.bodyOpenMenu}>
                              <Avatar
                                  size="large"
                                  overlayContainerStyle={{backgroundColor: 'transparent'}}
                                  containerStyle={{alignSelf: "flex-end", flexDirection:'column', marginTop: 15, marginRight: 10}}
                                  icon={{name: 'list', type: 'octicons',color: 'black'}}
                                />
                  </TouchableOpacity>
            </ImageBackground>


                 <View style={styles.cardscontainer}>

                   <Card style={styles.cardsmenu}>
                      <Text style={styles.cardsmenuSubTitle} onPress={() =>   {
                            this.TodayOrders()}
                          }  h3>Pedidos del día</Text>
                      <Icon

                        name='arrow-right'
                        type='font-awesome'
                        color='#a9d046'
                        iconStyle={styles.cardsmenuSubicon}
                        onPress={() =>   {
                            this.TodayOrders()}
                          }
                       />
                    </Card>
                    <Card style={styles.cardsmenu}>
                        <Text style={styles.cardsmenuSubTitle}   onPress={() =>   {
                              this.OrdersDelivered()}
                            } h3>Total entregado</Text>
                        <Icon

                          name='arrow-right'
                          type='font-awesome'
                          color='#a9d046'
                          iconStyle={styles.cardsmenuSubicon}
                          onPress={() =>   {
                              this.OrdersDelivered()}
                            }
                         />
                    </Card>
                  </View>

              </MenuDrawer>

          </View>
      );
    }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",

  },

  animatedMenuBox: {
    flex: 1,
    backgroundColor: "#ffffff",
    marginTop: -5,
  },
  ratecontainer:{
    flexDirection: 'row-reverse',
    marginTop: -24
  },
  animatedBoxTextSpecial: {
     flexDirection: 'column',
      flex: 0.1,
    fontSize: 25,
    color: '#373535',
    marginTop: 30,
    alignSelf: "center",
  },
  bodyOpenMenu: {
    flex: 1,
  },
   MenubarContainer:{
     flexDirection: 'column',
      alignItems: "center",
      justifyContent: "center",
     flex: 0.7,
   },

    menubarItemContainer: {
      borderBottomColor: '#bdbfc1',
      backgroundColor: '#FFFFFF',
      borderBottomWidth: 1,
      width:400,
      height:55,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center',

       },
  menubarItemText:{
      flex: 0.8,
      marginLeft:12,
      justifyContent: 'center'
  },

  menubarIconLeft: {
     marginStart: 25
  },
   menubarIconRight: {
     marginStart: 25
  },
   salirboton:  {
    marginTop: 70,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width:270,
    borderRadius:5,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
  },

  salirbotonButton: {
    backgroundColor: "#a9d046",
  },
  salirbotonText: {
    fontFamily: "QUICKSAND-LIGHT",
    color: 'white',
  },
   menuText: {
    fontSize : 25,
    alignSelf: 'flex-end',
    color: '#373535',
    marginRight: 10,
    marginTop: 5,
  },

   partnerimage: {
       flex:0.4,
       marginTop: -5
     },
     menubarimage: {
      alignSelf: 'flex-end',
      marginRight: 10,
      marginTop: 5,
     },
     cardscontainer: {
       flex: 0.4,
      justifyContent: "space-evenly",

     },
    cardsmenu:{
      padding: 20,
      margin: 20,
      flexDirection: 'row',
      alignSelf: "center"
    },
    cardsmenuSubTitle: {
      fontSize: 25,
      marginLeft : 10,
    },

   cardsmenuSubicon:{
      marginStart: 60
   },



})
