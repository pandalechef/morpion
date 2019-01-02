import { MESSAGE_RECU } from '../constantes';
import { MESSAGE_ENVOYE } from '../constantes';

export const messageRecu = message => ({
  type: MESSAGE_RECU,
  message
});
export const messageEnvoye = message => ({
  type: MESSAGE_ENVOYE,
  message
});
