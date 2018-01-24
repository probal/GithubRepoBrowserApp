import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';

import { connect } from 'react-redux';

import { logoutFromGithub } from '../actions';

class LogoutComponent extends Component {

    componentWillReceiveProps(nextProps) {

    }

    logoutButtonPressed() {
        this.props.logoutGithub()
    }

    render() {
        const {
            githubDisplayName,
            githubLoginName,
            logoutFromGithub
        } = this.props;

        return (
            <View>
                <Text>{githubDisplayName} | </Text>
                <Text onPress={this.logoutButtonPressed.bind(this)}>Log Out</Text>
            </View>
        );
    }

  };
 
  
const mapStateToProps = state => ({
    ...state.auth
  });
  
const mapDispatchToProps = dispatch => ({
    logoutGithub: () =>
        dispatch(logoutFromGithub())
});
  
export default connect(mapStateToProps, mapDispatchToProps)(LogoutComponent);