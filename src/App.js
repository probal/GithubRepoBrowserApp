import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import reducers from './reducers';
import Navigator from './Navigation';
import { setNavigator } from './GlobalNavigator';

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk)); 

export default class App extends Component {
    
  render() {
      return (
        <Provider store={store}>
          <Navigator ref={nav => { setNavigator(nav); }}/>
        </Provider>
      );
    } 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
