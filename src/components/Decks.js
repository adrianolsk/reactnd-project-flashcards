import React, {Component} from "react";
import {
    Container,
    Content,
    Text,
    Icon,
    Button
} from "native-base";

import {View, StyleSheet} from "react-native";
import Deck from "./Deck";
import {getDecks} from "../utils/api";
import {connect} from "react-redux";
import {getDecksAsync} from "../state/actions";


class Decks extends Component {
    constructor() {
        super();
    }

    componentWillMount() {
        this.props.getDecks();
    }

    onSelect = title => {
        this.props.navigation.navigate("Detail", {title});
    };

    onAddDeck = () => {
        this.props.navigation.navigate('NewDeck');
    }

    render() {
        const {decks} = this.props;
        return (
            <Container style={{backgroundColor: 'white'}}>

                <Content style={styles.container}>
                    {decks.length > 0 ? decks.map(deck => (
                        <Deck deck={deck} key={deck.title} onSelect={this.onSelect}/>
                    )) : (
                        <View style={styles.viewNoDecks}>
                            <Icon family="Ionicons" name="ios-sad-outline" style={styles.iconNoDecks}/>
                            <Text style={styles.textNoDecks}>You have no decks</Text>
                            <View style={{marginTop: 20}}>
                                <Button bordered info onPress={this.onAddDeck}>
                                    <Text>Add one now</Text>
                                </Button>
                            </View>
                        </View>
                    )}
                </Content>
            </Container>
        );
    }
}


const styles = StyleSheet.create({
    container: {margin: 10},
    viewNoDecks: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        marginTop: 100
    },
    textNoDecks: {
        fontSize: 20,
        color: '#919191'
    },
    iconNoDecks: {
        fontSize: 70,
        color: '#919191'
    }
});


const mapStateToProps = (state, props) => ({
    decks: state.decks
});

const mapDispatchToProps = dispatch => ({
    getDecks: () => dispatch(getDecksAsync())
});


export default connect(mapStateToProps, mapDispatchToProps)(Decks)