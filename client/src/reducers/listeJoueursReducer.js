import { UPDATE_LISTE_JOUEURS } from '../constantes';
const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_LISTE_JOUEURS:
      return action.listeJoueurs;
    default:
      return state;
  }
};
