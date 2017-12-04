import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TabNavigator} from 'react-navigation';
import Decks from "./src/components/Decks";
import NewDeck from "./src/components/NewDeck";
import AppStatusBar from "./src/components/AppStatusBar";
import {blue} from "./src/utils/Colors";


const TabNav = TabNavigator({
    Decks: {
        screen: Decks,
    },
    NewDeck: {
        screen: NewDeck,
    },
}, {
    tabBarPosition: 'top',
    animationEnabled: true,
    tabBarOptions: {
        activeTintColor: '#FFFFFF',
    },
});


export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            isReady: false
        };
    }

    async componentWillMount() {
        await Expo.Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
            Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
        });

        this.setState({isReady: true});
    }

    render() {
        if (!this.state.isReady) {
            return <Expo.AppLoading/>;
        }
        return ([
            <AppStatusBar backgroundColor={blue} barStyle="light-content"  key='statusBar'/>,
            <TabNav key='tabs' />
        ]);
    }
}




