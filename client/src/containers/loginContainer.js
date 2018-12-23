import Login from '../components/login';
import { connect } from 'react-redux';
import { updateUtilisateur } from '../actions/authentificationAction';
const mapStateToProps = state => ({
  utilisateur: state.utilisateur
});
const mapDispatchToProps = (dispatch, props) => ({
  updateUtilisateur: utilisateur => {
    props.socket.emit('nouveau joueur', utilisateur);
    props.history.push('/joueurs');
    dispatch(updateUtilisateur(utilisateur));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
