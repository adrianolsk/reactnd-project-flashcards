import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TabNavigator} from 'react-navigation';
import Decks from "./src/components/Decks";
import NewDeck from "./src/components/NewDeck";
import AppStatusBar from "./src/components/AppStatusBar";
import {applyMiddleware, compose, createStore} from 'redux';
import {blue} from "./src/utils/Colors";
import reducer from './src/state/reducer';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';

const store = createStore(reducer, compose(applyMiddleware(thunk)));

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
        return (
            <Provider store={store}>
                <View style={{flex:1}}>
                    <AppStatusBar
                        backgroundColor={blue}
                        barStyle="light-content"/>
                    <TabNav/>
                </View>

            </Provider>
        );
    }
}




