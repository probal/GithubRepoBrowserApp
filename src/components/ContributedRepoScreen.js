import React, { Component } from 'react';
import { FlatList, View, Alert, Text } from 'react-native';

import { connect } from 'react-redux';
import { Spinner, ContributredListItem, Button, Card, CardSection } from './common';
import { getMyRepos } from '../actions';
import {navigateTo, navigationResetTo} from "../GlobalNavigator";

class ContributedRepoScreen extends Component {

    componentDidMount() {
        this.props.fetchMyRepos();
    }
    renderRow(item) {
        return <ContributredListItem
            item={item}
            gotoItemDetail={this.gotoItemDetail.bind(this)}
            githubLoginName={this.props.githubLoginName} />
    }
    filterContributedRepo(item) {
        return item.owner.login != this.props.githubLoginName;
    }
    gotoItemDetail(item) {
        console.log(item);
        navigateTo('Issue', {item});
    }
    renderContributedRepoList() {
        if (this.props.inProgress) {
            return <Spinner size='large' />;
        }
        return (
            <FlatList
                data={this.props.allRepos.filter(this.filterContributedRepo, this)}
                renderItem={({ item }) => this.renderRow(item)}
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
            logoutFromGithub
          } = this.props;

        return (
            <View>
                <Card>
                    <CardSection>
                        {this.renderContributedRepoList()}
                    </CardSection>
                </Card>
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