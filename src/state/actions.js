import {API} from "../utils/api";

export const SAVE_DECK = "SAVE_DECK";
export const GET_DECKS = "GET_DECKS";
export const GET_DECK = "GET_DECK";
export const ADD_CARD_TO_DECK = "ADD_CARD_TO_DECK";
export const REMOVE_DECK = "REMOVE_DECK";

export function saveDeckTitleAsync(title) {
    return dispatch =>
        API.saveDeckTitle(title).then(() => dispatch(saveDeckTitle(title)));
}

export function getDecksAsync(title) {
    return dispatch => API.getDecks().then(result => dispatch(getDecks(result)));
}

export function getDeckAsync(title) {
    return dispatch =>
        API.getDeck(title).then(result => dispatch(getDeck(result)));
}


export function addCardToDeckAsync(deck, card) {
    return dispatch =>
        API.addCardToDeck(deck, card)
            .then(() => dispatch(addCardToDeck({
                deck, card
            })));
}


export function removeDecksAsync(title) {
    return dispatch =>
        API.removeDeck(title)
            .then(result => dispatch(removeDeck(title)));
}

function saveDeckTitle(data) {
    return {type: SAVE_DECK, data};
}

export function getDeck(data) {
    return {type: GET_DECK, data};
}

export function getDecks(data) {
    return {type: GET_DECKS, data};
}

export function removeDeck(data) {
    return {type: REMOVE_DECK, data};
}


export function addCardToDeck({deck, card}) {
    return {
        type: ADD_CARD_TO_DECK,
        data: {
            deck,
            card
        }
    };
}
