import { connect } from 'react-redux';
import Plateau from '../components/plateau';
import { chargerPartie } from '../actions/partieAction';

const getJoueursFromParam = search => {
  const params = new URLSearchParams(search);
  return { j1: params.get('j1'), j2: params.get('j2') };
};

const mapStateToProps = (state, props) => {
  const { j2 } = getJoueursFromParam(props.location.search);
  return {
    nomJoueur: state.nomJoueur,
    partie: state.parties.filter(
      p =>
        (state.nomJoueur === p.j1 || state.nomJoueur === p.j2) &&
        (j2 === p.j1 || j2 === p.j2)
    )[0]
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  chargerPartie: () => {
    const { j1, j2 } = getJoueursFromParam(props.location.search);
    props.socket.emit('charger partie', { j1, j2 });
    props.socket.on('charger partie', partie => {
      dispatch(chargerPartie(partie));
    });
  },
  handleClick: (caseCochee, valeur, joueur, joueurEnCours) => {
    if (
      valeur === null &&
      joueur.toLowerCase() === joueurEnCours.toLowerCase()
    ) {
      const { j1, j2 } = getJoueursFromParam(props.location.search);
      props.socket.emit('case cochee', {
        j1,
        j2,
        caseCochee
      });
    }
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Plateau);
