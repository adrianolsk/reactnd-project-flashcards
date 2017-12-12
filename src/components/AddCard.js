import React, {Component} from "react";
import {Entypo, FontAwesome} from '@expo/vector-icons'
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
    Content, List, ListItem, InputGroup, Input, Form, Item, Label
} from "native-base";
import {connect} from "react-redux";
import {addCardToDeckAsync, getDeckAsync} from "../state/actions";
import {PrimaryColor} from "../utils/Colors";

class AddCard extends Component {
    // eslint-disable-line

    constructor() {
        super();
        this.state = {
            card: {
                question: '',
                answer: ''
            }
        };
    }

    onSave = () => {

        const {deck} = this.props.navigation.state.params;
        this.setState({
            isSubmitted: true
        });
        const {card} = this.state
        if (card.question.length > 0 && card.answer.length > 0) {
            this.props.addCardToDeck(deck, card).then(() => this.props.navigation.goBack());
        }
    };

    setValue = (value, field) => {

        var object = {};
        object[field] = value;
        this.setState({
            card: {
                ...this.state.card,
                ...object
            }
        });
    }

    getFieldStyle = (field) => {
        if (this.state.isSubmitted) {
            if (this.state.card[field].length === 0) {
                return {
                    color: 'red'
                };
            } else {
                return {
                    color: 'green'
                };
            }
        }

        return {}

    }

    render() {


        return (
            <Container style={{
                backgroundColor: "#FFF"
            }}>
                <Header style={{backgroundColor: PrimaryColor}}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-back"/>
                        </Button>
                    </Left>
                    <Body>
                    <Title>Add a Card</Title>
                    </Body>
                    <Right/>
                </Header>

                <Content>
                    <Form>
                        <Item floatingLabel>
                            <Label style={{marginTop: 10, ...this.getFieldStyle('question')}}>* Question</Label>

                            <Input onChangeText={(value) => this.setValue(value, 'question')}/>

                        </Item>
                        <Item floatingLabel last>
                            <Label style={{marginTop: 10, ...this.getFieldStyle('answer')}}>* Answer</Label>
                            <Input success onChangeText={(value) => this.setValue(value, 'answer')}/>
                        </Item>
                    </Form>
                    <Button block success style={{margin: 15, marginTop: 50}} onPress={this.onSave}>
                        <Text>Save</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

//
// const mapStateToProps = (state, props) => ({
//     deck: state.deck
// });

const mapDispatchToProps = dispatch => ({
    addCardToDeck: (deck, card) => dispatch(addCardToDeckAsync(deck, card))
});

export default connect(null, mapDispatchToProps)(AddCard);


