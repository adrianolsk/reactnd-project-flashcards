import React, {Component} from "react";
import {StyleSheet, TouchableOpacity, Animated} from "react-native";

import {
    Container,
    Header,
    Title,
    Button,
    IconNB,
    DeckSwiper,
    Card,
    CardItem,
    Icon,
    Thumbnail,
    Text,
    Left,
    Right,
    Content, Spinner
} from "native-base";

const initialState = {
    showAnswer: false
}

export default class DeckCard extends Component {

    constructor() {
        super();
        this.state = {
            ...initialState
        }
    }

    componentWillMount() {
        this.animatedValue = new Animated.Value(0);
        this.flipValue = 0;
        this.animatedValue.addListener(({value}) => {
            this.flipValue = value;
        });
        this.animatedTranslateValue = new Animated.Value(0);
        this.flipInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 360],
            outputRange: ['0deg', '360deg'],
        });
        this.opacityInterpolate = this.animatedTranslateValue.interpolate({
            inputRange: [-400, 0, 400],
            outputRange: [0, 1, 0],
        });
    }

    componentWillUnmount() {
        this.animatedValue.removeAllListeners();
    }

    swipe = () => {
        Animated.sequence([
            Animated.timing(this.animatedTranslateValue, {
                toValue: -400,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(this.animatedTranslateValue, {
                toValue: 400,
                duration: 0,
                useNativeDriver: true,
            }),
            Animated.timing(this.animatedTranslateValue, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start();
    };

    flip = () => {
        if (this.flipValue >= 180) {
            Animated.spring(this.animatedValue, {
                toValue: 0,
                friction: 8,
                tension: 10,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.spring(this.animatedValue, {
                toValue: 360,
                friction: 8,
                tension: 10,
                useNativeDriver: true,
            }).start();
        }
    }

    onToggleAnswer = () => {
        this.flip();
        setTimeout(() => {
            this.setState((state) => ({
                showAnswer: !state.showAnswer
            }));
        }, 300);
    }

    onYes = () => {
        //hide answer to block buttons while animating
        this.setState({showAnswer: false});
        this.swipe();
        setTimeout(() => {
            this.props.onYes();
        }, 500);

    };

    onNo = () => {
        this.setState({showAnswer: false});
        this.swipe();
        setTimeout(() => {
            this.props.onNo();
        }, 500);
    };

    render() {
        const {showAnswer} = this.state;
        const {question, total, current} = this.props;
        const animatedStyle = {
            transform: [
                {rotateY: this.flipInterpolate},
                {translateX: this.animatedTranslateValue}
            ],
            opacity: this.opacityInterpolate,
        };
        return (
            <Animated.View style={[styles.container, animatedStyle, {flex: 1}]}>
                <Card>
                    <CardItem header>
                        <Text>Question {current } of {total}</Text>
                    </CardItem>

                    <CardItem style={{flex: 1}}>
                        <Text style={{fontSize: 30, textAlign: 'center', flex: 1}}>
                            {question.question}
                        </Text>
                    </CardItem>
                    <CardItem style={styles.showAnswerCard}>
                        <TouchableOpacity onPress={this.onToggleAnswer} style={{flex: 1}}>
                            <Text style={styles.showAnswerText}>
                                {showAnswer ? question.answer : 'Show Answer'}
                            </Text>
                        </TouchableOpacity>
                    </CardItem>

                    <CardItem header style={{
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }}>
                        <Button iconLeft onPress={this.onYes} success disabled={!showAnswer}>
                            <Icon name="arrow-back"/>
                            <Text>Correct</Text>
                        </Button>
                        <Button iconRight onPress={this.onNo} danger disabled={!showAnswer}>
                            <Text>Incorrect</Text>
                            <Icon name="arrow-forward"/>
                        </Button>
                    </CardItem>
                </Card>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    showAnswerCard: {
        flex: 1,
        alignContent: 'flex-start',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    showAnswerText: {
        color: 'red',
        textAlign: 'center',
        flex: 1,
        fontSize: 20
    }
});
