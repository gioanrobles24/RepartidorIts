import React, { Component } from 'react'
import {Router, Stack, Scene} from 'react-native-router-flux'
import  loginRepartidor  from './pages/LoginRepartidor'
import  HomeRepartidor  from './pages/HomeRepartidor'
import  TodayOrders from './pages/orders/TodayOrders'
import  OrderView from './pages/orders/OrderView'
export default class Routes extends Component {
    render() {
        return (
            <Router  navBarButtonColor='#a9d046'>
                <Stack key="root">
                	<Scene key="loginRepartidor" hideNavBar={true} component={loginRepartidor}/>
                	<Scene key="homeRepartidor" hideNavBar={true} component={HomeRepartidor}/>
                    <Scene key="todayOrders" hideNavBar={false} component={TodayOrders}/>
                    <Scene key="orderView" hideNavBar={false} component={OrderView}/>
                </Stack>
            </Router>
        )
    }
}

const styles = {
    barButtonIconStyle: {
        tintColor: '#a9d046'
    }
}