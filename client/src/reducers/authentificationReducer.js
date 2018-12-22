import { UPDATE_UTILISATEUR } from '../constantes';

export default (state = null, action) => {
  switch (action.type) {
    case UPDATE_UTILISATEUR:
      return action.utilisateur;
    default:
      return state;
  }
};
