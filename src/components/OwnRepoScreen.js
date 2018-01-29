import React, {Component} from 'react';
import {FlatList, View, Alert, Text} from 'react-native';

import { connect } from 'react-redux';

import {Spinner, ListItem, Button, Card, CardSection} from './common';
import { getMyRepos, logoutFromGithub } from '../actions';
import {navigateTo, navigationResetTo} from "../GlobalNavigator";

class OwnRepoScreen extends Component {

    componentDidMount() {
        this.props.fetchMyRepos();
    }

    renderRow(item) {
        return <ListItem 
                item={item}
                gotoItemDetail={this.gotoItemDetail.bind(this)}/>
    }
    filterOwnRepo(item){
        return item.owner.login == this.props.githubLoginName;
    }
    gotoItemDetail(item) {
        console.log(item);
        navigateTo('Issue', {item});
    }

    logoutButtonPressed() {
        this.props.logoutGithub();
    }

    renderOwnRepoList() {
        if (this.props.inProgress) {
            return <Spinner size='large' />;
        }
        return (
            <FlatList
                data={this.props.allRepos.filter(this.filterOwnRepo, this)}
                renderItem={({item}) => this.renderRow(item)}
                keyExtractor={item => item.id}
            />
        );
    }

    render() {

        const {
            getMyRepos,
            allRepos,
            githubDisplayName,
            githubLoginName,
            logoutFromGithub,
          } = this.props;

        return (
            <View>
                <Card>
                    <CardSection>
                        {this.renderOwnRepoList()}
                    </CardSection>
                </Card>
            </View>
            
        );
    }
}

const mapStateToProps = state => ({
    ...state.auth
  });
  
  const mapDispatchToProps = dispatch => ({
    fetchMyRepos: () =>
      dispatch(getMyRepos()),
    logoutGithub: () =>
      dispatch(logoutFromGithub())
  });
  
export default connect(mapStateToProps, mapDispatchToProps)(OwnRepoScreen);