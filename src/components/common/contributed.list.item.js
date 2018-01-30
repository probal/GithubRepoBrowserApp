import React, { Component } from 'react';
import { Text, View, TouchableWithoutFeedback, Alert } from 'react-native';
import { CardSection } from '../common';
import OauthManagerSingleton from '../../OauthManagerSingleton'
const manager = OauthManagerSingleton.sharedInstance.getManager();

class ContributredListItem extends Component {
    state = {
        numerOfCommits: 0,
        languages:''
    };
    gotoItemDetail() {
        this.props.gotoItemDetail(this.props.item)
    }
    getNumberOfCommits() {
        manager.makeRequest('github', `/repos/${this.props.item.owner.login}/${this.props.item.name}/stats/contributors`)
            .then((resp) => {
                if (!(resp && resp.data)) {
                    return false;
                }
                let commits = resp.data.filter(item => item.author.login === this.props.githubLoginName);
                if (commits.length) {
                    this.setState({
                        numerOfCommits: commits[0].total
                    });
                }
            })
            .catch(err => console.log(err))
    }
    getRepoLanguages() {
        manager.makeRequest('github',this.props.item.languages_url)
        .then((resp) => {
            if(!resp.data){
                return;
            }
            this.setState({
                languages: Object.keys( resp.data ).join(', ')
            });
        })
        .catch(err => console.log(err))
    }
    componentDidMount() {
        this.getNumberOfCommits();
        this.getRepoLanguages();
    }
    render() {
        const { id, name, language, owner } = this.props.item;

        return (
            <TouchableWithoutFeedback onPress={this.gotoItemDetail.bind(this)}>
                <View>
                    <CardSection>
                        <View style={styles.viewStyle}>
                            <Text style={styles.titleStyle}>
                                {name}
                                <Text style={{ fontStyle: 'italic' }}>
                                    {' by '}
                                </Text>
                                <Text style={styles.contributedNameTitleStyle}>
                                    {owner.login}
                                </Text>
                            </Text>
                            <Text style={styles.subTitleStyle}>
                                {this.state.languages}
                            </Text>
                        </View>
                        <View style={styles.commitViewStyle}>
                            <Text style={styles.commitTitleStyle}>
                                {this.state.numerOfCommits} {' commits'}
                            </Text>
                        </View>
                    </CardSection>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = {
    titleStyle: {
        flex: 1,
        flexDirection: 'row',
        fontSize: 25,
        paddingLeft: 15
    },
    contributedNameTitleStyle: {
        flex: 1,
        flexDirection: 'row',
        fontSize: 25,
        fontWeight: 'bold',
        paddingLeft: 5
    },
    subTitleStyle: {
        flex: 1,
        flexDirection: 'column',
        fontSize: 18,
        paddingLeft: 15
    },
    viewStyle: {
        flex: 2,
        flexDirection: 'column',
    },
    commitViewStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    commitTitleStyle: {
        fontSize: 18,
        paddingRight: 5
    },
};
export { ContributredListItem };
