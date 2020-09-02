import React, {Component, useEffect, useState} from 'react';
import {Router, Scene, Actions} from 'react-native-router-flux';
import loginRepartidor from './pages/LoginRepartidor';
import HomeRepartidor from './pages/HomeRepartidor';
import TodayOrders from './pages/orders/TodayOrders';
import OrderView from './pages/orders/OrderView';
import OrdersDeliveredView from './pages/orders/OrdersDelivered';
import CurrentOrderView from './pages/orders/CurrentOrder';
import CurrentsOrdersDetailView from './pages/orders/CurrentOrderDetail';
import RepartidorRateView from './pages/RepartidorRate';
import GananciasView from './pages/Ganancias';
import GananciasSemanalView from './pages/GananciasSemanal';
import HistorialMensualView from './pages/HistorialMensual';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {setUser} from './redux/reducers/session';
import {BackHandler} from 'react-native';

export function Routes() {
  const session = useSelector((state) => state.session);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('session')
      .then((user) => {
        if (user) {
          try {
            dispatch(setUser(JSON.parse(user)));
          } catch (e) {
            return;
          }
        }
      })
      .catch((e) => {
        return AsyncStorage.removeItem('session');
      })
      .finally(() => setLoading(false));
  }, []);
  console.log(session);
  return !loading && (session.user ? <AuthApp /> : <UnauthApp />);
}

function backAction(params) {
  if (Actions.state.index === 0) {
    BackHandler.exitApp();
    return false;
  }
  Actions.pop();
  return true;
}

function UnauthApp() {
  return (
    <Router navBarButtonColor="#a9d046" backAndroidHandler={backAction}>
      <Scene key="root">
        <Scene
          key="loginRepartidor"
          hideNavBar={true}
          component={loginRepartidor}
        />
      </Scene>
    </Router>
  );
}

function AuthApp() {
  return (
    <Router navBarButtonColor="#a9d046" backAndroidHandler={backAction}>
      <Scene key="root">
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
        <Scene
          key="ganancias"
          hideNavBar={false}
          component={GananciasView}
        />
        <Scene
          key="gananciasSemanal"
          hideNavBar={false}
          component={GananciasSemanalView}
        />
        <Scene
          key="historialMensual"
          hideNavBar={false}
          component={HistorialMensualView}
        />
      </Scene>
    </Router>
  );
}
