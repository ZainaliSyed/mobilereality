import _ from 'lodash';
import React, {Component} from 'react';
import {StatusBar, NativeModules} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './store';
import rootNavigator from './navigator';
import {setNavigatorRef, push} from './services/NavigationService';
import singleton from './singleton';
import SplashScreen from 'react-native-splash-screen';
import {Colors, Metrics} from './theme';
import HttpServiceManager from './services/HttpServiceManager';
import constant from './constants';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import Spinner, {showSpinner, hideSpinner} from 'react-native-globalspinner';

export default class App extends Component {
  componentDidMount() {
    HttpServiceManager.initialize(constant.baseURL, {});
    //set designedAtX verify it on Adobe XD Desgin file
    //Metrics.designedAtX = false;
  }

  state = {isReduxLoaded: false};

  onBeforeLift = () => {
    singleton.storeRef = store;

    this.setState({isReduxLoaded: true}, () => {
      SplashScreen.hide();
    });
  };
  getNavigator = () => {
    if (!this.state.isReduxLoaded) {
      return null;
    } else {
      return rootNavigator();
      //!_.isEmpty(store.getState().loginReducer.data)
    }
  };
  render() {
    const Navigator = this.getNavigator();
    return (
      <Provider store={store}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={Colors.secondary.azure}
        />
        <PersistGate onBeforeLift={this.onBeforeLift} persistor={persistor}>
          <Navigator ref={ref => setNavigatorRef(ref)} />
        </PersistGate>
        <FlashMessage position="top" />
        <Spinner color={Colors.primary.theme} />
      </Provider>
    );
  }
}
