import React, { Component } from "react";
import { Image, View } from "react-native";

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
    Content,
} from "native-base";
import {connect} from "react-redux";
import {getDeckAsync} from "../state/actions";


class AddCard extends Component {
    // eslint-disable-line

    onSave = ()=>{
        alert('save');
    }


    render() {
        return (
            <Container style={{ backgroundColor: "#FBFAFA"}}>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                    <Title>Add a card</Title>
                    </Body>
                    <Right />
                </Header>

                <View style={{ flex: 1, padding: 12 }}>
                    <Text>{JSON.stringify(this.props, null , 2)}</Text>
                </View>
                <View style={{ flexDirection: "row", flex: 1, position: "absolute", bottom: 50, left: 0, right: 0, justifyContent: 'space-between', padding: 15 }}>
                    <Button iconLeft onPress={this.onSave}>
                        <Icon name="arrow-back" />
                        <Text>Yes</Text>
                    </Button>

                </View>
            </Container>
        );
    }
}

export default AddCard