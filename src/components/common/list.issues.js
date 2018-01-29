import React, { Component } from 'react';
import { Text, View, TouchableWithoutFeedback, Alert } from 'react-native';
import  {CardSection}  from '../common';
import Moment from 'moment';

class IssueListItem extends Component {

    gotoIssueDetail() {
        this.props.gotoIssueDetail(this.props.item)
    }

    render() {
        const { id, title, state, number, created_at, user } = this.props.item;

        return (
            <TouchableWithoutFeedback onPress={this.gotoIssueDetail.bind(this)}>
                <View>
                    <CardSection>
                        <View style={styles.viewStyle}>
                            <Text style={styles.titleStyle}>
                                {"Issue #"+number+": "+title}
                            </Text>
                            <Text style={styles.subTitleStyle}>
                                {"Asked on "+Moment(created_at).format('hh:mm a DD/MM/YY')+" By: "+user.login}
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
        paddingLeft: 15,
        color: '#000000',
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
