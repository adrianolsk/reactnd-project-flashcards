import { SAVE_DECK, GET_DECKS, GET_DECK, ADD_CARD_TO_DECK } from "./actions";

function decks(
  state = {
    decks: [
      {
        React: {
          title: "React",
          questions: [
            {
              question: "What is React?",
              answer: "A library for managing user interfaces"
            },
            {
              question: "Where do you make Ajax requests in React?",
              answer: "The componentDidMount lifecycle event"
            }
          ]
        },
        JavaScript: {
          title: "JavaScript",
          questions: [
            {
              question: "What is a closure?",
              answer:
                "The combination of a function and the lexical environment within which that function was declared."
            }
          ]
        }
      }
    ],
    deck: {
      title: "",
      questions: []
    }
  },
  action
) {
  switch (action.type) {
    case GET_DECKS:
      return {
        decks: [...action.data]
      };
    case GET_DECK:
      return {
        ...state,
        deck: { ...action.data }
      };
    case SAVE_DECK:
      return {
        ...state,
        decks: [...state.decks, { title: action.data, questions: [] }]
      };
    default:
      return state;
  }
}

export default decks;
