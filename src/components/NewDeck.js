import React, {Component} from "react";
import {Keyboard} from 'react-native';
import {
    Header,
    Title,
    Container,
    Item,
    Input,
    Icon,
    Content,
    Button,
    Text
} from "native-base";
import {saveDeckTitle} from "../utils/api";
import {saveDeckTitleAsync} from "../state/actions";
import {connect} from "react-redux";

class NewDeck extends Component {
    state = {
        title: ""
    };

    onSave = () => {
        if (this.state.title) {
            this.props.saveDeckTitle(this.state.title).then(() => {
                Keyboard.dismiss();
                this.props.navigation.navigate('Detail', {
                    title: this.state.title
                });
                this.setState({title: ""});
            });

        }
    };

    render() {
        const bug = false;
        return (
            <Container>
                <Content>
                    <Item error={bug} success={!bug}>
                        <Input
                            onChangeText={title => this.setState({title})}
                            placeholder="Textbox with Error Input"
                        />
                        <Icon name="checkmark-circle"/>
                    </Item>
                    <Button onPress={this.onSave} block success>
                        <Text>Save deck</Text>
                    </Button>
                    <Text>{JSON.stringify(this.state, null, 2)}</Text>
                </Content>
            </Container>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    saveDeckTitle: title => dispatch(saveDeckTitleAsync(title))
});

export default connect(null, mapDispatchToProps)(NewDeck);
