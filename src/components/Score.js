import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Button, Card, CardItem, Icon, Text, View} from "native-base";
import {clearLocalNotification, setLocalNotification} from "../utils/Notifications";
import {SecondaryTextColor} from "../utils/Colors";


export default class Score extends Component {


    componentDidMount() {
        clearLocalNotification().then(setLocalNotification);
    }

    getScore = (correct, questions) => {
        return (<Text style={{fontSize: 25, fontWeight: 'bold'}}> {((100 * correct) / questions).toFixed(2)}% </Text>);

    }

    render() {
        const {correct, questions} = this.props;

        return (
            <Card>
                <CardItem style={{
                    flex: 1,
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignContent:'center',
                        alignItems: 'center',
                    }}>
                        <Text style={{fontSize: 25}}>Your Score: {this.getScore(correct, questions)}</Text>
                        <Text style={{fontSize: 20, color: SecondaryTextColor}}>{correct} out of {questions}</Text>
                    </View>
                    <View style={{flex: 1}}>
                        <Button iconLeft
                                onPress={this.props.onRestart}
                                success
                                block
                                style={styles.button}>
                            <Icon name="refresh"/>
                            <Text> Restart Quiz
                            </Text>
                        </Button>
                        <Button iconLeft onPress={this.props.onBack} danger block style={styles.button}>
                            <Icon name="arrow-back"/>
                            <Text>Back to Deck</Text>

                        </Button>
                    </View>
                </CardItem>
            </Card>
        );
    }
}


const styles = StyleSheet.create({
    button: {
        margin: 10
    }
});
