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

    renderScreenHeader(){
        return (
            <View style={styles.viewStyle}>
                <Text style={styles.titleStyle}>
                    {this.props.githubDisplayName+"'s Repositories"}
                </Text>
            </View>
        );
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
                onScroll={() => console.log("scrolling own repo")}
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
                        {this.renderScreenHeader()}
                    </CardSection>
                    <CardSection>
                        {this.renderOwnRepoList()}
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
    ...state.auth
  });
  
  const mapDispatchToProps = dispatch => ({
    fetchMyRepos: () =>
      dispatch(getMyRepos()),
    logoutGithub: () =>
      dispatch(logoutFromGithub())
  });
  
export default connect(mapStateToProps, mapDispatchToProps)(OwnRepoScreen);