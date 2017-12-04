import React, {Component} from 'react';
import {Body, Card, CardItem, Container, Content, Header, Text, Title, Icon} from "native-base";
import {FontAwesome, Entypo, MaterialCommunityIcons} from '@expo/vector-icons'
import {View} from "react-native";
import Deck from "./Deck";

export default class Decks extends Component {

    onSelect = (title)=>{
        alert(title);
    }
    render() {
        return (
            <Container>
                <Content style={{margin: 10}}>

                        <Deck onSelect={this.onSelect} title='Udacicards' cards={2}></Deck>
                        <Deck onSelect={this.onSelect} title='Udacicards' cards={2}></Deck>


                </Content>
            </Container>
        );
    }
}