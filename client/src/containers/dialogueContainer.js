import { connect } from 'react-redux';
import Dialogue from '../components/dialogue';
import { messageRecu, messageEnvoye } from '../actions/dialogueAction';

const mapStateToProps = (state, props) => {
  const params = new URLSearchParams(props.location.search);
  const adversaire = params.get('j2');
  return {
    utilisateur: state.utilisateur,
    messages: state.messages[adversaire] || []
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const params = new URLSearchParams(props.location.search);
  const utilisateur = params.get('j1');
  const adversaire = params.get('j2');

  return {
    handleNewMessage: () => {
      props.socket.on('message recu', msg => dispatch(messageRecu(msg)));
    },
    handleClick: value => {
      const msg = {
        date: new Date(),
        from: utilisateur,
        to: adversaire,
        message: value
      };
      props.socket.emit('envoi message', msg);
      dispatch(messageEnvoye(msg));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dialogue);
