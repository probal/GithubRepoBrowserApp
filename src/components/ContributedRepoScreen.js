import React, {Component} from 'react';
import {View, Alert, Text} from 'react-native';

import { connect } from 'react-redux';

import {Spinner} from './common/spinner';
import { getMyRepos } from '../actions';

class ContributedRepoScreen extends Component {

    componentDidMount() {
        this.props.fetchMyRepos();
    }

    render() {

        const {
            getMyRepos,
            githubDisplayName,
            githubLoginName
          } = this.props;

        return (
            <View>
                <Text>Hi From contributed Repo - {githubLoginName} - {githubDisplayName}</Text>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    ...state.auth,
  });
  
  const mapDispatchToProps = dispatch => ({
    fetchMyRepos: () =>
      dispatch(getMyRepos()),
  });
  
export default connect(mapStateToProps, mapDispatchToProps)(ContributedRepoScreen);