import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Login from './login';
import { connect } from 'react-redux';
import { updateUtilisateur } from '../actions/authentificationAction';
import Morpion from './morpion';
import AuthRoute from './authRoute';

const Main = props => {
  console.log(props);
  // if (props.utilisateur === null) {
  //   return <h1>Chargement en cours</h1>;
  // }
  return (
    <Switch>
      <Route path="/login/" component={Login} />
      <AuthRoute component={Morpion} />
    </Switch>
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
