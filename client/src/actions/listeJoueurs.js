import { UPDATE_LISTE_JOUEURS } from '../constantes';
export const updateListeJoueurs = listeJoueurs => ({
  type: UPDATE_LISTE_JOUEURS,
  listeJoueurs
});
