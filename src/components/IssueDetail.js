import React, {Component} from 'react';
import {FlatList, View} from 'react-native';

import {connect} from 'react-redux';

import {Card, CardSection, Spinner} from './common';
import {getIssuesDetail} from '../actions';

import {IssueDetailItem} from "./common/list.detail";

class IssueDetailsScreen extends Component {

    componentDidMount() {
        // const { comments_url } = item;
        let url = this.props.navigation.state.params.item.comments_url
        console.log("detailsURL: " + url);
        this.props.fetchIssueDetails(url);
    }

    logoutButtonPressed() {
        this.props.logoutGithub();
    }

    renderRow(item) {
        return <IssueDetailItem item = {item} />
    }

    renderIssueDetails() {
        if (this.props.inProgress) {
            return <Spinner size='large' />;
        }
        return (
            <FlatList
                data={this.props.issueDetail}
                renderItem={({item}) => this.renderRow(item)}
                keyExtractor={item => item.id}
            />
        );
    }

    render() {
        const {
            issueDetail,
            githubDisplayName,
            githubLoginName,
            logoutFromGithub,
        } = this.props;

        return (
            <View>
                <Card>
                    <CardSection>
                        {this.renderIssueDetails()}
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
    fetchIssueDetails: (url) =>
      dispatch(getIssuesDetail(url))
});

export default connect(mapStateToProps, mapDispatchToProps)(IssueDetailsScreen);