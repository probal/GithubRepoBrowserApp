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
            <View style={styles.informationViewStyle}>
                <Text style={styles.nameTextStyle}>
                {githubDisplayName} | </Text>
                <Text style={styles.logOutTitleStyle} onPress={this.logoutButtonPressed.bind(this)}>
                    Log Out
                </Text>
            </View>
        );
    }

  };
 
  const styles = {
    bodyTextStyle: {
        
    },
    nameTextStyle: {        
        flexDirection: 'column',
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000000',
        paddingLeft: 10,
        paddingTop: 20
    },
    logOutTitleStyle: {
        color: '#000000',
        fontSize: 15,
        paddingRight: 10,
        paddingTop: 20
    },
    informationViewStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
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