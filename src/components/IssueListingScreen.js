import React, {Component} from 'react';
import {FlatList, View, Text} from 'react-native';

import {connect} from 'react-redux';

import {Card, CardSection, Spinner} from './common';
import {getRepoIssues} from '../actions';
import {getIssuesDetail} from '../actions';
import {IssueListItem} from "./common/list.issues";
import {navigateTo, navigationResetTo} from "../GlobalNavigator";


class IssueListingScreen extends Component {

    componentDidMount() {
        let url = this.props.navigation.state.params.item.issues_url.split('{')[0];
        this.props.fetchMyIssues(url);
    }

    logoutButtonPressed() {
        this.props.logoutGithub();
    }

    gotoIssueDetail(item) {
        console.log(item);
        navigateTo('IssueDetail', {item});
    }

    renderScreenHeader(){
        const { name, owner } = this.props.navigation.state.params.item;
        console.log("name:"+name+", "+owner)
        return (
            <View style={styles.viewStyle}>
                <Text style={styles.titleStyle}>
                    {'Issues'}
                </Text>
                <Text style={styles.repoNameStyle}>
                    {'"'+name+ '"'}
                <Text style={styles.byStyle}>
                    {' by '}
                <Text style={styles.ownerNameStyle}>
                    {owner.login}
                </Text>
                </Text>
                </Text>
                
            </View>
        );
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
                        {this.renderScreenHeader()}
                    </CardSection>
                    <CardSection>
                        {this.renderIssueList()}
                    </CardSection>
                </Card>
            </View>
        );
    }
}

const styles = {
    titleStyle: {
        fontSize: 25,
        color: '#000000',
        fontWeight: 'bold',
        paddingLeft: 15
    },
    repoNameStyle: {
        fontSize: 23,
        paddingLeft: 15
    },
    byStyle: {
        fontStyle: 'italic',
        fontSize: 23,
    },
    ownerNameStyle: {
        fontSize: 23,
        fontStyle: 'italic',
        fontWeight: 'bold'
    },
    viewStyle: {
        flex: 1,
        flexDirection: 'column',
    }
};

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