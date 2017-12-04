import React, {Component} from 'react';
import {Body, Card, CardItem, Container, Content, Header, Text, Title, Icon} from "native-base";
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {View} from "react-native";
import PropTypes from 'prop-types';

const Deck = ({title, cards,onSelect})=> {

    return(
            <Card>
                <CardItem button onPress={()=> onSelect(title)}>
                    <Body style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{width: 45}}>
                        <MaterialCommunityIcons
                            style={{fontSize: 35}}
                            name='cards-playing-outline'/>
                    </View>
                    <View style={{flex: 1}}>
                        <Text style={{fontWeight: 'bold'}}>
                            {title}
                        </Text>
                        <Text>
                            {cards} {cards && (cards > 1 ? 'Cards' : 'Card')}
                        </Text>
                    </View>
                    </Body>
                </CardItem>
            </Card>
        );

}

Deck.propTypes = {
    title: PropTypes.string.isRequired,
    cards: PropTypes.number.isRequired,
    onSelect: PropTypes.func.isRequired
};

export default Deck;