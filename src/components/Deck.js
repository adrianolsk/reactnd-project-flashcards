import React, {Component} from 'react';
import {Body, Card, CardItem, Container, Content, Header, Text, Title, Icon} from "native-base";
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {View} from "react-native";
import PropTypes from 'prop-types';

const Deck = ({deck,onSelect})=> {

    return(

            <Card>
                <CardItem button onPress={()=> onSelect(deck.title)}>
                    <Body style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{width: 45}}>
                        <MaterialCommunityIcons
                            style={{fontSize: 35}}
                            name='cards-playing-outline'/>
                    </View>
                    <View style={{flex: 1}}>
                        <Text style={{fontWeight: 'bold'}}>
                            {deck.title}
                        </Text>
                        <Text>
                            {deck.questions.length} {deck.questions.length === 1 ? 'Card' : 'Cards'}
                        </Text>
                    </View>
                    </Body>
                </CardItem>
            </Card>
        );

}

Deck.propTypes = {
    deck: PropTypes.object,
    onSelect: PropTypes.func.isRequired
};

export default Deck;