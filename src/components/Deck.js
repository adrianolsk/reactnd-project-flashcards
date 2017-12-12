import React, {Component} from "react";
import {
    Body,
    Card,
    CardItem,
    Container,
    Content,
    Header,
    Text,
    Title,
    Icon
} from "native-base";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {View} from "react-native";
import PropTypes from "prop-types";
import {PrimaryColor, PrimaryColorDark} from "../utils/Colors";

const Deck = ({deck, onSelect}) => {
    return (
        <Card>
            <CardItem button onPress={() => onSelect(deck.title)}>
                <Body style={{flex: 1, flexDirection: "row"}}>
                <View style={{width: 65}}>
                    <MaterialCommunityIcons
                        style={{fontSize: 55, color: '#555'}}
                        name="cards-playing-outline"
                    />
                </View>
                <View style={{flex: 1}}>
                    <Text style={{ fontSize: 20, color: '#555'}}>{deck.title}</Text>
                    <Text style={{color: "#5f5f5f"}}>
                        {deck.questions.length}
                        {deck.questions.length === 1 ? " card in this deck" : " cards in this deck"}
                    </Text>
                </View>
                </Body>
            </CardItem>
        </Card>
    );
};

Deck.propTypes = {
    deck: PropTypes.object,
    onSelect: PropTypes.func.isRequired
};

export default Deck;
