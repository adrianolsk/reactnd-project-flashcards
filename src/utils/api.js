import {AsyncStorage} from "react-native";

const saveDeckTitle = title => {
    const newDeck = {
        title,
        questions: []
    };

    return AsyncStorage.setItem(title, JSON.stringify(newDeck));
};

const getDecks = () =>
    AsyncStorage.getAllKeys()
        .then(keys => {
            const filteredKeys = keys.filter(
                key => key !== "flashcards:notification"
            );
            return AsyncStorage.multiGet(filteredKeys);
        })
        .then(stores => {
            if (stores && stores.length > 0) {
                return stores.map((result, i, store) => {
                    const value = JSON.parse(store[i][1]);
                    return value;
                });
            }
            return [];
        });

const getDeck = title =>
    AsyncStorage.getItem(title).then(result => JSON.parse(result));

const addCardToDeck = (deck, card) => {
    const delta = {
        questions: deck.questions.concat(card)
    };
    return AsyncStorage.mergeItem(deck.title, JSON.stringify(delta));
};

const removeDeck = title => AsyncStorage.removeItem(title);

export const API = {
    saveDeckTitle,
    getDecks,
    getDeck,
    addCardToDeck,
    removeDeck
};
