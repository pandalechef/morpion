import { UPDATE_NOM_JOUEUR } from '../constantes';
const initialState = '';

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_NOM_JOUEUR:
      return action.nomJoueur;
    default:
      return state;
  }
};
