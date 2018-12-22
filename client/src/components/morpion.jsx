import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import NomJoueur from '../containers/nomJoueurContainer';
import Plateau from '../containers/plateauContainer';
import SocketContextProvider from './socketContextProvider';
import withSocketContext from './withSocketContext';
import ListeJoueurs from '../containers/listeJoueursContainer';
import Header from '../containers/headerContainer';
import { updateUtilisateur } from '../actions/authentificationAction';
import { connect } from 'react-redux';
const Morpion = props => (
  <SocketContextProvider>
    <header>
      <Header />
      <button
        onClick={() => {
          props.updateUtilisateur(null);
        }}
      >
        Déconnexion
      </button>
    </header>
    <Switch>
      <Route path="/" exact component={withSocketContext(NomJoueur)} />
      <Route path="/plateau" component={withSocketContext(Plateau)} />
      <Route path="/morpion" component={withSocketContext(Plateau)} />
      <Route path="/joueurs" component={withSocketContext(ListeJoueurs)} />
      <Redirect to="/" />
    </Switch>
  </SocketContextProvider>
);
export default connect(
  null,
  {
    updateUtilisateur
  }
)(Morpion);
