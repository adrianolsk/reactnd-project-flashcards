import React from "react";
import {View} from "react-native";
import AppStatusBar from "./src/components/AppStatusBar";
import {applyMiddleware, compose, createStore} from "redux";
import {PrimaryColor} from "./src/utils/Colors";
import reducer from "./src/state/reducer";
import thunk from "redux-thunk";
import {Provider} from "react-redux";

import {NavStack} from "./src/components/Navigation";

const store = createStore(reducer, compose(applyMiddleware(thunk)));

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
                <View style={{flex: 1}}>
                    <AppStatusBar backgroundColor={PrimaryColor}/>
                    <NavStack/>
                </View>
            </Provider>
        );
    }
}
