import { CHARGER_PARTIE } from '../constantes';
const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case CHARGER_PARTIE:
      const { j1, j2 } = action.partie;
      const partieTrouvee = state.filter(
        p => (p.j1 === j1 || p.j1 === j2) && (p.j2 === j1 || p.j2 === j2)
      );
      if (partieTrouvee.length === 1) {
        return [
          ...state.filter(
            p => !((p.j1 === j1 || p.j1 === j2) && (p.j2 === j1 || p.j2 === j2))
          ),
          action.partie
        ];
      } else {
        return [...state, action.partie];
      }
    default:
      return state;
  }
};
