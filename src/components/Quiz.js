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
import DeckCard from "./DeckCard";


const initialState = {
    index: 0,
    correct: 0
}

class Quiz extends Component {

    constructor() {
        super();
        this.state = {
            ...initialState
        }
    }

    onRestart = () => {
        this.setState({
            ...initialState
        });
    }

    onBack = () => {
        this.props.navigation.goBack();
    }

    onYes = () => {
        this.setState(state => ({
            index: state.index + 1,
            correct: state.correct + 1
        }));
    };

    onNo = () => {
        this.setState(state => ({
            index: state.index + 1,
            showAnswer: false
        }));
    };

    render() {

        const {index, correct} = this.state;
        const {questions} = this.props.deck;

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

                        <DeckCard question={questions[index]}
                                  total={questions.length}
                                  current={index + 1}
                                  onYes={this.onYes}
                                  onNo={this.onNo}/>

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

});

const mapStateToProps = (state, props) => ({
    deck: state.deck
});

const mapDispatchToProps = dispatch => ({
    getDeck: title => dispatch(getDeckAsync())
});

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
