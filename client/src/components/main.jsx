import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Login from '../containers/loginContainer';
import { connect } from 'react-redux';
import { updateUtilisateur } from '../actions/authentificationAction';
import Morpion from './morpion';
import AuthRoute from './authRoute';
import withSocketContext from './withSocketContext';
import SocketContextProvider from './socketContextProvider';

const Main = props => {
  // if (props.utilisateur === null) {
  //   return <h1>Chargement en cours</h1>;
  // }
  return (
    <SocketContextProvider>
      <Switch>
        <Route path="/login/" component={withSocketContext(Login)} />
        <AuthRoute component={Morpion} />
      </Switch>
    </SocketContextProvider>
  );
};

export default withRouter(
  connect(
    state => ({
      utilisateur: state.utilisateur
    }),
    {
      updateUtilisateur
    }
  )(Main)
);
