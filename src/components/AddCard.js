import React, {Component} from "react";
import {Image, View} from "react-native";
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

class AddCard extends Component {
    // eslint-disable-line

    constructor(){
        super();
        this.state = {
            card: {}
        };
    }
    onSave = () => {
        // alert(JSON.stringify(this.state.form, null, 2));
        //addCardToDeck
        const { deck } = this.props.navigation.state.params;
        this.props.addCardToDeck(deck, this.state.card)
            .then(()=> this.props.navigation.goBack());
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

    render() {
        return (
            <Container style={{
                backgroundColor: "#FFF"
            }}>
                <Header>
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
                            <Label style={{marginTop: 10}}>Question</Label>
                            <Input onChangeText={(value) => this.setValue (value, 'question')} name='question'/>
                        </Item>
                        <Item floatingLabel last>
                            <Label style={{marginTop: 10}}>Answer</Label>
                            <Input  onChangeText={(value) => this.setValue (value, 'answer')}/>
                        </Item>
                    </Form>
                    <Button block style={{margin: 15, marginTop: 50}} onPress={this.onSave}>
                        <Text>Save</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}



const mapStateToProps = (state, props) => ({
    deck: state.deck
});

const mapDispatchToProps = dispatch => ({
    addCardToDeck: (deck, card) => dispatch(addCardToDeckAsync(deck, card))
});

export default connect(null, mapDispatchToProps)(AddCard);


