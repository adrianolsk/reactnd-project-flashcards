import {
    SAVE_DECK,
    GET_DECKS,
    GET_DECK,
    ADD_CARD_TO_DECK
} from './actions';

function decks(state = {
    decks: [],
    deck: {}
}, action) {

    switch (action.type) {
        case GET_DECKS:
            return {
                decks: [...action.data]
            };
        case GET_DECK:
            return {
                ...state,
                deck: {...action.data}
            };
        case SAVE_DECK:
            return {
                ...state,
                decks: [... state.decks, {title: action.data, questions: []}]
            };
        default:
            return state;
    }
}

export default decks;