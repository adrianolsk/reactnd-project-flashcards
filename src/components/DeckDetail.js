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
    Title, Card, CardItem
} from "native-base";
import {StyleSheet, Alert, View} from "react-native";
import {connect} from "react-redux";
import {getDeckAsync, removeDecksAsync} from "../state/actions";
import {PrimaryColor} from "../utils/Colors";

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
                        this.props.removeDeck(title).then(()=> this.props.navigation.navigate('Decks'));

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
                <Header style={{backgroundColor: PrimaryColor}}>
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

                <View style={{flex: 1, padding: 12}}>
                    <Card style={{flex:1}}>


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
                                <Text style={{fontSize:30, textAlign:'center'}}> {title}</Text>

                                <Text style={{fontSize:20, textAlign:'center'}}>{questions.length} Card(s)</Text>
                            </View>
                            <View
                                style={{flex: 1}}
                            >
                                <Button iconLeft onPress={this.onAddCard}success block style={styles.button}>
                                    <Icon name="add"/>
                                    <Text>Add Card</Text>
                                </Button>
                                <Button iconLeft  onPress={this.onStartQuiz}  danger block style={styles.button} disabled={questions.length ===0}>
                                    <Icon name="play"/>
                                    <Text>Start Quiz</Text>

                                </Button>
                            </View>
                        </CardItem>

                    </Card>

                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {},
    button:{
        margin:10
    }
});

const mapStateToProps = (state, props) => ({
    deck: state.deck
});

const mapDispatchToProps = dispatch => ({
    getDeck: title => dispatch(getDeckAsync(title)),
    removeDeck: title => dispatch(removeDecksAsync(title))
});

export default connect(mapStateToProps, mapDispatchToProps)(DeckDetail);
