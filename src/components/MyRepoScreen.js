import React, {Component} from 'react';
import {View, Alert, Text} from 'react-native';

import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import {Spinner} from './common/spinner';
import { loginUserAsync } from '../actions';

class MyRepoScreen extends Component {

    render() {

        const {
            authenticated,
            loading,
            loginUserAsync,
            loginErrorMsg
          } = this.props;

        return (
            <View>
                <Text>Hi From My Repo</Text>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    ...state.auth,
  });
  
  const mapDispatchToProps = dispatch => ({
    loginUser: (username, password) =>
      dispatch(loginUserAsync(username, password)),
  });
  
export default connect(mapStateToProps, mapDispatchToProps)(MyRepoScreen);