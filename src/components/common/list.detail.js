import React, { Component } from 'react';
import { Text, View } from 'react-native';
import  {CardSection}  from '../common';

class IssueDetailItem extends Component {

    render() {
        const { id, body, user } = this.props.item;
        

        return (
            <View>
                <CardSection>
                    <View style={styles.viewStyle}>
                        <Text style={styles.titleStyle}>
                            {body}
                        </Text>
                        <Text style={styles.subTitleStyle}>
                            {user.login}
                        </Text>
                    </View>
                </CardSection>
            </View>
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
export { IssueDetailItem };
