import React, {Component} from "react";
import {Keyboard} from 'react-native';
import {
    Header,
    Title,
    Container,
    Item,
    Input,

    Content,
    Button,
    Text, Left, Body, Right, Form, Label
} from "native-base";
import {saveDeckTitle} from "../utils/api";
import {saveDeckTitleAsync} from "../state/actions";
import {connect} from "react-redux";
import {Icon} from "expo";

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

        return (
            <Container style={{
                backgroundColor: "#FFF"
            }}>


                <Content>
                    <Form>
                        <Item floatingLabel>
                            <Label style={{marginTop: 10}}>Name of your deck</Label>
                            <Input  onChangeText={title => this.setState({title})} />
                        </Item>

                    </Form>





                    <Button block style={{margin: 15, marginTop: 50}} onPress={this.onSave}>
                        <Text>Save</Text>
                    </Button>
                </Content>
            </Container>

        );
    }
}

const mapDispatchToProps = dispatch => ({
    saveDeckTitle: title => dispatch(saveDeckTitleAsync(title))
});

export default connect(null, mapDispatchToProps)(NewDeck);
