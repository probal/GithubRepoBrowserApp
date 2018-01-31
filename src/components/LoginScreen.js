import React, {Component} from 'react';
import {View, Alert, Text, TouchableOpacity, Image} from 'react-native';

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
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={this.githubLoginButtonPressed.bind(this)}>
                <Image source={require("../assets/iconGitHub.png")}/>
                </TouchableOpacity>
                <Text style={styles.text}>
                    {'Login with Github'}
                </Text>
            </View>
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
            // this.renderLoginButton()
            <Card>
                <CardSection>
                    {this.renderLoginButton()}
                </CardSection>
            </Card>
        );
    }
}

const styles = {
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row'
    },
    button: {
      padding: 10,
      shadowOffset: { width: 0, height: 5 },
      shadowRadius: 10,
      shadowOpacity: 0.35
    },
    text: {
        fontSize: 20,
      }
  };

const mapStateToProps = state => ({
    ...state.auth,
  });

  const mapDispatchToProps = dispatch => ({
    githubLogin: () =>
      dispatch(loginWithGithub())
  });

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);