import NomJoueur from '../components/nomJoueur';
import { connect } from 'react-redux';
import { updateNomJoueur } from '../actions';
const mapStateToProps = state => ({
  nomJoueur: state.nomJoueur
});
const mapDispatchToProps = (dispatch, props) => ({
  updateNomJoueur: nomJoueur => {
    props.socket.emit('nouveau joueur', nomJoueur);
    props.history.push('/joueurs');
    dispatch(updateNomJoueur(nomJoueur));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NomJoueur);
