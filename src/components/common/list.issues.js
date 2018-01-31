import React, { Component } from 'react';
import { Text, View, TouchableWithoutFeedback, Alert } from 'react-native';
import  {CardSection}  from '../common';
import Moment from 'moment';

class IssueListItem extends Component {

    gotoIssueDetail() {
        this.props.gotoIssueDetail(this.props.item)
    }

    getTimeDifference(aDate){
        var a = Moment(aDate);
        var b = Moment();
        
        var years = b.diff(a, 'years');
        var months = b.diff(a, 'months');
        var days = b.diff(a, 'days');
        var hours = b.diff(a, 'hours');
        var minutes = b.diff(a, 'minutes');


        var result = '';
        if (years>0){
            var str = "year"
            if (years > 1){
                str = "years"
            } 
            result = years + " " + str + " ago"
            return result;
        }
        else if(months>0){
            var str = "month"
            if (months > 1){
                str = "months"
            } 
            result = months + " " + str + " ago"
            return result;
        }
        else if(days>0){
            var str = "day"
            if (days > 1){
                str = "days"
            } 
            var tempDays = days + 0.6
            if (hours/24 > tempDays){
                days = days+1
            }
            result = days + " " + str + " ago"
            return result;
        }
        else if(hours>0){
            var str = "hour"
            if (hours > 1){
                str = "hours"
            } 
            result = hours + " " + str + " ago"
            return result;
        }
        else if(minutes>0){
            var str = "minute"
            if (minutes > 1){
                str = "minutes"
            } 
            result = minutes + " " + str + " ago"
            return result;
        }
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
                                {"Asked "+this.getTimeDifference(created_at)+" By: "+user.login}
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
