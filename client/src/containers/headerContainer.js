import { connect } from 'react-redux';
import Header from '../components/header';
import { updateUtilisateur } from '../actions/authentificationAction';

const mapStateToProps = state => ({
  utilisateur: state.utilisateur
});

const mapDispatchToProps = (dispatch, props) => ({
  updateUtilisateur: utilisateur => {
    console.log('émission deconnexion');
    props.socket.emit('deconnexion');
    dispatch(updateUtilisateur(utilisateur));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
