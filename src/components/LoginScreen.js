import React, {Component} from 'react';
import {View, Alert, Text} from 'react-native';

import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import {Spinner, Button, Card, CardSection} from './common';
import { loginWithGithub } from '../actions';
import { navigateTo } from '../GlobalNavigator';

class LoginScreen extends Component {

    githubLoginButtonPressed() {
        this.props.githubLogin();
    }

    renderLoginButton() {
        if (this.props.inProgress) {
            return <Spinner size='large' />;
        }
        return (
            <Button onPress={this.githubLoginButtonPressed.bind(this)}>Login with Github</Button>     
        );
    }

    render() {

        const {
            authenticated,
            inProgress,
            loginWithGithub,
            loginErrorMsg
          } = this.props;

        return (
            <Card>
                <CardSection>
                    {this.renderLoginButton()}
                </CardSection>
            </Card>
        );
    }
}

const mapStateToProps = state => ({
    ...state.auth,
  });
  
  const mapDispatchToProps = dispatch => ({
    githubLogin: () =>
      dispatch(loginWithGithub())
  });
  
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);