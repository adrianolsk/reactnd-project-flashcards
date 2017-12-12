import {StackNavigator} from "react-navigation";
import {PrimaryColor, SecondaryColor} from "../utils/Colors";
import DeckDetail from "./DeckDetail";
import AddCard from "./AddCard";
import Quiz from "./Quiz";
import NewDeck from "./NewDeck";
import Decks from "./Decks";
import TabNavigator from "../../node_modules/react-navigation/lib-rn/navigators/TabNavigator";

const TabNav = TabNavigator(
    {
        Decks: {
            screen: Decks
        },
        NewDeck: {
            screen: NewDeck
        }
    },
    {
        animationEnabled: true,
        tabBarOptions: {
            activeTintColor: "#FFFFFF",
            style: {
                backgroundColor: PrimaryColor,
            },
            indicatorStyle: {
                backgroundColor: SecondaryColor,
                height: 5
            }
        }
    }
);

export const NavStack = StackNavigator(
    {
        Home: {
            screen: TabNav
        },
        Detail: {
            screen: DeckDetail,
            mode: "modal"
        },
        Quiz: {
            screen: Quiz
        },
        AddCard: {
            screen: AddCard
        }
    }, {
        headerMode: "true"
    }
);
