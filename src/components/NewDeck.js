import React, {Component} from 'react';
import {Header, Title, Container, Item, Input, Icon, Content, Button, Text} from "native-base";


export default class NewDeck extends Component{

    render(){
        const bug = false;
        return(
            <Container>

                <Content>
                    <Item error={bug} success={!bug}>
                        <Input placeholder='Textbox with Error Input'/>
                        {/*<Icon name='close-circle' />*/}
                        <Icon name='checkmark-circle' />
                    </Item>
                    <Button block success>
                        <Text>Save deck</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}