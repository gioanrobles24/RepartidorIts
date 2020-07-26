import React, {Component} from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';
import loginRepartidor from './pages/LoginRepartidor';
import HomeRepartidor from './pages/HomeRepartidor';
import TodayOrders from './pages/orders/TodayOrders';
import OrderView from './pages/orders/OrderView';
import OrdersDeliveredView from './pages/orders/OrdersDelivered';
import CurrentOrderView from './pages/orders/CurrentOrder';
import CurrentsOrdersDetailView from './pages/orders/CurrentOrderDetail';
import RepartidorRateView from './pages/RepartidorRate';
export default class Routes extends Component {
  render() {
    return (
      <Router navBarButtonColor="#a9d046">
        <Stack key="root">
          <Scene
            key="loginRepartidor"
            hideNavBar={true}
            component={loginRepartidor}
          />
          <Scene
            key="homeRepartidor"
            hideNavBar={true}
            component={HomeRepartidor}
          />
          <Scene key="todayOrders" hideNavBar={false} component={TodayOrders} />
          <Scene key="orderView" hideNavBar={false} component={OrderView} />
          <Scene
            key="allMYordersDelivered"
            hideNavBar={false}
            component={OrdersDeliveredView}
          />
          <Scene
            key="CurrentsOrdersView"
            hideNavBar={false}
            component={CurrentOrderView}
          />
          <Scene
            key="CurrentsOrdersDetailView"
            hideNavBar={false}
            component={CurrentsOrdersDetailView}
          />
          <Scene
            key="deliverRate"
            hideNavBar={false}
            component={RepartidorRateView}
          />
        </Stack>
      </Router>
    );
  }
}

const styles = {
  barButtonIconStyle: {
    tintColor: '#a9d046',
  },
};
