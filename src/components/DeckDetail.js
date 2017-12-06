import React, {Component} from 'react';
import {Container, Text, Left, Body, Content, Right, Header, Button, Icon, Title} from "native-base";
import {StyleSheet} from 'react-native';
import {connect} from "react-redux";
import {getDeckAsync} from "../state/actions";

class DeckDetail extends Component {


    componentDidMount() {
        const {title} = this.props.navigation.state.params;
        this.props.getDeck(title)
    }

    onStartQuiz = () => {
        const {title} = this.props.navigation.state.params;
        this.props.navigation.navigate('Quiz', {title});
    }

    onAddCard = () => {
        const {title} = this.props.navigation.state.params;
        this.props.navigation.navigate('AddCard', {title});
    }

    render() {

        // const {title} = this.props.navigation.state.params;
        const {title, questions} = this.props.deck || {questions: []};
        return (
            <Container style={styles.container}>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-back"/>
                        </Button>
                    </Left>
                    <Body style={{flex: 3}}>
                    <Title>{title}</Title>
                    </Body>
                    <Right/>
                </Header>

                <Content scrollEnabled={true}>
                    <Text>{title} </Text>
                    <Text>{questions.length} Card(s)</Text>
                    <Button onPress={this.onAddCard} block>
                        <Text>Add Question</Text>
                    </Button>
                    <Button onPress={this.onStartQuiz} block success>
                        <Text>Start</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {}
});


const mapStateToProps = (state, props) => ({
    deck: state.deck
});

const mapDispatchToProps = dispatch => ({
    getDeck: (title) => dispatch(getDeckAsync(title))
});

export default connect(mapStateToProps, mapDispatchToProps)(DeckDetail);