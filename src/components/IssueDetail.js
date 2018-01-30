import React, {Component} from 'react';
import {FlatList, View, Text, Dimensions} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import {connect} from 'react-redux';

import {Card, CardSection, Spinner} from './common';
import {getIssuesDetail} from '../actions';

import {IssueDetailItem} from "./common/list.detail";
import Moment from 'moment';

var scrollPadding = Dimensions.get('window').height - getStatusBarHeight() - 20 - 64;

class IssueDetailsScreen extends Component {

    state = {
        headerHeight: 0,
        descriptionHeight: 0
    }

    componentDidMount() {
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

    renderIssueTitle(){
        let item = this.props.navigation.state.params.item
        let issueDisplayName = "Issue #" + item.number + " " + item.title
        return (
            <View style={styles.viewStyle} onLayout={(event) => { this.setState({ headerHeight: event.nativeEvent.layout.y + event.nativeEvent.layout.height}); }}>
                <Text style={styles.titleStyle}>
                    {issueDisplayName}
                </Text>
            </View>
        );
    }

    renderIssueDescription(){
        let item = this.props.navigation.state.params.item
        let issueBody = item.body

        if (issueBody === ""){
            return null;
        }
        return (
            <View onLayout={(event) => { this.setState({ descriptionHeight: 5 + event.nativeEvent.layout.height}); }}>
                <CardSection>
                    <View style={styles.bodyViewStyle}>
                        <Text style={styles.bodyTextStyle}>
                            {issueBody}
                        </Text>
                    </View>
                </CardSection>
                <CardSection>
                    <View style={styles.informationViewStyle}>
                        <Text style={styles.subTitleStyle}>
                            {"Submitted by: " + item.user.login}
                        </Text>
                        <Text style={styles.timeStyle}>
                            {Moment(item.created_at).format('hh:mm a MMM DD, YYYY')}
                        </Text>
                    </View>
                </CardSection>
            </View>
        );
    }

    renderIssueDetails() {
        if (this.props.inProgress) {
            return <Spinner size='large' />;
        }
        return (
            <FlatList
                style={{height: scrollPadding - this.state.headerHeight - this.state.descriptionHeight}}
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
                        {this.renderIssueTitle()}
                    </CardSection>
                    {this.renderIssueDescription()}
                    <CardSection>
                        {this.renderIssueDetails()}
                    </CardSection>
                </Card>
            </View>
        );
    }
}

const styles = {
    titleStyle: {
        flex: 1,
        flexDirection: 'row',
        fontSize: 25,
        color: '#000000',
        fontWeight: 'bold',
        paddingLeft: 15
    },
    bodyTextStyle: {
        flex: 1,
        flexDirection: 'column',
        fontSize: 20,
        fontWeight: 'bold',
        paddingLeft: 10
    },
    viewStyle: {
        flex: 1,
        flexDirection: 'row',
    },
    subTitleStyle: {
        color: '#000000',
        fontSize: 13,
        paddingLeft: 10
    },
    timeStyle:{
        color: '#000000',
        fontSize: 13,
        paddingRight: 10
    },
    bodyViewStyle: {
        flex: 1,
        flexDirection: 'row',
    },
    informationViewStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
};

const mapStateToProps = state => ({
    ...state.auth,
});

const mapDispatchToProps = dispatch => ({
    fetchIssueDetails: (url) =>
      dispatch(getIssuesDetail(url))
});

export default connect(mapStateToProps, mapDispatchToProps)(IssueDetailsScreen);