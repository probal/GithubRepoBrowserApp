import React, {Component} from 'react';
import {View, Alert, Text, Button} from 'react-native';

import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import {Spinner} from './common/spinner';
import { loginUserAsync } from '../actions';
import { navigateTo } from '../GlobalNavigator';

class LoginScreen extends Component {

    skipLogin() {
        navigateTo('Repo');
    }

    render() {

        const {
            authenticated,
            loading,
            loginUserAsync,
            loginErrorMsg
          } = this.props;

        return (
            <View>
                <Text>Hi From Login</Text>

                <Button title="Skip Login" onPress={this.skipLogin.bind(this)}/>
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
  
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);