import React, { Component } from 'react';
import { Text, View, TouchableWithoutFeedback, Alert } from 'react-native';
import { CardSection } from '../common';
import OauthManagerSingleton from '../../OauthManagerSingleton'
const manager = OauthManagerSingleton.sharedInstance.getManager();


class ListItem extends Component {
    state = {
        languages: ''
    };
    gotoItemDetail() {
        this.props.gotoItemDetail(this.props.item)
    }
    getRepoLanguages() {
        manager.makeRequest('github', this.props.item.languages_url)
            .then((resp) => {
                if (!resp.data) {
                    return;
                }
                this.setState({
                    languages: Object.keys(resp.data).join(', ')
                });
            })
            .catch()
    }
    componentDidMount() {
        this.getRepoLanguages();
    }
    render() {
        const { id, name, language } = this.props.item;

        return (
            <TouchableWithoutFeedback onPress={this.gotoItemDetail.bind(this)}>
                <View>
                    <CardSection>
                        <View style={styles.viewStyle}>
                            <Text style={styles.titleStyle}>
                                {name}
                            </Text>
                            <Text style={styles.subTitleStyle}>
                                {this.state.languages}
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
        flexDirection: 'column',
        fontSize: 25,
        fontWeight: 'bold',
        paddingLeft: 15
    },
    subTitleStyle: {
        flex: 1,
        flexDirection: 'column',
        fontSize: 18,
        paddingLeft: 15
    },
    viewStyle: {
        flex: 1,
        flexDirection: 'column',
    }
};
export { ListItem };
