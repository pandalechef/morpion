import { connect } from 'react-redux';
import { updateListeJoueurs } from '../actions/listeJoueurs';
import ListeJoueurs from '../components/listeJoueurs';

const mapStateToProps = state => ({
  utilisateur: state.utilisateur,
  listeJoueurs: state.listeJoueurs
});

const mapDispatchToProps = (dispatch, props) => ({
  updateListeJoueurs: () => {
    props.socket.emit('listeJoueurs');
    props.socket.on('listeJoueurs', listeJoueurs =>
      dispatch(updateListeJoueurs(listeJoueurs))
    );
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListeJoueurs);
