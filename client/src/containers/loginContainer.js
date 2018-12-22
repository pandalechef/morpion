import NomJoueur from '../components/nomJoueur';
import { connect } from 'react-redux';
import { updateUtilisateur } from '../actions/authentificationAction';
const mapStateToProps = state => ({
  utilisateur: state.utilisateur
});
const mapDispatchToProps = (dispatch, props) => ({
  updateNomJoueur: nomJoueur => {
    props.socket.emit('nouveau joueur', nomJoueur);
    props.history.push('/joueurs');
    dispatch(updateUtilisateur(nomJoueur));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NomJoueur);
