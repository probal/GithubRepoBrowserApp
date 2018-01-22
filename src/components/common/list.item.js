import React, { Component } from 'react';
import { Text, View, TouchableWithoutFeedback, Alert } from 'react-native';
import  {CardSection}  from '../common';

class ListItem extends Component {

    gotoItemDetail() {
        this.props.gotoItemDetail(this.props.item)
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
                                {language}
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
