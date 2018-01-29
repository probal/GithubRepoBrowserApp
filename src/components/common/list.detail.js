import React, { Component } from 'react';
import { Text, View } from 'react-native';
import  { Card, CardSection}  from '../common';
import Moment from 'moment';

class IssueDetailItem extends Component {

    render() {
        const { id, body, user, created_at } = this.props.item;
        Moment.locale('en');
        
        return (
            <View>
                <Card>
                    <CardSection>
                        <View style={styles.bodyViewStyle}>
                            <Text style={styles.titleStyle}>
                                {body}
                            </Text>
                        </View>
                    </CardSection>
                    <CardSection>
                    <View style={styles.informationViewStyle}>
                            <Text style={styles.subTitleStyle}>
                                {"Submitted by: " + user.login}
                            </Text>
                            <Text style={styles.timeStyle}>
                                {Moment(created_at).format('hh:mm a MMM DD, YYYY')}
                            </Text>
                        </View>
                    </CardSection>
                </Card>
            </View>
        );
    }
}

const styles = {
    titleStyle: {
        flex: 1,
        flexDirection: 'column',
        fontSize: 20,
        fontWeight: 'bold'
        // paddingLeft: 15
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
        flexDirection: 'column',
    },
    informationViewStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
};
export { IssueDetailItem };
