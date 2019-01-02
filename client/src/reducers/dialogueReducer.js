import { MESSAGE_RECU, MESSAGE_ENVOYE } from '../constantes';
const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case MESSAGE_RECU:
      if (state[action.message.from]) {
        return {
          ...state,
          [action.message.from]: [...state[action.message.from], action.message]
        };
      }
      return {
        ...state,
        [action.message.from]: [action.message]
      };
    case MESSAGE_ENVOYE:
      if (state[action.message.to]) {
        return {
          ...state,
          [action.message.to]: [...state[action.message.to], action.message]
        };
      }
      return {
        ...state,
        [action.message.to]: [action.message]
      };
    default:
      return state;
  }
};
