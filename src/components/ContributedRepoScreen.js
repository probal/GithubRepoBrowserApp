import React, { Component } from 'react';
import { FlatList, View, Alert, Text, Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import { connect } from 'react-redux';
import { Spinner, ContributredListItem, Button, Card, CardSection } from './common';
import { getMyRepos } from '../actions';
import {navigateTo, navigationResetTo} from "../GlobalNavigator";

var scrollPadding = Dimensions.get('window').height - getStatusBarHeight() - 20 - 64;
class ContributedRepoScreen extends Component {

    state = {
        headerHeight: 0
    }

    componentDidMount() {
        this.props.fetchMyRepos();
    }
    renderScreenHeader(){
        return (
            <View style={styles.viewStyle} onLayout={(event) => { this.setState({ headerHeight: 10 + event.nativeEvent.layout.height}); }}>
                <Text style={styles.titleStyle}>
                    {this.props.githubDisplayName+"'s Contributions"}
                </Text>
            </View>
        );
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
                style={{height: scrollPadding - this.state.headerHeight - 50}}
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
                        {this.renderScreenHeader()}
                    </CardSection>
                    <CardSection>
                        {this.renderContributedRepoList()}
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
    viewStyle: {
        flex: 1,
        flexDirection: 'row',
    }
};

const mapStateToProps = state => ({
    ...state.auth,
});

const mapDispatchToProps = dispatch => ({
    fetchMyRepos: () =>
        dispatch(getMyRepos()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContributedRepoScreen);