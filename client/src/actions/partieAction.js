import { UPDATE_PARTIE } from '../constantes';
import { CHARGER_PARTIE } from '../constantes';

export const updatePartie = partie => ({
  type: UPDATE_PARTIE,
  partie
});
export const chargerPartie = partie => ({
  type: CHARGER_PARTIE,
  partie
});
