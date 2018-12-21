import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import NomJoueur from '../containers/nomJoueurContainer';
import Plateau from '../containers/plateauContainer';
import SocketContextProvider from './socketContextProvider';
import withSocketContext from './withSocketContext';
import ListeJoueurs from '../containers/listeJoueursContainer';
import Header from '../containers/headerContainer';

export default () => (
  <SocketContextProvider>
    <header>
      <Header />
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
