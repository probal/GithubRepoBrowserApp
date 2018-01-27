import React, { Component } from 'react';
import { Text, View, TouchableWithoutFeedback, Alert } from 'react-native';
import  {CardSection}  from '../common';

class IssueListItem extends Component {

    gotoIssueDetail() {
        this.props.gotoIssueDetail(this.props.item)
    }

    render() {
        const { id, name, age } = this.props.item;

        return (
            <TouchableWithoutFeedback onPress={this.gotoIssueDetail.bind(this)}>
                <View>
                    <CardSection>
                        <View style={styles.viewStyle}>
                            <Text style={styles.titleStyle}>
                                'Name'
                            </Text>
                            <Text style={styles.subTitleStyle}>
                                'Age'
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
export { IssueListItem };
