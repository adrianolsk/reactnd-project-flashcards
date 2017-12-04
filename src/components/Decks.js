import React, {Component} from 'react';
import {Body, Card, CardItem, Container, Content, Header, Text, Title, Icon} from "native-base";
import {FontAwesome, Entypo, MaterialCommunityIcons} from '@expo/vector-icons'
import {View} from "react-native";
import Deck from "./Deck";
import {getDecks} from "../utils/api";
import {connect} from 'react-redux';
import {getDecksAsync} from "../state/actions";
 class Decks extends Component {

    constructor() {
        super();

    }

    componentWillMount() {
        this.props.getDecks();

    }


    onSelect = (title) => {
        alert(title);
    }

    render() {
        const {decks} = this.props;
        return (
            <Container>
                <Content style={{margin: 10}}>
                    {decks.map(deck => (
                        <Deck
                            deck={deck}
                            key={deck.title}
                            onSelect={this.onSelect}/>

                    ))}


                </Content>
            </Container>
        );
    }
}

const mapStateToProps = (state, props) => ({
    decks: state
});

const mapDispatchToProps = dispatch => ({
    getDecks: () => dispatch(getDecksAsync())
});

export default connect(mapStateToProps, mapDispatchToProps)(Decks);
