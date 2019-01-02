import { combineReducers } from 'redux';
import listeJoueurs from './listeJoueursReducer';
import parties from './partiesReducer';
import utilisateur from './authentificationReducer';
import messages from './dialogueReducer';

export default combineReducers({
  listeJoueurs,
  parties,
  utilisateur,
  messages
});
