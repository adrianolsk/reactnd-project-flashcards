import React, { Component } from "react";
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
import {
  FontAwesome,
  Entypo,
  MaterialCommunityIcons
} from "@expo/vector-icons";
import { View } from "react-native";
import Deck from "./Deck";
import { getDecks } from "../utils/api";
import { connect } from "react-redux";
import { getDecksAsync } from "../state/actions";
import DeckDetail from "./DeckDetail";

import { StackNavigator } from "react-navigation";

export default class Decks extends Component {
  constructor() {
    super();
  }

  componentWillMount() {
    this.props.getDecks();
  }

  onSelect = title => {
    //alert(title);
    // this.props.navigation.navigate('Detail');
    this.props.navigation.navigate("Detail", { title });
  };

  render() {
    const { decks } = this.props;
    return (
      <Container>
        <Content style={{ margin: 10 }}>
          {decks.map(deck => (
            <Deck deck={deck} key={deck.title} onSelect={this.onSelect} />
          ))}
        </Content>
      </Container>
    );
  }
}

// const mapStateToProps = (state, props) => ({
//     decks: state
// });
//
// const mapDispatchToProps = dispatch => ({
//     getDecks: () => dispatch(getDecksAsync())
// });
//
//
// const ModalStack = StackNavigator({
//     Home: {
//         screen: connect(mapStateToProps, mapDispatchToProps)(Decks),
//     },
//     Detail: {
//         path: 'deck/:name',
//         screen: DeckDetail,
//         mode: 'modal'
//     },
// }, {headerMode: 'true',
//     mode: 'modal',
//     navigationOptions: {
//     gesturesEnabled: false
// }});
// export default ModalStack;
