import { combineReducers } from 'redux';
import listeJoueurs from './listeJoueursReducer';
import parties from './partiesReducer';
import utilisateur from './authentificationReducer';

export default combineReducers({
  listeJoueurs,
  parties,
  utilisateur
});
