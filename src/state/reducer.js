import {SAVE_DECK, GET_DECKS, GET_DECK, ADD_CARD_TO_DECK, REMOVE_DECK} from "./actions";
import {findIndex} from 'lodash';

function decks(state = {
                   decks: [

                       // {
                       //   React: {
                       //     title: "React",
                       //     questions: [
                       //       {
                       //         question: "What is React?",
                       //         answer: "A library for managing user interfaces"
                       //       },
                       //       {
                       //         question: "Where do you make Ajax requests in React?",
                       //         answer: "The componentDidMount lifecycle event"
                       //       }
                       //     ]
                       //   },
                       //   JavaScript: {
                       //     title: "JavaScript",
                       //     questions: [
                       //       {
                       //         question: "What is a closure?",
                       //         answer:
                       //           "The combination of a function and the lexical environment within which that function was declared."
                       //       }
                       //     ]
                       //   }
                       // }
                   ],
                   deck: {
                       title: "",
                       questions: []
                   }
               },
               action) {
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
                decks: [...state.decks, {title: action.data, questions: []}]
            };
        case REMOVE_DECK:
            debugger;
            return {
                ...state,
                decks: state.decks.filter(x => x.title !== action.data)
            };

        case ADD_CARD_TO_DECK:
            debugger;
            let index = findIndex(state.decks, deck => deck.title === action.data.deck.title);
            let newDeck = {
                ...action.data.deck,
                questions: [...action.data.deck.questions, {...action.data.card}]
            };

            return {
                ...state,
                decks: [
                    ...state.decks.slice(0, index),
                    newDeck,
                    ...state.decks.slice(index + 1)
                ],
                deck: {...newDeck}
            }
        default:
            return state;
    }
}

export default decks;
