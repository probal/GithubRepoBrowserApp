import React, {Component} from 'react';
import {FlatList, View, Alert, Text} from 'react-native';

import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import {Spinner, ListItem, Button, Card, CardSection} from './common';
import { getRepoIssues, logoutFromGithub } from '../actions';
import { navigateTo } from '../GlobalNavigator';


class IssueListingScreen extends Component {

    componentDidMount() {
        this.props.fetchMyIssues("https://api.github.com/repos/mehdihasan/android_background_video/issues/50");
    }

    logoutButtonPressed() {
        this.props.logoutGithub()
    }

    gotoIssueDetail(item) {
        console.log(item);
    }

    renderRow(item) {
        return <ListItem
            item={item}
            gotoItemDetail={this.gotoIssueDetail.bind(this)}/>
    }

    renderIssueList() {
        if (this.props.inProgress) {
            return <Spinner size='large' />;
        }
        return (
            <FlatList
                data={this.props.allRepoIssues}
                renderItem={({item}) => this.renderRow(item)}
                keyExtractor={item => item.id}
            />
        );
    }

    render() {
        const {
            getMyRepos,
            allRepos,
            allRepoIssues,
            githubDisplayName,
            githubLoginName,
            logoutFromGithub
        } = this.props;

        return (
            <View>
                <Text style={{textAlign: 'right'}}>{githubDisplayName} | Log out</Text>
                <Card>
                    <CardSection>
                        {this.renderIssueList()}
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
    fetchMyIssues: (url) =>
        dispatch(getRepoIssues(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(IssueListingScreen);