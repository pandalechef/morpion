import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      rest.utilisateur !== null ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login/',
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

export default connect(state => ({
  utilisateur: state.utilisateur
}))(AuthRoute);
