import React, {Component} from "react";
import {View, StyleSheet, TouchableOpacity, Animated} from "react-native";

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
    Body,
    Content, Spinner
} from "native-base";
import {connect} from "react-redux";
import {getDeckAsync} from "../state/actions";
import {PrimaryColor} from "../utils/Colors";
import Score from "./Score";


const initialState = {
    index: 0,
    correct: 0,
    showAnswer: false
}

class Quiz extends Component {

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
    onYes = () => {
        //hide answer to block buttons while animating
        this.setState({showAnswer: false});
        this.swipe();
        setTimeout(() => {
            this.setState(state => ({
                index: state.index + 1,
                correct: state.correct + 1
            }));
        }, 500);

    };

    onNo = () => {
        this.swipe();
        setTimeout(() => {
            this.setState(state => ({
                index: state.index + 1,
                showAnswer: false
            }));
        }, 500);
    };

    onRestart = () => {
        this.setState({
            ...initialState
        });
    }

    onBack = () => {
        this.props.navigation.goBack();
    }

    onToggleAnswer = () => {
        this.flip();
        setTimeout(() => {
            this.setState((state) => ({
                showAnswer: !state.showAnswer
            }));
        }, 300);
    }

    render() {

        const {index, correct, showAnswer} = this.state;
        const {questions} = this.props.deck;

        const animatedStyle = {
            transform: [
                {rotateY: this.flipInterpolate},
                {translateX: this.animatedTranslateValue}
            ],
            opacity: this.opacityInterpolate,
        };

        return (
            <Container style={{backgroundColor: "#FBFAFA"}}>
                <Header style={{backgroundColor: PrimaryColor}}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-back"/>
                        </Button>
                    </Left>
                    <Body>
                    <Title>Quiz</Title>
                    </Body>
                    <Right/>
                </Header>

                <View style={{flex: 1, padding: 12}}>
                    <View style={styles.spinner}>
                        <Spinner color='blue'/>
                    </View>

                    {(index < questions.length) ? (

                        <Animated.View style={[styles.container, animatedStyle, {flex: 1}]}>
                            <Card>
                                <CardItem header>
                                    <Text>Question {index + 1} of {questions.length}</Text>
                                </CardItem>

                                <CardItem style={{flex: 1}}>
                                    <Text style={{fontSize: 30, textAlign: 'center', flex: 1}}>
                                        {questions[index].question}
                                    </Text>
                                </CardItem>
                                <CardItem style={styles.showAnswerCard}>
                                    <TouchableOpacity onPress={this.onToggleAnswer} style={{flex: 1}}>
                                        <Text style={styles.showAnswerText}>
                                            {showAnswer ? questions[index].answer : 'Show Answer'}
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

                    ) : (
                        <Score
                            onBack={this.onBack}
                            onRestart={this.onRestart}
                            correct={correct}
                            questions={questions.length}/>
                    )}
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        margin: 10
    },
    spinner: {
        position: 'absolute',
        flex: 1,
        zIndex: 0,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center'
    },
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

const mapStateToProps = (state, props) => ({
    deck: state.deck
});

const mapDispatchToProps = dispatch => ({
    getDeck: title => dispatch(getDeckAsync())
});

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
