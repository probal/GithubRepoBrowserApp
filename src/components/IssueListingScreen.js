import React, {Component} from 'react';
import {FlatList, View} from 'react-native';

import {connect} from 'react-redux';

import {Card, CardSection, Spinner} from './common';
import {getRepoIssues} from '../actions';
import {getIssuesDetail} from '../actions';
import {IssueListItem} from "./common/list.issues";
import {navigateTo, navigationResetTo} from "../GlobalNavigator";


class IssueListingScreen extends Component {

    componentDidMount() {
        console.log("inssuelist: " + this.props.navigation.state.params.item.issues_url);
        let url = this.props.navigation.state.params.item.issues_url.split('{')[0];
        console.log("spliturl: " + url);
        this.props.fetchMyIssues(url);
    }

    logoutButtonPressed() {
        this.props.logoutGithub();
    }

    gotoIssueDetail(item) {
        console.log(item);
        navigateTo('IssueDetail', {item});
    }

    renderRow(item) {
        return <IssueListItem
            item={item}
            gotoIssueDetail={this.gotoIssueDetail.bind(this)}/>
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
            allRepoIssues,
            githubDisplayName,
            githubLoginName,
            logoutFromGithub,
        } = this.props;

        return (
            <View>
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
    fetchIssueDetails: (url) =>
      dispatch(getIssuesDetail(url))
});

export default connect(mapStateToProps, mapDispatchToProps)(IssueListingScreen);