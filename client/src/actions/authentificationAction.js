import { UPDATE_UTILISATEUR } from '../constantes';

export const updateUtilisateur = utilisateur => ({
  type: UPDATE_UTILISATEUR,
  utilisateur
});
