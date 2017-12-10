import React, {Component} from "react";
import {
    Container,
    Text,
    Left,
    Body,
    Content,
    Right,
    Header,
    Button,
    Icon,
    Title
} from "native-base";
import {StyleSheet, Alert} from "react-native";
import {connect} from "react-redux";
import {getDeckAsync, removeDecksAsync} from "../state/actions";

class DeckDetail extends Component {

    componentDidMount() {
        const {title} = this.props.navigation.state.params;
        this.props.getDeck(title);
    }

    onStartQuiz = () => {
        const {title} = this.props.navigation.state.params;
        this.props.navigation.navigate("Quiz", {title});
    };

    onAddCard = () => {
        const {title} = this.props.navigation.state.params;
        this.props.navigation.navigate("AddCard", {deck: this.props.deck});
    };

    onDeleteDeck = () => {
        const {title} = this.props.navigation.state.params;
        Alert.alert(
            'Remove deck?',
            'Are you sure you want to remove this deck?',
            [
                {
                    text: 'Yes, delete it!',
                    onPress: () => {
                        this.props.removeDeck(title);
                        this.props.navigation.navigate('Decks')
                    }
                },
                {text: 'No please!'}
            ],
            {cancelable: false}
        )
    }

    render() {
        // const {title} = this.props.navigation.state.params;
        const {title, questions} = this.props.deck || {questions: []};
        debugger;
        return (
            <Container style={styles.container}>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate('Decks')}>
                            <Icon name="arrow-back"/>
                        </Button>
                    </Left>
                    <Body style={{flex: 3}}>
                    <Title>{title}</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={this.onDeleteDeck}>
                            <Icon name="trash"/>
                        </Button>
                    </Right>
                </Header>

                <Content scrollEnabled={true}>
                    <Text>{title} </Text>
                    <Text>{questions.length} Card(s)</Text>
                    <Button onPress={this.onAddCard} block>
                        <Text>Add Question</Text>
                    </Button>
                    <Button onPress={this.onStartQuiz} block success>
                        <Text>Start</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {}
});

const mapStateToProps = (state, props) => ({
    deck: state.deck
});

const mapDispatchToProps = dispatch => ({
    getDeck: title => dispatch(getDeckAsync(title)),
    removeDeck: title => dispatch(removeDecksAsync(title))
});

export default connect(mapStateToProps, mapDispatchToProps)(DeckDetail);
