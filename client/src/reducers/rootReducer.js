import { combineReducers } from 'redux';
import nomJoueur from './nomJoueurReducer';
import listeJoueurs from './listeJoueursReducer';
import parties from './partiesReducer';

export default combineReducers({ nomJoueur, listeJoueurs, parties });
