import React, {Component} from "react";
import {View, StyleSheet, TouchableOpacity} from "react-native";

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
    Content
} from "native-base";
import {connect} from "react-redux";
import {getDeckAsync} from "../state/actions";


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

    onYes = () => {
        this.setState(state => ({
            index: state.index + 1,
            correct: state.correct + 1,
            showAnswer: false
        }));
    };

    onNo = () => {
        this.setState(state => ({
            index: state.index + 1,
            showAnswer: false
        }));
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
        this.setState((state) => ({
            showAnswer: !state.showAnswer
        }));
    }

    render() {

        const {index, correct, showAnswer} = this.state;
        const {questions} = this.props.deck;
        return (
            <Container style={{backgroundColor: "#FBFAFA"}}>
                <Header>
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

                    {(index < questions.length) ? (
                        <View style={{flex: 1}}>
                            <Card>
                                <CardItem header>
                                    <Text>Question {index + 1} of {questions.length}</Text>
                                </CardItem>

                                <CardItem style={{flex: 1}}>
                                    <Text style={{fontSize: 30, textAlign: 'center', flex:1}}>
                                        {questions[index].question}
                                    </Text>
                                </CardItem>
                                <CardItem style={{flex: 1, alignContent: 'flex-start', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                                    <TouchableOpacity onPress={this.onToggleAnswer} style={{ flex:1}}>

                                        <Text style={{color: 'red', textAlign: 'center', flex:1, fontSize:20}}>{showAnswer ? questions[0].answer: 'Show Answer'}</Text>
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
                            {/*<Text>{JSON.stringify(questions[index], null, 2)}</Text>*/}
                        </View>
                    ) : (
                        <Card>


                            <CardItem style={{
                                flex: 1,
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <View
                                    style={{
                                        flex: 1,
                                        justifyContent: 'center',

                                    }}
                                >
                                    <Text style={{fontSize: 25}}>Your
                                        Score: {((100 * correct) / questions.length).toFixed(2)}%</Text>
                                </View>
                                <View
                                    style={{flex: 1}}
                                >
                                    <Button iconLeft onPress={this.onRestart} success block style={styles.button}>
                                        <Icon name="refresh"/>
                                        <Text>Restart Quiz</Text>
                                    </Button>
                                    <Button iconLeft onPress={this.onBack} danger block style={styles.button}>
                                        <Icon name="arrow-back"/>
                                        <Text>Back to Deck</Text>

                                    </Button>
                                </View>
                            </CardItem>

                        </Card>

                    )}


                </View>

            </Container>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        margin: 10


    }
});

const mapStateToProps = (state, props) => ({
    deck: state.deck
});

const mapDispatchToProps = dispatch => ({
    getDeck: title => dispatch(getDeckAsync())
});

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
