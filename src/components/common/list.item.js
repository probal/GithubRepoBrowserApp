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
                        <Text style={styles.titleStyle}>
                            {name} - {language}
                        </Text>
                    </CardSection>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = {
    titleStyle: {
        fontSize: 18,
        paddingLeft: 15
    }
};
export { ListItem };
