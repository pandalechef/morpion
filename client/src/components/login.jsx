import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { updateUtilisateur } from '../actions/authentificationAction';

const Login = props => {
  if (props.utilisateur !== null) {
    const { from } = props.location.state || { from: { pathname: '/' } };
    return <Redirect to={from} />;
  }
  return (
    <div>
      <h1>Login</h1>
      <button
        onClick={() => {
          props.updateUtilisateur('toto');
        }}
      >
        Login
      </button>
    </div>
  );
};

export default connect(
  state => ({
    utilisateur: state.utilisateur
  }),
  {
    updateUtilisateur
  }
)(Login);
