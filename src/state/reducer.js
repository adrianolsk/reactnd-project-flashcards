import {
    SAVE_DECK,
    GET_DECKS,
    GET_DECK,
    ADD_CARD_TO_DECK
} from './actions';

function decks(state = [], action) {

    switch (action.type) {
        case GET_DECKS:
            return [...action.data];
        case SAVE_DECK:
            return [...state,
                {title: action.data, questions: []}
            ];
        default:
            return state;
    }
}

export default decks;